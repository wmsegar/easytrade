package integrationTests;

import java.time.Duration;
import java.util.List;

import integrationTests.PluginTestProvider.IPluginTestSuite;
import static integrationTests.Constants.*;
import static org.junit.jupiter.api.Assertions.*;

public class ErgoAggregatorSlowdownPluginTest implements IPluginTestSuite {
    private static final String PLUGIN_NAME = "ergoaggregatorslowdownplugin";
    private static final long AFFECTED_PLATFORM_COUNT = 2L;
    private static final List<String> PLATFORMS = List.of(
            "dynatestsieger.at",
            "tradeCom.co.uk",
            "CryptoTrading.com",
            "CheapTrading.mi",
            "Stratton-oakmount.com");
    private static final long DELAYED_RESPONSE_TIME_MS = 2000L;
    private final HttpConnector httpConnector;

    public ErgoAggregatorSlowdownPluginTest(HttpConnector httpConnector) {
        this.httpConnector = httpConnector;
    }

    public Callback getTestFunctionByState(boolean pluginEnabled) {
        return pluginEnabled ? this::testIfEnabled : this::testIfDisabled;
    }

    public void testIfEnabled() {
        long affectedPlatformsNumber = getAffectedPlatformsNumber();

        assertTrue(affectedPlatformsNumber == AFFECTED_PLATFORM_COUNT,
                "Wrong number of affected platforms, expected ["
                        + AFFECTED_PLATFORM_COUNT + "] were [" + affectedPlatformsNumber + "]");
    }

    public void testIfDisabled() {
        long affectedPlatformsNumber = getAffectedPlatformsNumber();

        assertTrue(affectedPlatformsNumber == 0,
                "Wrong number of affected platforms, expected [0] were [" + affectedPlatformsNumber + "]");
    }

    @Override
    public String getName(){
        return PLUGIN_NAME;
    }

    private long getAffectedPlatformsNumber(){
        return PLATFORMS
                .stream()
                .filter(platform -> checkAffectedPlatform(httpConnector, platform))
                .count();
    }

    private static boolean checkAffectedPlatform(HttpConnector httpConnector, String platform) {
        String platformEndpoint = OFFER_SERVICE_OFFERS_ENDPOINT + platform;
        Duration executionDuration = Timer.timeExecution(() -> httpConnector.getResponseCode(platformEndpoint));
        return executionDuration.compareTo(Duration.ofMillis(DELAYED_RESPONSE_TIME_MS)) >= 0;
    }
    
}
