namespace EasyTrade.BrokerService.ProblemPatterns.OpenFeature.Providers.FeatureFlagService;

public class FlagResultsDTO
{
    public IEnumerable<Flag> Results {get; set;}

    public FlagResultsDTO(IEnumerable<Flag> results)
        => Results = results;
}