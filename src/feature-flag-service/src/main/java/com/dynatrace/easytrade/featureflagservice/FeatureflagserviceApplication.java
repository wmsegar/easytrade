package com.dynatrace.easytrade.featureflagservice;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.web.servlet.ConditionalOnMissingFilterBean;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.web.filter.ForwardedHeaderFilter;

import jakarta.servlet.DispatcherType;

@SpringBootApplication
public class FeatureflagserviceApplication {
	private static final Logger logger = LoggerFactory.getLogger(FeatureflagserviceApplication.class);

	public static void main(String[] args) {
		logger.info("Running Feature Flag Service application");
		SpringApplication.run(FeatureflagserviceApplication.class, args);
	}

	@Bean
	public Map<String, Flag> flagRegistry() {
		return new HashMap<>(
				Map.of("db_not_responding",
						new Flag("db_not_responding", false, "DB not responding",
								"When enabled, the DB not responding will be simulated, this will cause errors when trying to create any new transactions.",
								true, "problem_pattern"),
						"ergo_aggregator_slowdown",
						new Flag("ergo_aggregator_slowdown", false, "Ergo aggregator slowdown",
								"When enabled, the OfferService will respond with delay to 2 out of 5 AggregatorServices querying it, which will result in those services pausing the queries for 1h.",
								true, "problem_pattern"),
						"factory_crisis",
						new Flag("factory_crisis", false, "Factory crisis",
								"When enabled, the factory won't produce new cards, which will cause the Third party service not to process credit card orders.",
								true, "problem_pattern"),
						"frontend_feature_flag_management",
						new Flag("frontend_feature_flag_management", false, "Frontend feature flag management",
								"When enabled allows controlling problem pattern feature flags from the main app UI.",
								true, "config"),
						"credit_card_meltdown",
						new Flag("credit_card_meltdown", false, "OrderController service error",
								"When enabled, then checking latest status will result in a division by 0 error. This results in visits to the Credit Card frontend tab resulting in an ugly error page.",
								true,"problem_pattern")));
	}

	@Bean
	@ConditionalOnMissingFilterBean(ForwardedHeaderFilter.class)
	@ConditionalOnProperty(value = "server.forward-headers-strategy", havingValue = "framework")
	public FilterRegistrationBean<ForwardedHeaderFilter> forwardedHeaderFilter() {
		ForwardedHeaderFilter filter = new ForwardedHeaderFilter();
		FilterRegistrationBean<ForwardedHeaderFilter> registration = new FilterRegistrationBean<>(filter);
		registration.setDispatcherTypes(DispatcherType.REQUEST, DispatcherType.ASYNC, DispatcherType.ERROR);
		registration.setOrder(Ordered.HIGHEST_PRECEDENCE);
		return registration;
	}
}
