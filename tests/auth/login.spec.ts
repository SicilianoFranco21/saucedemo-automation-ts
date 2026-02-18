import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login-page.js";

test.describe("Login Feature", () => {
  let loginPage: LoginPage;

  const users = {
    validUser: {
      username: "standard_user",
      password: "secret_sauce",
    },
    invalidUser: {
      username: "wrong_user",
      password: "wrong_password",
    },
    lockedOutUser: {
      username: "locked_out_user",
      password: "secret_sauce",
    },
  };

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test.describe("Login - Form UI elements", () => {
    test("Verify username field is displayed and editable", async () => {
      await loginPage.fillUsername(users.validUser.username);
      await expect(loginPage.usernameInput).toHaveValue(
        users.validUser.username,
      );
    });

    test("Verify password field is displayed and editable", async () => {
      await loginPage.fillPassword(users.validUser.password);
      await expect(loginPage.passwordInput).toHaveValue(
        users.validUser.password,
      );
    });

    test.describe("Verify submit button state validation", () => {
      const states = [
        ["both empty", "", ""],
        ["only username", users.validUser.username, ""],
        ["only password", "", users.validUser.password],
        ["both filled", users.validUser.username, users.validUser.password],
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

  test.describe("Login - Authentication", () => {
    test.describe("Login - Negative Authentication", () => {
      const errorScenarios = [
        {
          name: "username is missing",
          username: "",
          password: users.validUser.password,
          expectedError: "Username is required",
        },
        {
          name: "password is missing",
          username: users.validUser.username,
          password: "",
          expectedError: "Password is required",
        },
        {
          name: "credentials are invalid",
          username: users.invalidUser.username,
          password: users.invalidUser.password,
          expectedError: "Username and password do not match",
        },
        {
          name: "user account is locked",
          username: users.lockedOutUser.username,
          password: users.lockedOutUser.password,
          expectedError: "Sorry, this user has been locked out",
        },
      ];

      for (const scenario of errorScenarios) {
        test(`Shows error when ${scenario.name}`, async () => {
          if (scenario.username)
            await loginPage.fillUsername(scenario.username);

          if (scenario.password)
            await loginPage.fillPassword(scenario.password);

          await loginPage.submit();

          await expect(loginPage.errorMessage).toContainText(
            scenario.expectedError,
          );
        });
      }
    });

    test("Verify user is redirected to home page after successful login", async ({
      page,
    }) => {
      await loginPage.login(users.validUser.username, users.validUser.password);
      await expect(page).toHaveURL(/inventory\.html$/);
    });
  });
});
