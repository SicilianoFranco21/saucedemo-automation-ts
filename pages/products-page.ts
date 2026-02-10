import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page.js";
import { ProductPage } from "./product-page.js";
import { HeaderComponent } from "../components/header.component.js";
import { SideMenuComponent } from "../components/side-menu.component.js";
import { ProductsSortComponent } from "../components/products-sort.component.js";
import { ProductItemComponent } from "../components/product-item.component.js";
import { FooterComponent } from "../components/footer.component.js";

export class ProductsPage extends BasePage {
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;
  readonly sideMenu: SideMenuComponent;
  readonly productsSort: ProductsSortComponent;
  readonly products: Locator;
  readonly inventoryTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.sideMenu = new SideMenuComponent(page);
    this.productsSort = new ProductsSortComponent(page);
    this.products = page.getByTestId("inventory-item");
    this.inventoryTitle = page.getByTestId("title");
  }

  getProductByName(productName: string): ProductItemComponent {
    const productRoot: Locator = this.products.filter({
      has: this.page
        .getByTestId("inventory-item-name")
        .filter({ hasText: productName }),
    });
    return new ProductItemComponent(productRoot);
  }

  async getAllProducts(): Promise<ProductItemComponent[]> {
    const count: number = await this.products.count();
    const items: ProductItemComponent[] = [];
    for (let i = 0; i < count; i++) {
      items.push(new ProductItemComponent(this.products.nth(i)));
    }
    return items;
  }

  async openProductByName(productName: string): Promise<ProductPage> {
    const product = this.getProductByName(productName);
    await product.title.click();
    return new ProductPage(this.page);
  }
}
