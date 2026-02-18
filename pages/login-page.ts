import { BasePage } from "./base-page.js";
import type { Page, Locator } from "@playwright/test";

export class LoginPage extends BasePage {
  readonly url: string = "/";
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
    this.errorMessage = page.getByTestId("error");
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url);
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async clearUsername(): Promise<void> {
    await this.usernameInput.clear();
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clearPassword(): Promise<void> {
    await this.passwordInput.clear();
  }

  async submit(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }

  async loginErrorMessage(): Promise<void> {}
}
