import type { Locator } from '@playwright/test';

export class SecondaryHeaderComponent {
  readonly title: Locator;

  constructor(root: Locator) {
    this.title = root.getByTestId('title');
  }

  async getTitle(): Promise<string> {
    return await this.title.innerText();
  }
}
