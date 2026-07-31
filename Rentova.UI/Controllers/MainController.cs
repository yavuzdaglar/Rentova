using Microsoft.AspNetCore.Mvc;

namespace Rentova.UI.Controllers;

public class MainController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
