import type { Locator } from '@playwright/test';

export class FooterComponent {
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;
  readonly footerText: Locator;

  constructor(root: Locator) {
    this.twitterLink = root.getByTestId('social-twitter');
    this.facebookLink = root.getByTestId('social-facebook');
    this.linkedinLink = root.getByTestId('social-linkedin');
    this.footerText = root.getByTestId('footer-copy');
  }

  async goToTwitter(): Promise<void> {
    await this.twitterLink.click();
  }

  async goToFacebook(): Promise<void> {
    await this.facebookLink.click();
  }

  async goToLinkedin(): Promise<void> {
    await this.linkedinLink.click();
  }

  async footerCopy(): Promise<string | null> {
    return await this.footerText.textContent();
  }
}
