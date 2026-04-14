import type { Locator } from '@playwright/test';

export class HeaderComponent {
  readonly headerTitle: Locator;
  readonly cartLink: Locator;
  readonly cartCountBadge: Locator;
  readonly menuButton: Locator;

  constructor(root: Locator) {
    this.headerTitle = root.getByText('Swag Labs');
    this.cartLink = root.getByTestId('shopping-cart-link');
    this.menuButton = root.getByRole('button', { name: 'Open Menu' });
    this.cartCountBadge = root.getByTestId('shopping-cart-badge');
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
