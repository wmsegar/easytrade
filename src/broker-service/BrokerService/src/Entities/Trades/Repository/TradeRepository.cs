using EasyTrade.BrokerService.Helpers;

namespace EasyTrade.BrokerService.Entities.Trades.Repository;

public class TradeRepository : TransactionalRepository, ITradeRepository
{
    public TradeRepository(BrokerDbContext dbContext) : base(dbContext) { }

    public virtual void AddTrade(Trade trade)
        => DbContext.Trades.Add(trade);

    public IQueryable<Trade> GetAllTrades()
        => DbContext.Trades.AsQueryable();

    public void UpdateTrade(Trade trade)
        => DbContext.Trades.Update(trade);
}