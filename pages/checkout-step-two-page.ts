import { FooterComponent } from "../components/footer.component.js";
import { HeaderComponent } from "../components/header.component.js";
import { SideMenuComponent } from "../components/side-menu.component.js";
import type { Page, Locator } from "@playwright/test";
import { ProductListBasePage } from "./product-list-base-page.js";

export class CheckoutStepTwoPage extends ProductListBasePage {
  readonly url: string = "/checkout-step-two.html";
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;
  readonly sideMenu: SideMenuComponent;
  readonly checkoutStepTwoTitle: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.sideMenu = new SideMenuComponent(page);
    this.checkoutStepTwoTitle = page.getByTestId("title");
    this.cancelButton = page.getByTestId("cancel");
    this.finishButton = page.getByTestId("finish");
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url);
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
