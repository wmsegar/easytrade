namespace EasyTrade.BrokerService.Entities.Prices.DTO;

public class PriceDTO
{
    public DateTimeOffset Timestamp {get; set;}
    public decimal Open {get; set;}
    public decimal Close {get; set;}
    public decimal Low {get; set;}
    public decimal High {get; set;}

    public PriceDTO(Price price) : this(price.Timestamp, price.Open, price.Close, price.Low, price.High) { }

    public PriceDTO(DateTimeOffset timestamp, decimal open, decimal close, decimal low, decimal high)
    {
        Timestamp = timestamp;
        Open = open;
        Close = close;
        Low = low;
        High = high;
    }
}