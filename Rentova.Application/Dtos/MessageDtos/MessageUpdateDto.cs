namespace Rentova.Application.Dtos.MessageDtos;

public class MessageUpdateDto
{
    public int MessageId { get; set; }
    public int AppUserId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? Reply { get; set; }
    public string Status { get; set; } = string.Empty;
}
