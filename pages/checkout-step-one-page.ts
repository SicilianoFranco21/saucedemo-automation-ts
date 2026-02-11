import { FooterComponent } from "../components/footer.component.js";
import { HeaderComponent } from "../components/header.component.js";
import { SideMenuComponent } from "../components/side-menu.component.js";
import { BasePage } from "./base-page.js";
import type { Page, Locator } from "@playwright/test";

export class CheckoutStepOnePage extends BasePage {
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;
  readonly sideMenu: SideMenuComponent;
  readonly checkoutStepOneTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.sideMenu = new SideMenuComponent(page);
    this.checkoutStepOneTitle = page.getByTestId("title");
    this.firstNameInput = page.getByTestId("firstName");
    this.lastNameInput = page.getByTestId("lastName");
    this.postalCodeInput = page.getByTestId("postalCode");
    this.cancelButton = page.getByTestId("cancel");
    this.continueButton = page.getByTestId("continue");
  }

  async fillCheckoutForm(
    firstName?: string,
    lastName?: string,
    postalCode?: string,
  ): Promise<void> {
    if (firstName !== undefined) {
      await this.firstNameInput.fill(firstName);
    }
    if (lastName !== undefined) {
      await this.lastNameInput.fill(lastName);
    }
    if (postalCode !== undefined) {
      await this.postalCodeInput.fill(postalCode);
    }
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }
}
