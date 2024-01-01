using System.Net;
using EasyTrade.BrokerService.Helpers;

namespace EasyTrade.BrokerService.ProblemPatterns.OpenFeature.Providers.FeatureFlagService;

public class FeatureFlagServiceConnector : IFeatureFlagServiceConnector
{
    private readonly IConfiguration _config;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger _logger;
    private string FeatureFlagServiceUrl =>
        $"{_config[Constants.FeatureFlagServiceProtocol]}://{_config[Constants.FeatureFlagServiceBaseUrl]}:{_config[Constants.FeatureFlagServicePort]}/v1/";

    public FeatureFlagServiceConnector(IConfiguration configuration, IHttpClientFactory httpClientFactory, ILogger<FeatureFlagServiceConnector> logger)
    {
        _config = configuration;
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    public async Task<Flag?> GetFlag(string id)
    {
        var endpoint = $"flags/{id}";
        using var client = GetHttpClient();
        using var response = await client.GetAsync(endpoint);
        if(response.StatusCode == HttpStatusCode.OK)
        {
            return await response.Content.ReadFromJsonAsync<Flag>();
        }
        _logger.LogWarning("Flag with id [{id}] not found", id);
        return null;
    }

    private HttpClient GetHttpClient()
    {
        var client = _httpClientFactory.CreateClient();
        client.BaseAddress = new Uri(FeatureFlagServiceUrl);
        return client;
    }
}