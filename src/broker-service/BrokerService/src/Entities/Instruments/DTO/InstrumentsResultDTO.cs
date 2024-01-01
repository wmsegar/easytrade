namespace EasyTrade.BrokerService.Entities.Instruments.DTO;

public class InstrumentsResultDTO
{
    public IEnumerable<InstrumentDTO> Results {get; set;}

    public InstrumentsResultDTO(IEnumerable<InstrumentDTO> results)
        => Results = results;
}