package integrationTests;

import org.junit.jupiter.api.Test;

import integrationTests.PluginTestProvider.IPluginTestSuite;

import org.junit.jupiter.api.BeforeAll;
import static integrationTests.Constants.*;
import static org.junit.jupiter.api.Assumptions.assumeTrue;

import java.util.Optional;
import java.util.stream.Stream;

class PluginTest {
    private static final PluginTestProvider pluginTestProvider = new PluginTestProvider();
    private static String pluginName;
    private static String pluginEnabled;

    @BeforeAll
    public static void setup() {
        String easytradeBaseUrl = Properties.ensureProperty(EASYTRADE_BASE_URL_PROP_NAME);
        pluginEnabled = Properties.ensureProperty(PLUGIN_ENABLED_PROP_NAME);
        pluginName = Properties.ensureProperty(PLUGIN_NAME_PROP_NAME);

        HttpConnector httpConnector = new HttpConnector(Url.getUrl(easytradeBaseUrl));
        registerPluginTests(pluginTestProvider, httpConnector);
    }

    @Test
    void testPlugin() {
        Optional<IPluginTestSuite> pluginTestSuite = pluginTestProvider.getTestSuite(pluginName);
        assumeTrue(pluginTestSuite.isPresent());
        pluginTestSuite.get().getTestFunctionByState(Boolean.parseBoolean(pluginEnabled)).call();
    }

    private static void registerPluginTests(PluginTestProvider pluginTestProvider, HttpConnector httpConnector) {
        Stream.of(new ErgoAggregatorSlowdownPluginTest(httpConnector)).forEach(pluginTestProvider::registerPluginTest);
    }
}