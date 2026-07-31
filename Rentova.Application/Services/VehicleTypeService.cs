using AutoMapper;
using Rentova.Application.Dtos.VehicleTypeDtos;
using Rentova.Application.Interfaces;
using Rentova.Domain.Interfaces;
using Rentova.Entities;

namespace Rentova.Application.Services;

// Araç Tipi Servis
public class VehicleTypeService : IVehicleTypeService
{
    private readonly IVehicleTypeRepository _vehicleTypeRepository;
    private readonly IMapper _mapper;

    public VehicleTypeService(IVehicleTypeRepository vehicleTypeRepository, IMapper mapper)
    {
        _vehicleTypeRepository = vehicleTypeRepository;
        _mapper = mapper;
    }

    public List<VehicleTypeGetAllDto> GetAll()
    {
        var vehicleTypes = _vehicleTypeRepository.GetAll();
        return _mapper.Map<List<VehicleTypeGetAllDto>>(vehicleTypes);
    }

    public VehicleTypeGetDto? GetById(int id)
    {
        var vehicleType = _vehicleTypeRepository.GetById(id);
        if (vehicleType == null) return null;
        return _mapper.Map<VehicleTypeGetDto>(vehicleType);
    }

    public void Add(VehicleTypeAddDto vehicleTypeAddDto)
    {
        var vehicleType = _mapper.Map<VehicleType>(vehicleTypeAddDto);
        _vehicleTypeRepository.Add(vehicleType);
    }

    public void Update(VehicleTypeUpdateDto vehicleTypeUpdateDto)
    {
        var vehicleType = _mapper.Map<VehicleType>(vehicleTypeUpdateDto);
        _vehicleTypeRepository.Update(vehicleType);
    }

    public void Delete(int id)
    {
        _vehicleTypeRepository.Delete(id);
    }
}
