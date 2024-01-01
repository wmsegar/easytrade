FROM gcc:11.1.0

ARG C_FLAGS="-lonesdk_static -lamqpcpp -lpthread -levent -levent_core -Wl,--no-as-needed -ldl"

ARG DEBIAN_FRONTEND="noninteractive"

ARG ONEAGENT_SDK_VERSION="1.6.1"

ARG ONEAGENT_SDK_DIR="OneAgent-SDK-for-C-${ONEAGENT_SDK_VERSION}"

ARG ONEAGENT_SDK_URL="https://github.com/Dynatrace/OneAgent-SDK-for-C/archive/refs/tags/v${ONEAGENT_SDK_VERSION}.tar.gz"

RUN apt-get update \
    && apt-get install -y \
    build-essential \
    curl \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src

RUN git clone -b v4.3.15 https://github.com/CopernicaMarketingSoftware/AMQP-CPP.git \
    && cd AMQP-CPP \
    && make \
    && make install

COPY conn_handler.h consume.cpp ./

RUN curl -L ${ONEAGENT_SDK_URL} > oneagentsdk.tar.gz \
    && tar -zxvf oneagentsdk.tar.gz \
    && g++ -std=c++11 -o consumeCandleData consume.cpp -I ./${ONEAGENT_SDK_DIR}/include -L ./${ONEAGENT_SDK_DIR}/lib/linux-x86_64 ${C_FLAGS} \
    && mv consumeCandleData / \
    && rm -rf /src/*

WORKDIR /

COPY loop.sh /

CMD ["./loop.sh"]
