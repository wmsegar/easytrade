namespace EasyTrade.BrokerService.Entities.Trades.DTO;

public class QuickTradeDTO
{
    public int AccountId {get; set;}
    public int InstrumentId {get; set;}
    public decimal Amount {get; set;}

    public QuickTradeDTO(int accountId, int instrumentId, decimal amount)
    {
        AccountId = accountId;
        InstrumentId = instrumentId;
        Amount = amount;
    }
}