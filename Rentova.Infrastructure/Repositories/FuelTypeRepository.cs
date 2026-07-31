using Microsoft.EntityFrameworkCore;
using Rentova.Domain.Interfaces;
using Rentova.Entities;
using Rentova.Infrastructure.Context;

namespace Rentova.Infrastructure.Repositories;

// Yakıt Türü Repository
public class FuelTypeRepository : IFuelTypeRepository
{
    private readonly RentovaDbContext _context;

    public FuelTypeRepository(RentovaDbContext context)
    {
        _context = context;
    }

    public List<FuelType> GetAll()
    {
        return _context.FuelTypes.ToList();
    }

    public FuelType? GetById(int id)
    {
        return _context.FuelTypes.Find(id);
    }

    public void Add(FuelType fuelType)
    {
        _context.FuelTypes.Add(fuelType);
        _context.SaveChanges();
    }

    public void Update(FuelType fuelType)
    {
        _context.FuelTypes.Attach(fuelType);
        _context.Entry(fuelType).State = EntityState.Modified;
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var fuelType = _context.FuelTypes.Find(id);
        if (fuelType != null)
        {
            _context.FuelTypes.Remove(fuelType);
            _context.SaveChanges();
        }
    }
}
