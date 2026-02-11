import type { Page } from "@playwright/test";

export abstract class BasePage {
  protected abstract readonly url: string;
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    await this.page.goto(this.url);
  }

  async reloadPage(): Promise<void> {
    await this.page.reload();
  }

  getCurrentUrl(): string {
    return this.page.url();
  }
}
