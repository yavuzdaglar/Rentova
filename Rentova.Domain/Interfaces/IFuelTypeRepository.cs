using Rentova.Entities;

namespace Rentova.Domain.Interfaces;

// Yakıt Türü Repository Arayüzü
public interface IFuelTypeRepository
{
    List<FuelType> GetAll();
    FuelType? GetById(int id);
    void Add(FuelType fuelType);
    void Update(FuelType fuelType);
    void Delete(int id);
}
