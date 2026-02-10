import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page.js";
import { HeaderComponent } from "../components/header.component.js";
import { ProductItemComponent } from "../components/product-item.component.js";

export class ProductPage extends BasePage {
  readonly header: HeaderComponent;
  readonly productItem: ProductItemComponent;
  readonly backToProductButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    const productRoot = page.getByTestId("inventory-item");
    this.productItem = new ProductItemComponent(productRoot);
    this.backToProductButton = page.getByTestId("back-to-products");
  }

  async backToProduct(): Promise<void> {
    await this.backToProductButton.click();
  }
}
