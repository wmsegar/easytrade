using EasyTrade.BrokerService.Helpers;

namespace EasyTrade.BrokerService.Entities.Trades;

public class Trade
{
    public int Id { get; set; }
    public int AccountId { get; set; }
    public int InstrumentId { get; set; }
    public string Direction { get; set; }
    public decimal Quantity { get; set; }
    public decimal EntryPrice { get; set; }
    public DateTimeOffset TimestampOpen { get; set; }
    public DateTimeOffset? TimestampClose { get; set; }
    public bool TradeClosed { get; set; }
    public bool TransactionHappened { get; set; }
    public string Status { get; set; }

    public Trade(int accountId, int instrumentId, string direction, decimal quantity, decimal entryPrice,
                DateTimeOffset timestampOpen, DateTimeOffset? timestampClose, bool tradeClosed, bool transactionHappened, string status)
    {
        AccountId = accountId;
        InstrumentId = instrumentId;
        Direction = direction;
        Quantity = quantity;
        EntryPrice = entryPrice;
        TimestampOpen = timestampOpen;
        TimestampClose = timestampClose;
        TradeClosed = tradeClosed;
        TransactionHappened = transactionHappened;
        Status = status;
    }

    public Trade(int id, int accountId, int instrumentId, string direction, decimal quantity, decimal entryPrice,
                DateTimeOffset timestampOpen, DateTimeOffset? timestampClose, bool tradeClosed, bool transactionHappened, string status)
                : this(accountId, instrumentId, direction, quantity, entryPrice, timestampOpen, timestampClose, tradeClosed, transactionHappened, status)
                => Id = id;

    public static Trade QuickTrade(int accountId, int instrumentId, ActionType direction, decimal price, decimal quantity)
        => new(accountId, instrumentId, direction.ToString().ToLower(), quantity, price, DateTimeOffset.Now,
                        DateTimeOffset.Now, true, true, "Instant " + direction.ToString() + " done.");

    public static Trade LongTrade(int accountId, int instrumentId, ActionType direction, decimal price, decimal quantity, int duration)
        => new(accountId, instrumentId, direction.ToString().ToLower(), quantity, price, DateTimeOffset.Now,
                DateTimeOffset.Now.AddHours(duration), false, false,direction.ToString() + " registered.");
}