import { test as base, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page.js';
import { InventoryPage } from '../pages/inventory-page.js';
import { CartPage } from '../pages/cart-page.js';
import { CheckoutStepOnePage } from '../pages/checkout-step-one-page.js';
import users from '../data/users.json' with { type: 'json' };

type SauceDemoFixtures = {
  loginPage: LoginPage;
  authenticatedPage: Page;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
};

export const test = base.extend<SauceDemoFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await use(loginPage);
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users.standard);
    await use(page);
  },

  inventoryPage: async ({ authenticatedPage }, use) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    await use(inventoryPage);
  },

  cartPage: async ({ authenticatedPage }, use) => {
    const cartPage = new CartPage(authenticatedPage);
    await use(cartPage);
  },

  checkoutStepOnePage: async ({ authenticatedPage }, use) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(authenticatedPage);
    await use(checkoutStepOnePage);
  },
});

export { expect } from '@playwright/test';
