namespace Rentova.Application.Dtos.MessageDtos;

public class MessageAddDto
{
    public int AppUserId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? Status { get; set; }
}
