using Microsoft.AspNetCore.Mvc;
using Rentova.UI.Models.AccountMenu;

namespace Rentova.UI.ViewComponents.AccountMenu
{
    public class _AccountMenuSettingsViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke(AccountMenuPageViewModel model)
        {
            return View(model);
        }
    }
}
