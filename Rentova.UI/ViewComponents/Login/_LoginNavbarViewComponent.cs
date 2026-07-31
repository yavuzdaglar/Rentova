using Microsoft.AspNetCore.Mvc;

namespace Rentova.UI.ViewComponents.Login;

public class _LoginNavbarViewComponent : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}
