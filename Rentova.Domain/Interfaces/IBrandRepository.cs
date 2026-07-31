using Rentova.Entities;

namespace Rentova.Domain.Interfaces;

// Marka Repository Arayüzü
public interface IBrandRepository
{
    List<Brand> GetAll();
    Brand? GetById(int id);
    void Add(Brand brand);
    void Update(Brand brand);
    void Delete(int id);
}
