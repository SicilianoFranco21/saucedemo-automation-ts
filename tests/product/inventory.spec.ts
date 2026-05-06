import { test, expect } from '../../fixtures/fixtures.js';
import productsData from '../../data/products.json' with { type: 'json' };
import type { ProductItemComponent } from '../../pages/components/product-item.component.js';

const PRODUCT_NAMES = Object.values(productsData.products).map((p) => p.name);

test.describe('Products', () => {
  test.describe('Add to Cart', () => {
    // GIVEN: inventoryPage fxiture navigates to the inventory page before each test

    for (const name of PRODUCT_NAMES) {
      test(`should add "${name}" to cart and update badge`, async ({ inventoryPage }) => {
        const product: ProductItemComponent = inventoryPage.productList.getProductByName(name);
        
        // WHEN
        await product.addToCart();

        // THEN
        await expect(inventoryPage.header.cartItemsCount()).resolves.toBe('1');
        await expect(product.removeButton).toBeEnabled();
      });
    }
  });

  test.describe('Remove from Cart', () => {
    // GIVEN: inventoryPage fixture navigates to the inventory page before each test 

    for (const name of PRODUCT_NAMES) {
      test(`should remove "${name}" from cart and update badge`, async ({ inventoryPage }) => {
        const product: ProductItemComponent = inventoryPage.productList.getProductByName(name);

        // WHEN
        await product.addToCart();
        await product.removeFromCart();

        // THEN
        await expect(inventoryPage.header.cartCountBadge).not.toBeVisible();
        await expect(product.addToCartButton).toBeEnabled();
      });
    }
  });
});
