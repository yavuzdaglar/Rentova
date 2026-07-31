namespace Rentova.Entities;

public class Reservation
{
    public int ReservationId { get; set; }

    // Hangi Kullanıcı
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;

    // Hangi Araç
    public int CarId { get; set; }
    public Car Car { get; set; } = null!;

    // Tarihler
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    // Gün Sayısı (Hesaplanmış - Veritabanına yazılmaz)
    public int TotalDays => Math.Max(0, (EndDate.Date - StartDate.Date).Days + 1);

    // Toplam Tutar (Hesaplanmış - Veritabanına yazılmaz)
    public decimal Price => (Car?.DailyPrice ?? 0m) * TotalDays;

    // Rezervasyon durumu (Hesaplanmış - Veritabanına yazılmaz)
    public string Status => StartDate.Date > DateTime.Today
        ? "Beklemede"
        : EndDate.Date < DateTime.Today
            ? "Bitti"
            : "Aktif";

}
