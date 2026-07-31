// Marka Hepsini Listeleme
namespace Rentova.Application.Dtos.BrandDtos;

public class BrandGetAllDto
{
    public int BrandId { get; set; }
    public string BrandName { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
}
