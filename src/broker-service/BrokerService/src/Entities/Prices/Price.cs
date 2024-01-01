namespace EasyTrade.BrokerService.Entities.Prices;

public class Price
{
    public int Id { get; set; }
    public int InstrumentId { get; set; }
    public DateTimeOffset Timestamp { get; set; }
    public decimal Open { get; set; }
    public decimal High { get; set; }
    public decimal Low { get; set; }
    public decimal Close { get; set; }

    public Price(int instrumentId, DateTimeOffset timestamp, decimal open, decimal high, decimal low, decimal close)
    {
        InstrumentId = instrumentId;
        Timestamp = timestamp;
        Open = open;
        High = high;
        Low = low;
        Close = close;
    }
}