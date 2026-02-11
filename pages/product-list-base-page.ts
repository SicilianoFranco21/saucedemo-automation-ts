import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page.js";
import { HeaderComponent } from "../components/header.component.js";
import { FooterComponent } from "../components/footer.component.js";
import { SideMenuComponent } from "../components/side-menu.component.js";
import { ProductItemComponent } from "../components/product-item.component.js";
import { ProductPage } from "./product-page.js";

export abstract class ProductListBasePage extends BasePage {
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;
  readonly sideMenu: SideMenuComponent;
  protected readonly products: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.sideMenu = new SideMenuComponent(page);
    this.products = page.getByTestId("inventory-item");
  }

  protected getProductRootByName(name: string): Locator {
    return this.products.filter({
      has: this.page
        .getByTestId("inventory-item-name")
        .filter({ hasText: name }),
    });
  }

  getProductByName(name: string): ProductItemComponent {
    const root = this.getProductRootByName(name);
    return new ProductItemComponent(root);
  }

  protected getAllProductRoots(): Locator {
    return this.products;
  }

  protected async openProductByName(name: string): Promise<void> {
    await this.getProductRootByName(name)
      .getByTestId("inventory-item-name")
      .click();
  }

  async openProduct(name: string): Promise<ProductPage> {
    await this.openProductByName(name);
    return new ProductPage(this.page);
  }
}
