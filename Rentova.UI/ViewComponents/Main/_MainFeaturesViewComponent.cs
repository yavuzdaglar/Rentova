using Microsoft.AspNetCore.Mvc;

namespace Rentova.UI.ViewComponents.Main;

public class _MainFeaturesViewComponent : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}
