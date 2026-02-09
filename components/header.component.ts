import type { Page, Locator } from "@playwright/test";

export class Header {
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;

  constructor(page: Page) {
    this.cartIcon = page.getByTestId("shopping-cart-link");
    this.menuButton = page.getByRole("button", { name: "Open Menu" });
    this.cartBadge = page.getByTestId("shopping-cart-badge");
  }

  async openSideMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async clickCartIcon(): Promise<void> {
    await this.cartIcon.click();
  }

  async getCartItemsCount(): Promise<number> {
    if ((await this.cartBadge.count()) === 0) {
      return 0;
    }
    const text: string | null = await this.cartBadge.textContent();
    return Number(text);
  }
}
