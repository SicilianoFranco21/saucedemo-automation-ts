import { test as base, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page.js';
import { ProductListPage } from '../pages/product-list-page.js';
import { CartPage } from '../pages/cart-page.js';
import { CheckoutStepOnePage } from '../pages/checkout-step-one-page.js';
import users from '../data/users.json' with { type: 'json' };

type MyFixtures = {
  loginPage: LoginPage;
  authenticatedPage: Page;
  productListPage: ProductListPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
};

export const test = base.extend<MyFixtures>({
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

  productListPage: async ({ authenticatedPage }, use) => {
    const productListPage = new ProductListPage(authenticatedPage);
    await productListPage.navigate();
    await use(productListPage);
  },

  cartPage: async ({ authenticatedPage }, use) => {
    const cartPage = new CartPage(authenticatedPage);
    await cartPage.navigate();
    await use(cartPage);
  },

  checkoutStepOnePage: async ({ authenticatedPage }, use) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(authenticatedPage);
    await checkoutStepOnePage.navigate();
    await use(checkoutStepOnePage);
  },
});

export { expect } from '@playwright/test';
