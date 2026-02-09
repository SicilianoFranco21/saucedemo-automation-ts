import type { Page, Locator } from "@playwright/test";

export class SideMenuComponent {
  readonly allItemsOption: Locator;
  readonly aboutOption: Locator;
  readonly logOutOption: Locator;
  readonly closeMenuButton: Locator;

  constructor(page: Page) {
    this.allItemsOption = page.getByTestId("inventory-sidebar-link");
    this.aboutOption = page.getByTestId("about-sidebar-link");
    this.logOutOption = page.getByTestId("logout-sidebar-link");
    this.closeMenuButton = page.getByRole("button", { name: "Close Menu" });
  }

  async clickAllItemsOption(): Promise<void> {
    await this.allItemsOption.click();
  }

  async clickAboutOption(): Promise<void> {
    await this.aboutOption.click();
  }

  async clickLogoutOption(): Promise<void> {
    await this.logOutOption.click();
  }

  async clickCloseMenuOption(): Promise<void> {
    await this.closeMenuButton.click();
  }
}
