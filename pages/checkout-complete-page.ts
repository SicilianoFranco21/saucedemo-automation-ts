import { FooterComponent } from "../components/footer.component.js";
import { HeaderComponent } from "../components/header.component.js";
import { SideMenuComponent } from "../components/side-menu.component.js";
import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page.js";

export class CheckoutCompletePage extends BasePage {
  readonly url: string = "/checkout-complete.html";
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;
  readonly sideMenu: SideMenuComponent;
  readonly checkoutStepTwoTitle: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.sideMenu = new SideMenuComponent(page);
    this.checkoutStepTwoTitle = page.getByTestId("title");
    this.backHomeButton = page.getByTestId("finish");
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url);
  }

  async backHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
