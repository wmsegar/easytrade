package integrationTests.models.pluginData;

import java.util.List;

public class ErgoAggregatorSlowdownPluginData implements IPluginData{
    public final List<String> affectedPlatforms;

    public ErgoAggregatorSlowdownPluginData(List<String> affectedPlatforms){
        this.affectedPlatforms = affectedPlatforms;
    }
}
