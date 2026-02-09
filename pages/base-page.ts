import type { Page } from "@playwright/test";

export class BasePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async reloadPage() {
    await this.page.reload();
  }

  getCurrentUrl(): string {
    return this.page.url();
  }
}
