import type { Locator } from '@playwright/test';

export class SideMenuComponent {
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly closeButton: Locator;

  constructor(root: Locator) {
    this.allItemsLink = root.getByTestId('inventory-sidebar-link');
    this.aboutLink = root.getByTestId('about-sidebar-link');
    this.logoutLink = root.getByTestId('logout-sidebar-link');
    this.closeButton = root.getByRole('button', { name: 'Close Menu' });
  }

  async goToAllItems(): Promise<void> {
    await this.allItemsLink.click();
  }

  async goToAbout(): Promise<void> {
    await this.aboutLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }
}
