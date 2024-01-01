using System.Text.Json;
namespace EasyTrade.BrokerService.Helpers;

public static class JsonSerializationExtension
{
    public static string ToJson(this object value, bool writeIndented = false)
        => JsonSerializer.Serialize(value, new JsonSerializerOptions{ WriteIndented = writeIndented });
}