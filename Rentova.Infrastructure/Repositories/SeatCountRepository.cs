using Microsoft.EntityFrameworkCore;
using Rentova.Domain.Interfaces;
using Rentova.Entities;
using Rentova.Infrastructure.Context;

namespace Rentova.Infrastructure.Repositories;

// Koltuk Sayısı Repository
public class SeatCountRepository : ISeatCountRepository
{
    private readonly RentovaDbContext _context;

    public SeatCountRepository(RentovaDbContext context)
    {
        _context = context;
    }

    public List<SeatCount> GetAll()
    {
        return _context.SeatCounts.ToList();
    }

    public SeatCount? GetById(int id)
    {
        return _context.SeatCounts.Find(id);
    }

    public void Add(SeatCount seatCount)
    {
        _context.SeatCounts.Add(seatCount);
        _context.SaveChanges();
    }

    public void Update(SeatCount seatCount)
    {
        _context.SeatCounts.Attach(seatCount);
        _context.Entry(seatCount).State = EntityState.Modified;
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var seatCount = _context.SeatCounts.Find(id);
        if (seatCount != null)
        {
            _context.SeatCounts.Remove(seatCount);
            _context.SaveChanges();
        }
    }
}
