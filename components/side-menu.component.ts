import type { Page, Locator } from "@playwright/test";

export class SideMenuComponent {
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.allItemsLink = page.getByTestId("inventory-sidebar-link");
    this.aboutLink = page.getByTestId("about-sidebar-link");
    this.logoutLink = page.getByTestId("logout-sidebar-link");
    this.closeButton = page.getByRole("button", { name: "Close Menu" });
  }

  async goToAllItems(): Promise<void> {
    await this.allItemsLink.click();
  }

  async goToAbout(): Promise<void> {
    await this.aboutLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }
}
