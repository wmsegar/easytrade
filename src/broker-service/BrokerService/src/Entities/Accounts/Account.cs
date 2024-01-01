namespace EasyTrade.BrokerService.Entities.Accounts;

public class Account
{
    public int Id { get; set; }
    public int PackageId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string HashedPassword { get; set; }
    public string Origin { get; set; }
    public DateTimeOffset CreationDate { get; set; }
    public DateTimeOffset PackageActivationDate { get; set; }
    public bool AccountActive { get; set; }
    public string Address { get; set; }

    public Account(int id, int packageId, string firstName, string lastName, string username, string email, string hashedPassword,
                    string origin, DateTimeOffset creationDate, DateTimeOffset packageActivationDate, bool accountActive, string address)
    {
        Id = id;
        PackageId = packageId;
        FirstName = firstName;
        LastName = lastName;
        Username = username;
        Email = email;
        HashedPassword = hashedPassword;
        Origin = origin;
        CreationDate = creationDate;
        PackageActivationDate = packageActivationDate;
        AccountActive = accountActive;
        Address = address;
    }
}