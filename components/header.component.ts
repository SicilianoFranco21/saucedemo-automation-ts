import type { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  readonly root: Locator;
  readonly headerTitle: Locator;
  readonly cartLink: Locator;
  readonly cartCountBadge: Locator;
  readonly menuButton: Locator;

  constructor(page: Page) {
    this.root = page.getByTestId('primary-header');
    this.headerTitle = this.root.getByText('Swag Labs');
    this.cartLink = this.root.getByTestId('shopping-cart-link');
    this.menuButton = this.root.getByRole('button', { name: 'Open Menu' });
    this.cartCountBadge = this.root.getByTestId('shopping-cart-badge');
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async cartItemsCount(): Promise<number> {
    if ((await this.cartCountBadge.count()) === 0) {
      return 0;
    }
    const text: string | null = await this.cartCountBadge.textContent();
    return Number(text);
  }
}
