# Integration tests
Integration tests for **EasyTrade**

## Requirements
- Java 11

## Adding new tests
Simply add another task definition to `build.gradle`, for example:
```gradle
task pluginTest(type: Test, dependsOn: testClasses){
    systemProperties = ["easyTradeUrl": easyTradeUrl, "pluginName": pluginName, "pluginEnabled": pluginEnabled]

    include "integrationTests/PluginTest*"
}
```
- `systemProperties` define list of parameters requried by the test
    > **NOTE:** gradle throws errors when an undefined variable is used here, that's why they are also put in `gradle.properties` with no values
- `include` define which files should be used when discovering tests

## Tests for plugins (problem patterns)
to run the test use:
```bash
./gradlew clean pluginTest -PeasyTradeUrl={url to easytrade reverse proxy} -PpluginName={name of plugin} -PpluginEnabled={true|false}
# example
./gradlew clean pluginTest -PeasyTradeUrl=easytrade.dev.demoability.dynatracelabs.com -PpluginName=ergoaggregatorslowdownplugin -PpluginEnabled=true
```
List of plugins with test:
- ergoaggregatorslowdownplugin

### Adding test for plugin
1. Add a class implementing `IPluginTestSuite` interface (example: `ErgoAggregatorSlowdownPluginTest`) that will contain the logic for testing if plugin is enabled/disabled.
2. Register the test in `PluginTest::registerPluginTests`