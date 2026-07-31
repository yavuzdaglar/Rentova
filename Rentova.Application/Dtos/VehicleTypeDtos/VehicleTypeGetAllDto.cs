// Araç Tipi Hepsini Listeleme
namespace Rentova.Application.Dtos.VehicleTypeDtos;

public class VehicleTypeGetAllDto
{
    public int VehicleTypeId { get; set; }
    public string VehicleTypeName { get; set; } = string.Empty;
}
