import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page.js';
import  users from '../../data/users.json' with { type: 'json' };

test.describe('Login Feature', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test.describe('Login - Form UI elements', () => {
    test('Verify username field is displayed and editable', async () => {
      await loginPage.fillUsername(users.standard.username);
      await expect(loginPage.usernameInput).toHaveValue(users.standard.username);
    });

    test('Verify password field is displayed and editable', async () => {
      await loginPage.fillPassword(users.standard.password);
      await expect(loginPage.passwordInput).toHaveValue(users.standard.password);
    });

    test.describe('Verify submit button state validation', () => {
      const states = [
        ['both empty', '', ''],
        ['only username', users.standard.username, ''],
        ['only password', '', users.standard.password],
        ['both filled', users.standard.username, users.standard.password],
      ];

      for (const [name, username, password] of states) {
        test(`Verify submit button enabled when ${name}`, async () => {
          if (username) await loginPage.fillUsername(username);
          if (password) await loginPage.fillPassword(password);

          await expect(loginPage.loginButton).toBeEnabled();
        });
      }
    });
  });
  
  test.describe('Login - Authentication', () => {
    test.describe('Login - Negative Authentication', () => {
      const errorScenarios = [
        {
          name: 'username is missing',
          username: '',
          password: users.standard.password,
          expectedError: 'Username is required',
        },
        {
          name: 'password is missing',
          username: users.standard.username,
          password: '',
          expectedError: 'Password is required',
        },
        {
          name: 'credentials are invalid',
          username: users.invalid.username,
          password: users.invalid.password,
          expectedError: 'Username and password do not match',
        },
        {
          name: 'user account is locked',
          username: users.lockedOut.username,
          password: users.lockedOut.password,
          expectedError: 'Sorry, this user has been locked out',
        },
      ];

      for (const scenario of errorScenarios) {
        test(`Shows error when ${scenario.name}`, async () => {
          if (scenario.username) await loginPage.fillUsername(scenario.username);

          if (scenario.password) await loginPage.fillPassword(scenario.password);

          await loginPage.submit();

          await expect(loginPage.errorMessage).toContainText(scenario.expectedError);
        });
      }
    });

    test('@smoke Login - Positive Authentication', async ({ page }) => {
      await loginPage.login(users.standard);
      await expect(page).toHaveURL(/inventory\.html$/);
    });
  });
});
