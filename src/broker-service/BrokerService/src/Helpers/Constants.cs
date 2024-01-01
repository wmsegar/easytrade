namespace EasyTrade.BrokerService.Helpers
{
    public static class Constants
    {
        public const string PricingService = "PRICINGSERVICE_HOSTANDPORT";
        public const string AccountService = "ACCOUNTSERVICE_HOSTANDPORT";
        public const string EngineService = "ENGINE_HOSTANDPORT";
        public const string ProxyPrefix = "PROXY_PREFIX";
        public const string MsSqlConnectionString = "MSSQL_CONNECTIONSTRING";
        public const string FeatureFlagServiceProtocol = "FEATURE_FLAG_SERVICE_PROTOCOL";
        public const string FeatureFlagServiceBaseUrl = "FEATURE_FLAG_SERVICE_BASE_URL";
        public const string FeatureFlagServicePort = "FEATURE_FLAG_SERVICE_PORT";
        public const int OwnerId = 1;
        public const int InvalidTradeId = -1;
        public const string DbNotResponding = "db_not_responding";
    }
}