import type { Page, Locator } from "@playwright/test";
import { ProductListBasePage } from "./product-list-base-page.js";

export class CartPage extends ProductListBasePage {
  readonly url: string = "/cart.html";
  readonly cartTitle: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTitle = page.getByTestId("title");
    this.continueShoppingButton = page.getByTestId("continue-shopping");
    this.checkoutButton = page.getByTestId("checkout");
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
