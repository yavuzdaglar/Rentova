namespace Rentova.Entities;

public class AppUser
{
    public int AppUserId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public bool IsAdmin { get; set; } = false;

    public List<Reservation> Reservations { get; set; } = new();
    public List<Message> Messages { get; set; } = new();
}
