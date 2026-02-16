import type { Page, Locator } from "@playwright/test";
import { ProductListBasePage } from "./product-list-base-page.js";
import { ProductsSortComponent } from "../components/products-sort.component.js";

export class ProductsPage extends ProductListBasePage {
  readonly url: string = "/inventory.html";
  readonly productsSort: ProductsSortComponent;
  readonly inventoryTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.productsSort = new ProductsSortComponent(page);
    this.inventoryTitle = page.getByTestId("title");
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url);
  }
}
