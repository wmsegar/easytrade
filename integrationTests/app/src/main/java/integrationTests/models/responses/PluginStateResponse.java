package integrationTests.models.responses;

import java.util.List;
import java.util.Optional;

import integrationTests.models.Provider;
import integrationTests.models.pluginData.IPluginData;

public class PluginStateResponse<T extends IPluginData> {
    public final String name;
    public final List<Provider<T>> providers;

    public PluginStateResponse(String name, List<Provider<T>> providers) {
        this.name = name;
        this.providers = providers;
    }

    public Optional<Provider<T>> getProvider(String providerName) {
        return providers.stream().filter(p -> p.name.equals(providerName)).findFirst();
    }
}
