using AutoMapper;
using Rentova.Application.Dtos.CarDtos;
using Rentova.Application.Interfaces;
using Rentova.Domain.Interfaces;
using Rentova.Entities;

namespace Rentova.Application.Services;

// Araç Servis
public class CarService : ICarService
{
    private readonly ICarRepository _carRepository;
    private readonly IMapper _mapper;

    public CarService(ICarRepository carRepository, IMapper mapper)
    {
        _carRepository = carRepository;
        _mapper = mapper;
    }

    public List<CarGetAllDto> GetAll()
    {
        var cars = _carRepository.GetAll();
        return _mapper.Map<List<CarGetAllDto>>(cars);
    }

    public CarGetDto? GetById(int id)
    {
        var car = _carRepository.GetById(id);
        if (car == null) return null;
        return _mapper.Map<CarGetDto>(car);
    }

    public void Add(CarAddDto carAddDto)
    {
        var car = _mapper.Map<Car>(carAddDto);
        _carRepository.Add(car);
    }

    public void Update(CarUpdateDto carUpdateDto)
    {
        var car = _mapper.Map<Car>(carUpdateDto);
        _carRepository.Update(car);
    }

    public void Delete(int id)
    {
        _carRepository.Delete(id);
    }

    public List<CarMainScreenDto> GetMainScreen()
    {
        var cars = _carRepository.GetMainScreenCars();
        return _mapper.Map<List<CarMainScreenDto>>(cars);
    }

    public List<CarPopularScreen1Dto> GetPopularScreen1()
    {
        var cars = _carRepository.GetPopularScreen1Cars();
        return _mapper.Map<List<CarPopularScreen1Dto>>(cars);
    }

    public List<CarPopularScreen2Dto> GetPopularScreen2()
    {
        var cars = _carRepository.GetPopularScreen2Cars();
        return _mapper.Map<List<CarPopularScreen2Dto>>(cars);
    }
}
