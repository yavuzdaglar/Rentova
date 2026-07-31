using Microsoft.AspNetCore.Mvc;

namespace Rentova.UI.ViewComponents.Login;

public class _LoginFooterViewComponent : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}
