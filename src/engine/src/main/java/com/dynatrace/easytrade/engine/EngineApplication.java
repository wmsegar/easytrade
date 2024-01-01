package com.dynatrace.easytrade.engine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@SpringBootApplication
@EnableScheduling
public class EngineApplication {
	private static final Logger logger = LoggerFactory.getLogger(EngineApplication.class);

	public static void main(String[] args) {
		logger.info("Starting Engine application.");
		SpringApplication.run(EngineApplication.class, args);
	}

	@Bean
	public Docket api() {
		String proxyPrefix = System.getenv("PROXY_PREFIX");
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.dynatrace.easytrade.engine"))
				.paths(PathSelectors.any())
				.build()
				.pathMapping("/" + (proxyPrefix == null ? "" : proxyPrefix));
	}

	@Bean
	TaskScheduler threadPoolTaskScheduler() {
		return new ThreadPoolTaskScheduler();
	}
}


