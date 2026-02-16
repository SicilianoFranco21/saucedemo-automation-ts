import { test, expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
import { LoginPage } from "../pages/login-page.js";

test.describe("Login Test Suite", () => {
  test("", async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const credentials = {
      username: "standard_user",
      password: "secret_sauce",
    };

    // Act
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);

    // Assert
    await expect(page).toHaveURL(/inventory\.html$/);
  });
});
