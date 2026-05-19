import { test as base, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page.js';
import { InventoryPage } from '../pages/inventory-page.js';
import { CartPage } from '../pages/cart-page.js';
import { CheckoutStepOnePage } from '../pages/checkout-step-one-page.js';
import { CheckoutStepTwoPage } from '../pages/checkout-step-two-page.js';
import { CheckoutCompletePage } from '../pages/checkout-complete-page.js';
import { ProductPage } from '../pages/product-page.js';

type SauceDemoFixtures = {
  loginPage: LoginPage;
  authenticatedPage: Page;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
  productPage: ProductPage;
};

export const test = base.extend<SauceDemoFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await use(loginPage);
  },

  authenticatedPage: async ({ page }, use) => {
    await page.goto('/inventory.html');
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

  checkoutStepTwoPage: async ({ authenticatedPage }, use) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(authenticatedPage);
    await use(checkoutStepTwoPage);
  },

    checkoutCompletePage: async ({ authenticatedPage }, use) => {
    const checkoutCompletePage = new CheckoutCompletePage(authenticatedPage);
    await use(checkoutCompletePage);
  },

  productPage: async ({ authenticatedPage }, use) => {
    const productPage = new ProductPage(authenticatedPage);
    await use(productPage);
  },
});

export { expect } from '@playwright/test';
