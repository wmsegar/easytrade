using OpenFeature;

namespace EasyTrade.BrokerService.ProblemPatterns.OpenFeature;

public class PluginManager : IPluginManager
{
    private readonly Api _openFeature;

    public PluginManager(FeatureProvider provider)
    {
        _openFeature = Api.Instance;
        _openFeature.SetProvider(provider);
    }

    public Task<bool> GetPluginState(string pluginName, bool defaultValue)
        => _openFeature.GetClient().GetBooleanValue(pluginName, defaultValue);
}