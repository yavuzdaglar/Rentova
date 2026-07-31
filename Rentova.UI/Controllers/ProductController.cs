using Microsoft.AspNetCore.Mvc;

namespace Rentova.UI.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
