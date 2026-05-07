import { test, expect } from '../../fixtures/fixtures.js';
import productsData from '../../data/products.json' with { type: 'json' };
import { ProductPage } from '../../pages/product-page.js';

// Feature: Product details

const PRODUCTS = Object.values(productsData.products);

test.describe('Product details', () => {
  // Rule: Product detail page displays correct information for each product
  // Background:
  //   Given the user is on the inventory page

  // Scenario Outline: displays correct details for <product>
  for (const product of PRODUCTS) {
    test(`displays correct details for "${product.name}"`, async ({ inventoryPage }) => {
      // When the user opens the product detail page
      await inventoryPage.productList.openProductByName(product.name);
      const productPage = new ProductPage(inventoryPage.page);

      // Then the correct product detail page is displayed with the expected data
      await expect(productPage.page).toHaveURL(new RegExp(`inventory-item\\.html\\?id=${product.id}`));
      await expect(productPage.productItem.title).toHaveText(product.name);
      await expect(productPage.productItem.description).toHaveText(product.description);
      await expect(productPage.productItem.price).toHaveText(`$${product.price}`);
    });
  }
});
