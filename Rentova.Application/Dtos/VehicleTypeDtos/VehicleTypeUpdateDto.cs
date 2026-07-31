// Araç Tipi Güncelleme
namespace Rentova.Application.Dtos.VehicleTypeDtos;

public class VehicleTypeUpdateDto
{
    public int VehicleTypeId { get; set; }
    public string VehicleTypeName { get; set; } = string.Empty;
}
