package integrationTests;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class PluginTestProvider {
    private final Map<String, IPluginTestSuite> pluginTestRegistry;

    public PluginTestProvider() {
        pluginTestRegistry = new HashMap<>();
    }

    public void registerPluginTest(String pluginName, IPluginTestSuite testSuite) {
        pluginTestRegistry.put(pluginName, testSuite);
    }

    public void registerPluginTest(IPluginTestSuite testSuite) {
        registerPluginTest(testSuite.getName(), testSuite);
    }

    public Optional<IPluginTestSuite> getTestSuite(String pluginName) {
        return Optional.ofNullable(pluginTestRegistry.get(pluginName));
    }

    public interface IPluginTestSuite {
        public Callback getTestFunctionByState(boolean pluginEnabled);

        public void testIfEnabled();

        public void testIfDisabled();

        public String getName();
    }
}