using Microsoft.EntityFrameworkCore;
using Rentova.Domain.Interfaces;
using Rentova.Entities;
using Rentova.Infrastructure.Context;

namespace Rentova.Infrastructure.Repositories;

// Araç Tipi Repository
public class VehicleTypeRepository : IVehicleTypeRepository
{
    private readonly RentovaDbContext _context;

    public VehicleTypeRepository(RentovaDbContext context)
    {
        _context = context;
    }

    public List<VehicleType> GetAll()
    {
        return _context.VehicleTypes.ToList();
    }

    public VehicleType? GetById(int id)
    {
        return _context.VehicleTypes.Find(id);
    }

    public void Add(VehicleType vehicleType)
    {
        _context.VehicleTypes.Add(vehicleType);
        _context.SaveChanges();
    }

    public void Update(VehicleType vehicleType)
    {
        _context.VehicleTypes.Attach(vehicleType);
        _context.Entry(vehicleType).State = EntityState.Modified;
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var vehicleType = _context.VehicleTypes.Find(id);
        if (vehicleType != null)
        {
            _context.VehicleTypes.Remove(vehicleType);
            _context.SaveChanges();
        }
    }
}
