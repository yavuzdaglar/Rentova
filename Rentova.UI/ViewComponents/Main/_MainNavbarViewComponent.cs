using Microsoft.AspNetCore.Mvc;

namespace Rentova.UI.ViewComponents.Main;

public class _MainNavbarViewComponent : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}
