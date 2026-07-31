using Microsoft.AspNetCore.Mvc;

namespace Rentova.UI.ViewComponents.Main;

public class _MainContactViewComponent : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}
