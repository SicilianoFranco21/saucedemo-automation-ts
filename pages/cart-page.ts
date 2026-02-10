import { BasePage } from "./base-page.js";
import type { Page, Locator } from "@playwright/test";

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
}
