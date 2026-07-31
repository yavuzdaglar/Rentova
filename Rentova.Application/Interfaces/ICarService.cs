using Rentova.Application.Dtos.CarDtos;

namespace Rentova.Application.Interfaces;

// Araç Servis Arayüzü
public interface ICarService
{
    List<CarGetAllDto> GetAll();
    CarGetDto? GetById(int id);
    void Add(CarAddDto carAddDto);
    void Update(CarUpdateDto carUpdateDto);
    void Delete(int id);
    List<CarMainScreenDto> GetMainScreen();
    List<CarPopularScreen1Dto> GetPopularScreen1();
    List<CarPopularScreen2Dto> GetPopularScreen2();
}
