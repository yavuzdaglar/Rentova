using Microsoft.AspNetCore.Mvc;

namespace Rentova.UI.ViewComponents.Main
{
    public class _MainCTAViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
