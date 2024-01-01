package com.dynatrace.easytrade.accountservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@SpringBootApplication
public class AccountServiceApplication {
	private static final Logger logger = LoggerFactory.getLogger(AccountServiceApplication.class);

	public static void main(String[] args) {
		logger.info("Starting Account Service application.");
		SpringApplication.run(AccountServiceApplication.class, args);
	}

	@Bean
	public Docket api() {
		String proxyPrefix = System.getenv("PROXY_PREFIX");
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.dynatrace.easytrade.accountservice"))
				.paths(PathSelectors.any())
				.build()
				.pathMapping("/" + (proxyPrefix == null ? "" : proxyPrefix));
	}
}


