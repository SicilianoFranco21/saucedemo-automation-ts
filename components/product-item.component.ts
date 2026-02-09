import type { Locator } from "@playwright/test";

export class ProductItemComponent {
  private readonly root: Locator;

  constructor(root: Locator) {
    this.root = root;
  }

  get title(): Locator {
    return this.root.getByTestId("inventory-item-name");
  }

  get description(): Locator {
    return this.root.getByTestId("inventory-item-desc");
  }

  get price(): Locator {
    return this.root.getByTestId("inventory_item_price");
  }

  get addToCartButton(): Locator {
    return this.root.locator("button", { hasText: "Add to cart" });
  }

  async clickAddToCart(): Promise<void> {
    await this.addToCartButton.click();
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
