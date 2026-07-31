using Microsoft.AspNetCore.Mvc;

namespace Rentova.UI.ViewComponents.AccountMenu
{
    public class _AccountMenuViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
