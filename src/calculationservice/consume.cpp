#include <iostream>
#include <iomanip>
#include <string>
#include <sstream>
#include <iterator>
#include <vector>
#include <numeric>
#include <fstream>

#include <amqpcpp.h>
#include "conn_handler.h"

#include "onesdk/onesdk.h"
#include <stdio.h>

void messageReceive(std::string tmp){

    // Dynatrace SDK
    /* create tracer */
    onesdk_tracer_handle_t const tracer = onesdk_customservicetracer_create(
        onesdk_asciistr("ComputeFunctionReturns"),
        onesdk_asciistr("PriceAnalysisComputation"));

    /* start tracer */
    onesdk_tracer_start(tracer);

    std::string date, open, high, low, close, volume, dump;
	std::vector<std::string> DATE;
    std::vector<float> OPEN, HIGH, LOW, CLOSE, VOLUME;

	int i = 0;
    int MAX = 100;

    std::istringstream ss(tmp);

	if (ss)
	{
		//remove the header line first
		std::getline(ss, dump, '\n');
		
		//load the data
		while (i < MAX)
		{
			std::getline(ss, date, ',');
			DATE.push_back(date);

			std::getline(ss, open, ',');
			OPEN.push_back(stof(open));

			std::getline(ss, high, ',');
			HIGH.push_back(stof(high));

            std::getline(ss, low, ',');
			LOW.push_back(stof(low));

            std::getline(ss, close, ',');
			CLOSE.push_back(stof(close));

			std::getline(ss, volume, '\n');
			VOLUME.push_back(stof(volume));
			
			i += 1;
		}

		std::cout << "Number of entries: " << i-1 << std::endl;
    }

    std::cout << "Date" << "\t" << "Open" << "\t" << "High" << "\t" << "Low" << "\t" << "Close" << "\t" << "Volume" << "\t" << std::endl;

    for (int j = 0; j < i; j++) {
		std::cout << DATE[j] << "\t" << OPEN[j] << "\t" << HIGH[j] << "\t" << LOW[j] << "\t" << CLOSE[j] << "\t" << VOLUME[j] << std::endl;
	}

	std::cout << std::endl;

    float sum = 0;
    int cnt = 0;
    double length = 5;
    float sma5var;
    std::vector<float> SMA5;

    for (int l = 0; l < CLOSE.size(); l++){
        sum += CLOSE[l];
        cnt++;
        if (cnt >= length) {
            sma5var = (sum / (double) length);
            sum -= CLOSE[cnt - length];
        } else {
            sma5var = 0;
        }
        SMA5.push_back(sma5var);
    }

    /* end and release tracer */
    onesdk_tracer_end(tracer);

    return;
}

void consume(){

    ConnHandler handler;
    //AMQP::TcpConnection connection(handler, AMQP::Address("amqp://admin:Dynatrace@ec2-3-249-165-177.eu-west-1.compute.amazonaws.com:5672"));
	AMQP::TcpConnection connection(handler, AMQP::Address("amqp://userxxx:passxxx@rabbitmq:5672"));
    AMQP::TcpChannel channel(&connection);

    // callback function that is called when the consume operation failed
    auto errorCb = [](const char *message) {

        std::cout << "consume operation failed" << std::endl;
    };

    channel.onError([&handler](const char* message)
        {
            std::cout << "Channel error: " << message << std::endl;
            handler.Stop();
        });

    channel.consume("Trade_Data_Raw", AMQP::noack)
        .onReceived
        (
            [](const AMQP::Message &msg, uint64_t tag, bool redelivered)
            {
                messageReceive(msg.body());
            }
        )
        .onError(errorCb);

    handler.Start();

    std::cout << "Closing connection." << std::endl;

    connection.close();
    
    return;
}

int main(int argc, char** argv)
{
    /* Initialize SDK */
    onesdk_result_t const onesdk_init_result = onesdk_initialize();

    consume();

    if (onesdk_init_result == ONESDK_SUCCESS)
        onesdk_shutdown();


    return 0;
}

