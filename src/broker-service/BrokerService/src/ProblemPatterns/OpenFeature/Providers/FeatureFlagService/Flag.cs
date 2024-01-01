namespace EasyTrade.BrokerService.ProblemPatterns.OpenFeature.Providers.FeatureFlagService;

public class Flag
{
    public string Id {get; set;}
    public bool Enabled {get; set;}
    public string Name {get; set;}
    public string Description {get; set;}
    public bool IsModifiable {get; set;}
    public string Tag {get; set;}

    public Flag(string id, bool enabled, string name, string description, bool isModifiable, string tag)
    {
        Id = id;
        Enabled = enabled;
        Name = name;
        Description = description;
        IsModifiable = isModifiable;
        Tag = tag;
    }
}