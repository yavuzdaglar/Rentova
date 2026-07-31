namespace Rentova.Entities;

public class Message
{
    public int MessageId { get; set; }

    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;

    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? Reply { get; set; }
    public string Status { get; set; } = "Cevap Bekleniyor";
    public DateTime CreatedDate { get; set; } = DateTime.Now;
}
