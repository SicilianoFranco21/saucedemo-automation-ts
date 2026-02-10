import { BasePage } from "./base-page.js";
import type { Page, Locator } from "@playwright/test";

export class LoginPage extends BasePage {
  readonly usernameLabel: Locator;
  readonly passwordLabel: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameLabel = page.getByTestId("username");
    this.passwordLabel = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
  }

  async fillUsernameLabel(username: string): Promise<void> {
    await this.usernameLabel.fill(username);
  }

  async fillPasswordLabel(password: string): Promise<void> {
    await this.passwordLabel.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillUsernameLabel(username);
    await this.fillPasswordLabel(password);
    await this.clickLoginButton();
  }
}
