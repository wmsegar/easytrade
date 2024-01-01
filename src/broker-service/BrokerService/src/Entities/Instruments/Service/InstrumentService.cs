using EasyTrade.BrokerService.Entities.Instruments.DTO;
using EasyTrade.BrokerService.Entities.Instruments.Repository;
using EasyTrade.BrokerService.Entities.Products.Repository;
using EasyTrade.BrokerService.Entities.Prices.ServiceConnector;
using Microsoft.EntityFrameworkCore;
using EasyTrade.BrokerService.Helpers;

namespace EasyTrade.BrokerService.Entities.Instruments.Service;

public class InstrumentService : IInstrumentService
{
    private readonly IInstrumentRepository _instrumentRepository;
    private readonly IPriceServiceConnector _priceServiceConnector;
    private readonly IProductRepository _productRepository;
    private readonly ILogger _logger;

    public InstrumentService(IInstrumentRepository instrumentRepository, IPriceServiceConnector priceServiceConnector, 
                            IProductRepository productRepository, ILogger<InstrumentService> logger)
    {
        _instrumentRepository = instrumentRepository;
        _priceServiceConnector = priceServiceConnector;
        _productRepository = productRepository;
        _logger = logger;
    }

    public async Task<IEnumerable<InstrumentDTO>> GetInstruments(int accountId)
    {
        _logger.LogInformation("Get instruments with account ID [{accountId}]", accountId);

        var instrumentDtoList = new List<InstrumentDTO>();

        var instruments = await _instrumentRepository.GetAllInstruments().ToListAsync();
        var ownedInstruments = await _instrumentRepository.GetOwnedInstrumentsOfAccount(accountId).ToDictionaryAsync(x => x.InstrumentId, x => x);
        var prices = (await _priceServiceConnector.GetLatestPrices()).ToDictionary(x => x.InstrumentId, x => x);
        var products = await _productRepository.GetProducts().ToDictionaryAsync(x => x.Id, x => x);
        foreach(var instrument in instruments)
        {
            var ownedInstrument = ownedInstruments.TryGetValue(instrument.Id, out var value) ? value : default;
            var price = prices[instrument.Id];
            var product = products[instrument.ProductId];

            var newInstrumentDto = new InstrumentDTO(instrument, ownedInstrument, product, price);
            instrumentDtoList.Add(newInstrumentDto);
        }

        _logger.LogDebug("Instruments: {instruments}", instrumentDtoList.ToJson());
        return instrumentDtoList;
    }
}