using EasyTrade.BrokerService.ExceptionHandling.Exceptions;
using EasyTrade.BrokerService.Entities.Balances;
using EasyTrade.BrokerService.Entities.Instruments;
using EasyTrade.BrokerService.Entities.Prices;
using EasyTrade.BrokerService.Entities.Products;
using EasyTrade.BrokerService.Entities.Trades.Service;
using EasyTrade.BrokerService.ProblemPatterns.OpenFeature;
using EasyTrade.BrokerService.ProblemPatterns.OpenFeature.Providers;
using EasyTrade.BrokerService.Helpers;
using EasyTrade.BrokerService.Test.Fakes;
using Microsoft.Extensions.Logging;
using EasyTrade.BrokerService.ProblemPatterns.OpenFeature.Providers.FeatureFlagService;

namespace EasyTrade.BrokerService.Test.UnitTests;

public class OpenFeatureTests
{
    private FakeFeatureFlagServiceConnector? _flagServiceConnector;

    [Fact]
    public async Task GetFlag_WithUndefinedValue_ShouldReturnDefault()
    {
        // Arrange
        var pluginManager = BuildPluginManager();
        const bool defaultValue = true;
        // Act
        var value = await pluginManager.GetPluginState(Constants.DbNotResponding, defaultValue);
        // Assert
        Assert.Equal(defaultValue, value);
    }

    [Fact]
    public async Task GetFlag_WithFalseValue_ShouldReturnFalse()
    {
        // Arrange
        var pluginManager = BuildPluginManager();
        const bool defaultValue = true;
        SetFlag(false);
        // Act
        var value = await pluginManager.GetPluginState(Constants.DbNotResponding, defaultValue);
        // Assert
        Assert.False(value);
    }

    [Fact]
    public async Task GetFlag_WithTrueValue_ShouldReturnTrue()
    {
        // Arrange
        var pluginManager = BuildPluginManager();
        const bool defaultValue = false;
        SetFlag(true);
        // Act
        var value = await pluginManager.GetPluginState(Constants.DbNotResponding, defaultValue);
        // Assert
        Assert.True(value);
    }

    private void SetFlag(bool enabled)
        => _flagServiceConnector!.SetFlag(new Flag(Constants.DbNotResponding, enabled, "", "", true, ""));

    private IPluginManager BuildPluginManager()
    {
        _flagServiceConnector = new();
        return new PluginManager(new PluginProvider(_flagServiceConnector));
    }
}