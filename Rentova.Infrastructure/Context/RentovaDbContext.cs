using Microsoft.EntityFrameworkCore;
using Rentova.Entities;

namespace Rentova.Infrastructure.Context;

public class RentovaDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // SQL Lokasyonu / Bağlantı Metni
        optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=Rentova;Trusted_Connection=True;");
    }

    public DbSet<Car> Cars { get; set; } = null!;
    public DbSet<Brand> Brands { get; set; } = null!;
    public DbSet<FuelType> FuelTypes { get; set; } = null!;
    public DbSet<TransmissionType> TransmissionTypes { get; set; } = null!;
    public DbSet<VehicleType> VehicleTypes { get; set; } = null!;
    public DbSet<SeatCount> SeatCounts { get; set; } = null!;
    public DbSet<AppUser> AppUsers { get; set; } = null!;
    public DbSet<Reservation> Reservations { get; set; } = null!;
    public DbSet<Message> Messages { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Car>().HasKey(c => c.CarId);
        modelBuilder.Entity<Brand>().HasKey(b => b.BrandId);
        modelBuilder.Entity<FuelType>().HasKey(f => f.FuelTypeId);
        modelBuilder.Entity<TransmissionType>().HasKey(t => t.TransmissionTypeId);
        modelBuilder.Entity<VehicleType>().HasKey(v => v.VehicleTypeId);
        modelBuilder.Entity<SeatCount>().HasKey(s => s.SeatCountId);
        modelBuilder.Entity<AppUser>().HasKey(a => a.AppUserId);
        modelBuilder.Entity<Reservation>().HasKey(r => r.ReservationId);
        modelBuilder.Entity<Message>().HasKey(m => m.MessageId);

        // TotalDays hesaplanmış property - veritabanına yazılmaz
        modelBuilder.Entity<Reservation>().Ignore(r => r.TotalDays);
        modelBuilder.Entity<Reservation>().Ignore(r => r.Price);
        modelBuilder.Entity<Reservation>().Ignore(r => r.Status);

        // İlişkileri belirleme
        modelBuilder.Entity<Car>()
            .HasOne(c => c.Brand)
            .WithMany()
            .HasForeignKey(c => c.BrandId);

        modelBuilder.Entity<Car>()
            .HasOne(c => c.FuelType)
            .WithMany()
            .HasForeignKey(c => c.FuelTypeId);

        modelBuilder.Entity<Car>()
            .HasOne(c => c.TransmissionType)
            .WithMany()
            .HasForeignKey(c => c.TransmissionTypeId);

        modelBuilder.Entity<Car>()
            .HasOne(c => c.VehicleType)
            .WithMany()
            .HasForeignKey(c => c.VehicleTypeId);

        modelBuilder.Entity<Car>()
            .HasOne(c => c.SeatCount)
            .WithMany()
            .HasForeignKey(c => c.SeatCountId);

        // Rezervasyon İlişkileri
        modelBuilder.Entity<Reservation>()
            .HasOne(r => r.AppUser)
            .WithMany(u => u.Reservations)
            .HasForeignKey(r => r.AppUserId);

        modelBuilder.Entity<Reservation>()
            .HasOne(r => r.Car)
            .WithMany()
            .HasForeignKey(r => r.CarId);

        // Rezervasyon takvimi sorgularini hizlandirir
        modelBuilder.Entity<Reservation>()
            .HasIndex(r => new { r.CarId, r.StartDate });

        // Mesaj İlişkileri
        modelBuilder.Entity<Message>()
            .HasOne(m => m.AppUser)
            .WithMany(u => u.Messages)
            .HasForeignKey(m => m.AppUserId);

        modelBuilder.Entity<Message>()
            .HasIndex(m => new { m.AppUserId, m.CreatedDate });
    }
}
