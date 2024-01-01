namespace EasyTrade.BrokerService.Entities.Balances.DTO;

public class WithdrawMoneyDTO
{
        public decimal Amount { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string CardNumber { get; set; }
        public string CardType { get; set; }

        public WithdrawMoneyDTO(decimal amount, string name, string address, string email, string cardNumber, string cardType)
        {
            Amount = amount;
            Name = name;
            Address = address;
            Email = email;
            CardNumber = cardNumber;
            CardType = cardType;
        }
}