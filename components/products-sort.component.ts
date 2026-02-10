import type { Page, Locator } from "@playwright/test";

export class ProductsSortComponent {
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.sortDropdown = page.getByTestId("product-sort-container");
  }

  async sortByPriceLowToHigh(): Promise<void> {
    await this.sortDropdown.selectOption("lohi");
  }

  async sortByPriceHighToLow(): Promise<void> {
    await this.sortDropdown.selectOption("hilo");
  }

  async sortByNameAZ(): Promise<void> {
    await this.sortDropdown.selectOption("az");
  }

  async sortByNameZA(): Promise<void> {
    await this.sortDropdown.selectOption("za");
  }
}
