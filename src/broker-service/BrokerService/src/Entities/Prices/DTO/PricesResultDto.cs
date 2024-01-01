namespace EasyTrade.BrokerService.Entities.Prices.DTO;

public class PricesResultDto
{
    public PricesResultDto(IEnumerable<Price> results)
    {
        Results = results;
    }

    public IEnumerable<Price> Results { get; set; }
}