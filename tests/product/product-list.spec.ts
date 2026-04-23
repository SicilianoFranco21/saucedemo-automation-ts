import { test, expect } from '../../fixtures/fixtures.js';
import productsData from '../../data/products.json' with { type: 'json' };

const PRODUCT_NAMES = Object.values(productsData.products).map(p => p.name);

test.describe('Products', () => {
  test.describe('Add to Cart', () => {
    for (const name of PRODUCT_NAMES) {
      test(
        `should add "${name}" to cart and update badge`,
        { tag: ['@smoke', '@regression'] },
        async ({ productListPage }) => {
          const product = productListPage.productList.getProductByName(name);
          await product.addToCart();
          await expect(productListPage.header.cartItemsCount()).resolves.toBe(1);
          await expect(product.removeButton).toBeEnabled();
        }
      );
    }
  });

  test.describe('Remove from Cart', () => {
    test(
      'should remove all products from cart and update badge count',
      { tag: '@regression' },
      async ({ productListPage }) => {
        for (const name of PRODUCT_NAMES) {
          await productListPage.productList.getProductByName(name).addToCart();
        }

        await expect(productListPage.header.cartItemsCount()).resolves.toBe(PRODUCT_NAMES.length);

        let expectedCount = PRODUCT_NAMES.length;

        for (const name of PRODUCT_NAMES) {
          const product = productListPage.productList.getProductByName(name);
          await product.removeFromCart();
          expectedCount -= 1;
          await expect(productListPage.header.cartItemsCount()).resolves.toBe(expectedCount);
          await expect(product.addToCartButton).toBeEnabled();
        }
      }
    );
  });
});
