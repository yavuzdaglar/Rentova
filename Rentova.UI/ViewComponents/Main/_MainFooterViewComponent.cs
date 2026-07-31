using Microsoft.AspNetCore.Mvc;

namespace Rentova.UI.ViewComponents.Main;

public class _MainFooterViewComponent : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}
