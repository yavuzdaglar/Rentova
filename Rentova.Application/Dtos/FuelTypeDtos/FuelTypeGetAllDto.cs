// Yakıt Türü Hepsini Listeleme
namespace Rentova.Application.Dtos.FuelTypeDtos;

public class FuelTypeGetAllDto
{
    public int FuelTypeId { get; set; }
    public string FuelTypeName { get; set; } = string.Empty;
}
