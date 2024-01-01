namespace EasyTrade.BrokerService.Helpers;

public abstract class TransactionalRepository : ITransactionalRepository
{
    protected readonly BrokerDbContext DbContext;

    protected TransactionalRepository(BrokerDbContext dbContext)
        => DbContext = dbContext;

    // These methods allow Services to transitionally operate on the database without access to DbContext
    public Task BeginTransaction()
        => DbContext.Database.BeginTransactionAsync();

    public Task CommitTransaction()
        => DbContext.Database.CommitTransactionAsync();

    public Task RollbackTransaction()
        => DbContext.Database.RollbackTransactionAsync();

    public Task SaveChanges()
        => DbContext.SaveChangesAsync();
}