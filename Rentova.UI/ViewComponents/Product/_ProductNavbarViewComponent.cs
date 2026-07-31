using Microsoft.AspNetCore.Mvc;

namespace Rentova.UI.ViewComponents.Product
{
    public class _ProductNavbarViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
