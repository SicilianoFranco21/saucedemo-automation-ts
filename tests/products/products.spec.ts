import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login-page.js";
import { ProductsPage } from "../../pages/products-page.js";
import type { ProductItemComponent } from "../../components/product-item.component.js";

const VALID_USER = {
  username: "standard_user",
  password: "secret_sauce",
};

const PRODUCT_NAMES: string[] = [
  "Sauce Labs Backpack",
  "Sauce Labs Bike Light",
  "Sauce Labs Bolt T-Shirt",
  "Sauce Labs Fleece Jacket",
  "Sauce Labs Onesie",
  "Test.allTheThings() T-Shirt (Red)",
];

test.describe("Products Feature", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    await loginPage.navigate();
    await loginPage.login(VALID_USER.username, VALID_USER.password);
  });

  test.describe("Add to Cart Functionality", () => {
    for (const name of PRODUCT_NAMES) {
      test(`Verify that a logged-in user can add product "${name}" to the cart and the cart badge is updated accordingly`, async () => {
        const product: ProductItemComponent =
          productsPage.getProductByName(name);
        await product.addToCart();
        await expect(productsPage.header.cartItemsCount()).resolves.toBe(1);
        await expect(product.removeButton).toBeEnabled();
      });
    }
  });

  test.describe("Remove Product Functionality", () => {
    test("Verify that a logged-in user can remove a product from the cart and that the cart badge reflects the updated item count", async () => {
      for (const name of PRODUCT_NAMES) {
        await productsPage.getProductByName(name).addToCart();
      }

      await expect(productsPage.header.cartItemsCount()).resolves.toBe(
        PRODUCT_NAMES.length,
      );

      let expectedCount = PRODUCT_NAMES.length;

      for (const name of PRODUCT_NAMES) {
        const product: ProductItemComponent =
          productsPage.getProductByName(name);

        await product.removeFromCart();
        expectedCount -= 1;

        await expect(productsPage.header.cartItemsCount()).resolves.toBe(
          expectedCount,
        );
        await expect(product.addToCartButton).toBeEnabled();
      }
    });
  });
});
