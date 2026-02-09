import { test, expect } from '@playwright/test';

test.describe('Login page', () => {

  test('displays the correct application title', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto('https://www.saucedemo.com/');
    });

    await test.step('Verify page title', async () => {
      await expect(page).toHaveTitle(/Swag/);
    });
  });

  test('displays an error message when login is attempted without credentials', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto('https://www.saucedemo.com/');
    });

    await test.step('Attempt login without credentials', async () => {
      await page.getByTestId('login-button').click();
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(page.getByTestId('error')).toBeVisible();
    });
  });

  test('displays correct placeholders in login inputs', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto('https://www.saucedemo.com/');
    });

    await test.step('Verify username placeholder', async () => {
      await expect(page.getByTestId('username'))
        .toHaveAttribute('placeholder', 'Username');
    });

    await test.step('Verify password placeholder', async () => {
      await expect(page.getByTestId('password'))
        .toHaveAttribute('placeholder', 'Password');
    });
  });

});


test.describe('Inventory page', () => {

  test('allows user to log in with valid credentials', async ({ page }) => {
    await test.step('Login with valid credentials', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByTestId('username').fill('standard_user');
      await page.getByTestId('password').fill('secret_sauce');
      await page.getByTestId('login-button').click();
    });

    await test.step('Verify user is redirected to inventory page', async () => {
      await expect(page).toHaveURL(/inventory\.html$/);
    });
  });

  test('displays the correct number of products', async ({ page }) => {
    await test.step('Login to the application', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByTestId('username').fill('standard_user');
      await page.getByTestId('password').fill('secret_sauce');
      await page.getByTestId('login-button').click();
    });

    await test.step('Verify number of products displayed', async () => {
      await expect(page.getByTestId('inventory-item')).toHaveCount(6);
    });
  });

});


test.describe('Side menu navigation', () => {

  test('redirects to All Items from side menu', async ({ page }) => {
    await test.step('Login and open side menu', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByTestId('username').fill('standard_user');
      await page.getByTestId('password').fill('secret_sauce');
      await page.getByTestId('login-button').click();
      await page.getByText('Open Menu').click();
    });

    await test.step('Select All Items option', async () => {
      await page.getByTestId('inventory-sidebar-link').click();
    });

    await test.step('Verify redirection to inventory page', async () => {
      await expect(page).toHaveURL(/inventory\.html$/);
    });
  });

  test('side menu is hidden after clicking close button', async ({ page }) => {
    const sideMenu = page.locator('.bm-menu-wrap');

    await test.step('Login and open side menu', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByTestId('username').fill('standard_user');
      await page.getByTestId('password').fill('secret_sauce');
      await page.getByTestId('login-button').click();
      await page.getByText('Open Menu').click();
    });

    await test.step('Close side menu', async () => {
      await page.getByRole('button', { name: 'Close Menu' }).click();
    });

    await test.step('Verify side menu is hidden', async () => {
      await expect(sideMenu).not.toBeVisible();
    });
  });

});

