using Microsoft.EntityFrameworkCore;
using Rentova.Domain.Interfaces;
using Rentova.Entities;
using Rentova.Infrastructure.Context;
using System.Data;

namespace Rentova.Infrastructure.Repositories;

public class ReservationRepository : IReservationRepository
{
    private readonly RentovaDbContext _context;

    public ReservationRepository(RentovaDbContext context)
    {
        _context = context;
    }

    public void Add(Reservation reservation)
    {
        using var transaction = _context.Database.BeginTransaction(IsolationLevel.Serializable);

        if (HasOverlap(reservation.CarId, reservation.StartDate, reservation.EndDate))
        {
            throw new InvalidOperationException("Bu arac secilen tarih araliginda zaten rezerve edildi.");
        }

        _context.Reservations.Add(reservation);
        _context.SaveChanges();
        transaction.Commit();
    }

    public void Delete(int id)
    {
        var reservation = _context.Reservations.Find(id);
        if (reservation != null)
        {
            _context.Reservations.Remove(reservation);
            _context.SaveChanges();
        }
    }

    public List<Reservation> GetAll()
    {
        return _context.Reservations
            .Include(r => r.AppUser)
            .Include(r => r.Car).ThenInclude(c => c.Brand)
            .ToList();
    }

    public List<Reservation> GetByCarId(int carId)
    {
        return _context.Reservations
            .Include(r => r.AppUser)
            .Include(r => r.Car).ThenInclude(c => c.Brand)
            .Where(r => r.CarId == carId)
            .ToList();
    }

    public Reservation? GetById(int id)
    {
        return _context.Reservations
            .Include(r => r.AppUser)
            .Include(r => r.Car).ThenInclude(c => c.Brand)
            .FirstOrDefault(r => r.ReservationId == id);
    }

    public List<Reservation> GetByUserId(int userId)
    {
        return _context.Reservations
            .Include(r => r.AppUser)
            .Include(r => r.Car).ThenInclude(c => c.Brand)
            .Where(r => r.AppUserId == userId)
            .ToList();
    }

    public void Update(Reservation reservation)
    {
        using var transaction = _context.Database.BeginTransaction(IsolationLevel.Serializable);

        if (HasOverlap(reservation.CarId, reservation.StartDate, reservation.EndDate, reservation.ReservationId))
        {
            throw new InvalidOperationException("Bu arac secilen tarih araliginda zaten rezerve edildi.");
        }

        _context.Reservations.Update(reservation);
        _context.SaveChanges();
        transaction.Commit();
    }

    private bool HasOverlap(int carId, DateTime startDate, DateTime endDate, int? excludeReservationId = null)
    {
        var query = _context.Reservations.Where(r =>
            r.CarId == carId &&
            r.StartDate.Date <= endDate.Date &&
            startDate.Date <= r.EndDate.Date);

        if (excludeReservationId.HasValue)
        {
            query = query.Where(r => r.ReservationId != excludeReservationId.Value);
        }

        return query.Any();
    }
}
