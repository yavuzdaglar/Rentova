namespace Rentova.UI.Dtos.MessageDtos;

public class MessageGetDto
{
    public int MessageId { get; set; }
    public int AppUserId { get; set; }
    public string UserFullName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? Reply { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
}
