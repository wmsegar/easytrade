namespace EasyTrade.BrokerService.Entities.Packages;

public class Package
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Support { get; set; }

    public Package(string name, decimal price, string support)
    {
        Name = name;
        Price = price;
        Support = support;
    }
}