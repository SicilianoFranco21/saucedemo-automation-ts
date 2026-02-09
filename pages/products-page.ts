import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page.js";
import { HeaderComponent } from "../components/header.component.js";
import { SideMenuComponent } from "../components/side-menu.component.js";
import { ProductsSortComponent } from "../components/products-sort.component.js";

export class ProductsPage extends BasePage {
    readonly header: HeaderComponent;
    readonly sideMenu: SideMenuComponent;
    readonly productsSort: ProductsSortComponent;
    readonly inventoryTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
        this.sideMenu = new SideMenuComponent(page);
        this.productsSort = new ProductsSortComponent(page);
        this.inventoryTitle = page.getByTestId("title");
    } 
}