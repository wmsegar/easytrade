namespace EasyTrade.BrokerService.Entities.Products;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Ppt { get; set; }
    public string Currency { get; set; }

    public Product(string name, decimal ppt, string currency)
    {
        Name = name;
        Ppt = ppt;
        Currency = currency;
    }

    public Product(int id, string name, decimal ppt, string currency)
              : this(name, ppt, currency)
    {
        Id = id;
    }
}