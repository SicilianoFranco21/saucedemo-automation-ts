import { test, expect } from '../../fixtures/fixtures.js';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Login', () => {
  test.describe('Form elements', () => {
    test('should accept input in the username field', async ({ loginPage }) => {
      await loginPage.fillUsername(users.standard.username);
      await expect(loginPage.usernameInput).toHaveValue(users.standard.username);
    });

    test('should accept input in the password field', async ({ loginPage }) => {
      await loginPage.fillPassword(users.standard.password);
      await expect(loginPage.passwordInput).toHaveValue(users.standard.password);
    });

    test.describe('submit button', () => {
      const states = [
        ['fields are empty', '', ''],
        ['only username is filled', users.standard.username, ''],
        ['only password is filled', '', users.standard.password],
        ['both fields are filled', users.standard.username, users.standard.password],
      ];

      for (const [name, username, password] of states) {
        test(`should be enabled when ${name}`, async ({ loginPage }) => {
          if (username) await loginPage.fillUsername(username);
          if (password) await loginPage.fillPassword(password);

          await expect(loginPage.loginButton).toBeEnabled();
        });
      }
    });
  });

  test.describe('Authentication', () => {
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
        name: 'user is locked out',
        username: users.lockedOut.username,
        password: users.lockedOut.password,
        expectedError: 'Sorry, this user has been locked out',
      },
    ];

    for (const scenario of errorScenarios) {
      test(`should show an error when ${scenario.name}`, { tag: '@regression' }, async ({ loginPage }) => {
        if (scenario.username) await loginPage.fillUsername(scenario.username);
        if (scenario.password) await loginPage.fillPassword(scenario.password);

        await loginPage.submit();

        await expect(loginPage.errorMessage).toContainText(scenario.expectedError);
      });
    }

    test('should redirect to inventory with valid credentials', { tag: ['@smoke', '@regression'] }, async ({ loginPage, page }) => {
      await loginPage.login(users.standard);
      await expect(page).toHaveURL(/inventory\.html$/);
    });
  });
});
