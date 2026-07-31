using Rentova.UI.Dtos.MessageDtos;
using Rentova.UI.Dtos.ReservationDtos;

namespace Rentova.UI.Models.AccountMenu;

public class AccountMenuPageViewModel
{
    public int UserId { get; set; }
    public bool IsAdmin { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;

    public string FullName => $"{FirstName} {LastName}".Trim();

    public List<ReservationGetDto> Reservations { get; set; } = new();
    public List<MessageGetDto> Messages { get; set; } = new();

    public string ReservationFeedback { get; set; } = string.Empty;
    public string MessageFeedback { get; set; } = string.Empty;
    public string ProfileFeedback { get; set; } = string.Empty;
    public bool IsProfileFeedbackError { get; set; }
    public string PasswordFeedback { get; set; } = string.Empty;
    public bool IsPasswordFeedbackError { get; set; }
}
