namespace EasyTrade.BrokerService.ProblemPatterns.OpenFeature;

public interface IPluginManager
{
    Task<bool> GetPluginState(string pluginName, bool defaultValue);
}