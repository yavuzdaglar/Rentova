using AutoMapper;
using Rentova.Application.Dtos.FuelTypeDtos;
using Rentova.Application.Interfaces;
using Rentova.Domain.Interfaces;
using Rentova.Entities;

namespace Rentova.Application.Services;

// Yakıt Türü Servis
public class FuelTypeService : IFuelTypeService
{
    private readonly IFuelTypeRepository _fuelTypeRepository;
    private readonly IMapper _mapper;

    public FuelTypeService(IFuelTypeRepository fuelTypeRepository, IMapper mapper)
    {
        _fuelTypeRepository = fuelTypeRepository;
        _mapper = mapper;
    }

    public List<FuelTypeGetAllDto> GetAll()
    {
        var fuelTypes = _fuelTypeRepository.GetAll();
        return _mapper.Map<List<FuelTypeGetAllDto>>(fuelTypes);
    }

    public FuelTypeGetDto? GetById(int id)
    {
        var fuelType = _fuelTypeRepository.GetById(id);
        if (fuelType == null) return null;
        return _mapper.Map<FuelTypeGetDto>(fuelType);
    }

    public void Add(FuelTypeAddDto fuelTypeAddDto)
    {
        var fuelType = _mapper.Map<FuelType>(fuelTypeAddDto);
        _fuelTypeRepository.Add(fuelType);
    }

    public void Update(FuelTypeUpdateDto fuelTypeUpdateDto)
    {
        var fuelType = _mapper.Map<FuelType>(fuelTypeUpdateDto);
        _fuelTypeRepository.Update(fuelType);
    }

    public void Delete(int id)
    {
        _fuelTypeRepository.Delete(id);
    }
}
