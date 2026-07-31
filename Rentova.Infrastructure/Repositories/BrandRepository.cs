using Microsoft.EntityFrameworkCore;
using Rentova.Domain.Interfaces;
using Rentova.Entities;
using Rentova.Infrastructure.Context;

namespace Rentova.Infrastructure.Repositories;

// Marka Repository
public class BrandRepository : IBrandRepository
{
    private readonly RentovaDbContext _context;

    public BrandRepository(RentovaDbContext context)
    {
        _context = context;
    }

    public List<Brand> GetAll()
    {
        return _context.Brands.ToList();
    }

    public Brand? GetById(int id)
    {
        return _context.Brands.Find(id);
    }

    public void Add(Brand brand)
    {
        _context.Brands.Add(brand);
        _context.SaveChanges();
    }

    public void Update(Brand brand)
    {
        _context.Brands.Attach(brand);
        _context.Entry(brand).State = EntityState.Modified;
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var brand = _context.Brands.Find(id);
        if (brand != null)
        {
            _context.Brands.Remove(brand);
            _context.SaveChanges();
        }
    }
}
