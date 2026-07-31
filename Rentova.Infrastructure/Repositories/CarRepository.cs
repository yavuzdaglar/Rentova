using Microsoft.EntityFrameworkCore;
using Rentova.Domain.Interfaces;
using Rentova.Entities;
using Rentova.Infrastructure.Context;

namespace Rentova.Infrastructure.Repositories;

// Araç Repository
public class CarRepository : ICarRepository
{
    private readonly RentovaDbContext _context;

    public CarRepository(RentovaDbContext context)
    {
        _context = context;
    }

    public List<Car> GetAll()
    {
        return _context.Cars
            .Include(c => c.Brand)
            .Include(c => c.FuelType)
            .Include(c => c.TransmissionType)
            .Include(c => c.VehicleType)
            .Include(c => c.SeatCount)
            .ToList();
    }

    public Car? GetById(int id)
    {
        return _context.Cars
            .Include(c => c.Brand)
            .Include(c => c.FuelType)
            .Include(c => c.TransmissionType)
            .Include(c => c.VehicleType)
            .Include(c => c.SeatCount)
            .FirstOrDefault(c => c.CarId == id);
    }

    public void Add(Car car)
    {
        _context.Cars.Add(car);
        _context.SaveChanges();
    }

    public void Update(Car car)
    {
        _context.Cars.Attach(car);
        _context.Entry(car).State = EntityState.Modified;
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var car = _context.Cars.Find(id);
        if (car != null)
        {
            _context.Cars.Remove(car);
            _context.SaveChanges();
        }
    }

    public List<Car> GetMainScreenCars()
    {
        return _context.Cars
            .Include(c => c.Brand)
            .Include(c => c.FuelType)
            .Include(c => c.TransmissionType)
            .Include(c => c.VehicleType)
            .Include(c => c.SeatCount)
            .Where(c => c.MainScreen == true)
            .ToList();
    }

    public List<Car> GetPopularScreen1Cars()
    {
        return _context.Cars
            .Include(c => c.Brand)
            .Include(c => c.FuelType)
            .Include(c => c.TransmissionType)
            .Include(c => c.VehicleType)
            .Include(c => c.SeatCount)
            .Where(c => c.PopularScreen1 == true)
            .ToList();
    }

    public List<Car> GetPopularScreen2Cars()
    {
        return _context.Cars
            .Include(c => c.Brand)
            .Include(c => c.FuelType)
            .Include(c => c.TransmissionType)
            .Include(c => c.VehicleType)
            .Include(c => c.SeatCount)
            .Where(c => c.PopularScreen2 == true)
            .ToList();
    }
}
