import type { Page, Locator } from '@playwright/test';

export class ProductsSortComponent {
  readonly root: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.root = page.locator('.right_component');
    this.sortDropdown = this.root.getByTestId('product-sort-container');
  }

  async sortByPriceLowToHigh(): Promise<void> {
    await this.sortDropdown.selectOption('lohi');
  }

  async sortByPriceHighToLow(): Promise<void> {
    await this.sortDropdown.selectOption('hilo');
  }

  async sortByNameAZ(): Promise<void> {
    await this.sortDropdown.selectOption('az');
  }

  async sortByNameZA(): Promise<void> {
    await this.sortDropdown.selectOption('za');
  }
}
