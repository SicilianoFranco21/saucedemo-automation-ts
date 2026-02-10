import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page.js";
import { HeaderComponent } from "../components/header.component.js";
import { ProductItemComponent } from "../components/product-item.component.js";
import { SideMenuComponent } from "../components/side-menu.component.js";
import { FooterComponent } from "../components/footer.component.js";

export class ProductPage extends BasePage {
  readonly header: HeaderComponent;
  readonly footer: FooterComponent
  readonly sideMenu: SideMenuComponent;
  readonly productItem: ProductItemComponent;
  readonly backToProductButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.sideMenu = new SideMenuComponent(page);
    const productRoot = page.getByTestId("inventory-item");
    this.productItem = new ProductItemComponent(productRoot);
    this.backToProductButton = page.getByTestId("back-to-products");
  }

  async backToProduct(): Promise<void> {
    await this.backToProductButton.click();
  }
}
