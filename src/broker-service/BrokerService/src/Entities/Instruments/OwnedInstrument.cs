using System.ComponentModel.DataAnnotations.Schema;

namespace EasyTrade.BrokerService.Entities.Instruments;

[Table("Ownedinstruments")]
public class OwnedInstrument
{
    public int Id { get; set; }
    public int AccountId { get; set; }
    public int InstrumentId { get; set; }
    public decimal Quantity { get; set; }
    public DateTimeOffset LastModificationDate { get; set; }

    public OwnedInstrument(int accountId, int instrumentId, decimal quantity, DateTimeOffset lastModificationDate)
    {
        AccountId = accountId;
        InstrumentId = instrumentId;
        Quantity = quantity;
        LastModificationDate = lastModificationDate;
    }

    public OwnedInstrument(int accountId, int instrumentId, decimal quantity)
        : this (accountId, instrumentId, quantity, DateTimeOffset.Now) { }
}