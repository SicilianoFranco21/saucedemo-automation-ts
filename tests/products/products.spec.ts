import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login-page.js";
import { ProductsPage } from "../../pages/products-page.js";
import type { ProductItemComponent } from "../../components/product-item.component.js";

test.describe("Products Feature", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    const validUser = {
      username: "standard_user",
      password: "secret_sauce",
    };

    await loginPage.navigate();
    await loginPage.login(validUser.username, validUser.password);
  });

  test.describe("Add to Cart Functionality", () => {
    const productNames: string[] = [
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Bolt T-Shirt",
      "Sauce Labs Fleece Jacket",
      "Sauce Labs Onesie",
      "Test.allTheThings() T-Shirt (Red)",
    ];

    for (const name of productNames) {
      test(`Verify that a logged-in user can add product "${name}" to the cart and the cart badge is updated accordingly`, async () => {
        const product: ProductItemComponent =
          productsPage.getProductByName(name);
        await product.addToCart();
        await expect(productsPage.header.cartItemsCount()).resolves.toBe(1);
        await expect(product.removeButton).toBeEnabled();
      });
    }
  });
});
