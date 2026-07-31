using Rentova.Entities;

namespace Rentova.Domain.Interfaces;

// Araç Repository Arayüzü
public interface ICarRepository
{
    List<Car> GetAll();
    Car? GetById(int id);
    void Add(Car car);
    void Update(Car car);
    void Delete(int id);
    List<Car> GetMainScreenCars();
    List<Car> GetPopularScreen1Cars();
    List<Car> GetPopularScreen2Cars();
}
