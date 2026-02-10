import type { Page, Locator } from "@playwright/test";

export class FooterComponent {
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;
  readonly footerText: Locator;

  constructor(page: Page) {
    this.twitterLink = page.getByTestId("social-twitter");
    this.facebookLink = page.getByTestId("social-facebook");
    this.linkedinLink = page.getByTestId("social-linkedin");
    this.footerText = page.getByTestId("footer-copy");
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
