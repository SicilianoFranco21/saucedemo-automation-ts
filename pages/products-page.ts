import type { Page, Locator } from "@playwright/test";
import { ProductListBasePage } from "./product-list-base-page.js";
import { ProductsSortComponent } from "../components/products-sort.component.js";
import { ProductItemComponent } from "../components/product-item.component.js";
import { ProductPage } from "./product-page.js";

export class ProductsPage extends ProductListBasePage {
  readonly productsSort: ProductsSortComponent;
  readonly inventoryTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.productsSort = new ProductsSortComponent(page);
    this.inventoryTitle = page.getByTestId("title");
  }

  getProductByName(productName: string): ProductItemComponent {
    const root = this.getProductRootByName(productName);
    return new ProductItemComponent(root);
  }

  async openProduct(productName: string): Promise<ProductPage> {
    await super.openProductByName(productName);
    return new ProductPage(this.page);
  }
}
