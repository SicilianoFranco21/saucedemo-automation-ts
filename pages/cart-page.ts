import type { Page, Locator } from "@playwright/test";
import { ProductListBasePage } from "./product-list-base-page.js";
import { ProductItemComponent } from "../components/product-item.component.js";
import { ProductPage } from "./product-page.js";

export class CartPage extends ProductListBasePage {
  readonly cartTitle: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTitle = page.getByTestId("title");
    this.continueShoppingButton = page.getByTestId("continue-shopping");
    this.checkoutButton = page.getByTestId("checkout");
  }

  getProductByName(productName: string): ProductItemComponent {
    const root = this.getProductRootByName(productName);
    return new ProductItemComponent(root);
  }

  async openProduct(productName: string): Promise<ProductPage> {
    await super.openProductByName(productName);
    return new ProductPage(this.page);
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async ContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
