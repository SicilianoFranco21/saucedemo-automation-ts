import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page.js";
import { HeaderComponent } from "../components/header.component.js";

export class ProductPage extends BasePage {
  readonly header: HeaderComponent;
  readonly title: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly backToProductsButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.title = page.getByTestId("inventory-item-name");
    this.description = page.getByTestId("inventory-item-desc");
    this.price = page.getByTestId("inventory-item-price");
    this.addToCartButton = page.getByTestId("add-to-cart");
    this.backToProductsButton = page.getByTestId("back-to-products");
    this.removeButton = page.getByTestId("remove");
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }

  async clickRemoveButton(): Promise<void> {
    await this.removeButton.click();
  }

  async getTitleText(): Promise<string | null> {
    return await this.title.textContent();
  }

  async getDescriptionText(): Promise<string | null> {
    return await this.description.textContent();
  }

  async getPriceText(): Promise<string | null> {
    return await this.price.textContent();
  }
}
