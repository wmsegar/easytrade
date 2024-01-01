namespace EasyTrade.BrokerService.Entities.Trades.DTO;

public class TradeDTO
{
    public int InstrumentId { get; set; }
    public string Direction { get; set; }
    public decimal Quantity { get; set; }
    public decimal EntryPrice { get; set; }
    public DateTimeOffset TimestampOpen { get; set; }
    public DateTimeOffset? TimestampClose { get; set; }
    public bool TradeClosed { get; set; }
    public bool TransactionHappened { get; set; }
    public string Status { get; set; }

    public TradeDTO(Trade trade)
    {
        InstrumentId = trade.InstrumentId;
        Direction = trade.Direction;
        Quantity = trade.Quantity;
        EntryPrice = trade.EntryPrice;
        TimestampOpen = trade.TimestampOpen;
        TimestampClose = trade.TimestampClose;
        TradeClosed = trade.TradeClosed;
        TransactionHappened = trade.TransactionHappened;
        Status = trade.Status;
    }
}