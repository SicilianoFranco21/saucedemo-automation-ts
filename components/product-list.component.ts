import type { Locator } from '@playwright/test';
import { ProductItemComponent } from './product-item.component.js';

export class ProductListComponent {
  protected readonly products: Locator;
  protected readonly root: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.products = root.getByTestId('inventory-item');
  }

  getProductByName(name: string): ProductItemComponent {
    const productLocator: Locator = this.findProductLocatorByName(name);
    return new ProductItemComponent(productLocator);
  }

  findProductLocatorByName(name: string): Locator {
    const productLocator: Locator = this.products.filter({
      has: this.root.getByTestId('inventory-item-name').filter({ hasText: name }),
    });
    return productLocator;
  }

  async getAllProducts(): Promise<ProductItemComponent[]> {
    const count: number = await this.products.count();
    const productComponents: ProductItemComponent[] = [];
    for (let i = 0; i < count; i++) {
      const productLocator: Locator = this.products.nth(i);
      productComponents.push(new ProductItemComponent(productLocator));
    }
    return productComponents;
  }

  async openProductByName(name: string): Promise<void> {
    await this.getProductByName(name).open();
  }
}
