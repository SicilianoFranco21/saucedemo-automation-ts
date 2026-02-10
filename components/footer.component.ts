import type { Page, Locator } from "@playwright/test";

export class Footer {
  readonly twitterIcon: Locator;
  readonly facebookIcon: Locator;
  readonly linkedinIcon: Locator;
  readonly footerCopy: Locator;

  constructor(page: Page) {
    this.twitterIcon = page.getByTestId("social-twitter");
    this.facebookIcon = page.getByTestId("social-facebook");
    this.linkedinIcon = page.getByTestId("social-linkedin");
    this.footerCopy = page.getByTestId("footer-copy");
  }

  async clickTwitterIcon(): Promise<void> {
    await this.twitterIcon.click();
  }

  async clickFacebookIcon(): Promise<void> {
    await this.facebookIcon.click();
  }

  async clickLinkedinIcon(): Promise<void> {
    await this.linkedinIcon.click();
  }

  async getFooterCopyText(): Promise<string | null> {
    return await this.footerCopy.textContent();
  }
}
