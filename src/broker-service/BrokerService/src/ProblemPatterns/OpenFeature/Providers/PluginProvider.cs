using EasyTrade.BrokerService.ProblemPatterns.OpenFeature.Providers.FeatureFlagService;
using OpenFeature;
using OpenFeature.Model;

namespace EasyTrade.BrokerService.ProblemPatterns.OpenFeature.Providers;

public class PluginProvider : FeatureProvider
{
    public static string Name => "Plugin Provider";
    private readonly IFeatureFlagServiceConnector _flagServiceConnector;

    public PluginProvider(IFeatureFlagServiceConnector flagServiceConnector)
        => _flagServiceConnector = flagServiceConnector;

    public override Metadata GetMetadata()
        => new(Name);

    public override async Task<ResolutionDetails<bool>> ResolveBooleanValue(string flagKey, bool defaultValue, EvaluationContext? context = null)
    {
        var flag = await _flagServiceConnector.GetFlag(flagKey);
        var value = flag is null ? defaultValue : flag.Enabled;
        return await Task.FromResult(new ResolutionDetails<bool>(flagKey, value));
    }

    public override Task<ResolutionDetails<double>> ResolveDoubleValue(string flagKey, double defaultValue, EvaluationContext? context = null)
        => throw new NotImplementedException();

    public override Task<ResolutionDetails<int>> ResolveIntegerValue(string flagKey, int defaultValue, EvaluationContext? context = null)
        => throw new NotImplementedException();

    public override Task<ResolutionDetails<string>> ResolveStringValue(string flagKey, string defaultValue, EvaluationContext? context = null)
        => throw new NotImplementedException();

    public override Task<ResolutionDetails<Value>> ResolveStructureValue(string flagKey, Value defaultValue, EvaluationContext? context = null)
        => throw new NotImplementedException();
}