using Microsoft.AspNetCore.Mvc;

namespace Rentova.UI.ViewComponents.Login;

public class _LoginContentViewComponent : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}
