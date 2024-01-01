package integrationTests.models;

import integrationTests.models.pluginData.IPluginData;

public class Provider<T extends IPluginData> {
    public final String name;
    public final boolean enabled;
    public final T pluginData;

    public Provider(String name, boolean enabled, T pluginData) {
        this.name = name;
        this.enabled = enabled;
        this.pluginData = pluginData;
    }
}
