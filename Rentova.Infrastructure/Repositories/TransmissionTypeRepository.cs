using Microsoft.EntityFrameworkCore;
using Rentova.Domain.Interfaces;
using Rentova.Entities;
using Rentova.Infrastructure.Context;

namespace Rentova.Infrastructure.Repositories;

// Vites Türü Repository
public class TransmissionTypeRepository : ITransmissionTypeRepository
{
    private readonly RentovaDbContext _context;

    public TransmissionTypeRepository(RentovaDbContext context)
    {
        _context = context;
    }

    public List<TransmissionType> GetAll()
    {
        return _context.TransmissionTypes.ToList();
    }

    public TransmissionType? GetById(int id)
    {
        return _context.TransmissionTypes.Find(id);
    }

    public void Add(TransmissionType transmissionType)
    {
        _context.TransmissionTypes.Add(transmissionType);
        _context.SaveChanges();
    }

    public void Update(TransmissionType transmissionType)
    {
        _context.TransmissionTypes.Attach(transmissionType);
        _context.Entry(transmissionType).State = EntityState.Modified;
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var transmissionType = _context.TransmissionTypes.Find(id);
        if (transmissionType != null)
        {
            _context.TransmissionTypes.Remove(transmissionType);
            _context.SaveChanges();
        }
    }
}
