import type { Page } from "@playwright/test";

export class BasePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async reloadPage(): Promise<void> {
    await this.page.reload();
  }

  getCurrentUrl(): string {
    return this.page.url();
  }
}
