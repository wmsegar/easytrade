namespace EasyTrade.BrokerService.Entities.Trades.DTO;

public class LongTradeDTO : QuickTradeDTO
{
    public int Duration {get; set;}
    public decimal Price {get; set;}

    public LongTradeDTO(int accountId, int instrumentId, decimal amount, int duration, decimal price)
        : base(accountId, instrumentId, amount) { Duration = duration; Price = price; }
}