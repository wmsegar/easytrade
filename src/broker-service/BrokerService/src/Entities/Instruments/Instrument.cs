namespace EasyTrade.BrokerService.Entities.Instruments;

public class Instrument
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public Instrument(string code, string name, string description)
    {
        Code = code;
        Name = name;
        Description = description;
    }

    public Instrument(int id, int productId, string code, string name, string description)
            : this(code, name, description)
    {
        Id = id;
        ProductId = productId;
    }
}