import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page.js";
import { HeaderComponent } from "../components/header.component.js";
import { FooterComponent } from "../components/footer.component.js";
import { SideMenuComponent } from "../components/side-menu.component.js";

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

  protected getAllProductRoots(): Locator {
    return this.products;
  }

  protected async openProductByName(productName: string): Promise<void> {
    const productRoot = this.getProductRootByName(productName);
    await productRoot.getByTestId("inventory-item-name").click();
  }
}
