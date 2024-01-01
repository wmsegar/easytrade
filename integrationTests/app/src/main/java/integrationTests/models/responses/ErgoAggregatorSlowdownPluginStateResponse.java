package integrationTests.models.responses;

import java.util.List;

import integrationTests.models.Provider;
import integrationTests.models.pluginData.ErgoAggregatorSlowdownPluginData;

public class ErgoAggregatorSlowdownPluginStateResponse extends PluginStateResponse<ErgoAggregatorSlowdownPluginData> {

    public ErgoAggregatorSlowdownPluginStateResponse(String name,
            List<Provider<ErgoAggregatorSlowdownPluginData>> providers) {
        super(name, providers);
    }
    
}
