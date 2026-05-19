# Saucedemo E2E Automation

![CI Regression](https://github.com/SicilianoFranco21/saucedemo-automation-ts/actions/workflows/ci-regression.yml/badge.svg)
![Playwright](https://img.shields.io/badge/Playwright-1.58-45ba4b?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)
![Node](https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs)

End-to-end test automation suite for [saucedemo.com](https://www.saucedemo.com) built with Playwright and TypeScript, following the **Page Object Model (POM)** pattern. Covers authentication, product browsing, cart management, and the full checkout flow.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev) | Browser automation framework |
| [TypeScript](https://www.typescriptlang.org) | Type-safe test authoring |
| [GitHub Actions](https://github.com/features/actions) | CI pipeline (regression on push to main) |

---

## Prerequisites

- [Node.js](https://nodejs.org) v24 or higher
- npm v10 or higher

---

## Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/SicilianoFranco21/saucedemo-automation-ts.git
cd saucedemo-automation-ts

# 2. Install dependencies
npm ci

# 3. Install Playwright browsers
npx playwright install --with-deps
```

No environment variables are required. The suite uses `https://www.saucedemo.com` as base URL and authenticates automatically via `globalSetup` before running any test.

---

## Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests headlessly |
| `npm run test:smoke` | Run `@smoke` tagged tests only |
| `npm run test:regression` | Run `@regression` tagged tests only |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:debug` | Run tests with Playwright Inspector attached |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:report` | Open the last HTML report |

---

## Project Structure

```
saucedemo-automation-ts/
├── pages/                          # Page Object classes
│   ├── base-page.ts                # Abstract base: url, navigate(), reload()
│   ├── saucedemo-base-page.ts      # Abstract base: composes shared components
│   ├── login-page.ts
│   ├── inventory-page.ts
│   ├── product-page.ts
│   ├── cart-page.ts
│   ├── checkout-step-one-page.ts
│   ├── checkout-step-two-page.ts
│   ├── checkout-complete-page.ts
│   └── components/                 # Reusable UI components
│       ├── header.component.ts
│       ├── secondary-header.component.ts
│       ├── footer.component.ts
│       ├── side-menu.component.ts
│       ├── product-item.component.ts
│       ├── product-list.component.ts
│       └── products-sort.component.ts
├── tests/                          # Test specifications
│   ├── auth/                       # Login and logout tests
│   ├── product/                    # Inventory and product detail tests
│   ├── cart/                       # Cart management tests
│   └── checkout/                   # Checkout flow tests
├── fixtures/
│   └── fixtures.ts                 # Custom Playwright fixtures
├── helpers/                        # Shared utility functions
│   ├── inventory.helper.ts         # Bulk add/remove products in inventory
│   ├── cart.helper.ts              # Bulk remove products in cart
│   ├── calculations.helper.ts      # Price math (subtotal, tax, total)
│   └── price.parser.ts             # Parse "$9.99" strings to numbers
├── models/                         # TypeScript interfaces
│   ├── product.model.ts
│   └── user.model.ts
├── data/                           # Test data (JSON)
│   ├── products.json               # 6 products: id, name, description, price
│   ├── users.json                  # 7 test accounts (standard, locked, invalid…)
│   └── sample-checkout-data.json   # Checkout form sample data
├── global-setup.ts                 # One-time login before the test suite
└── playwright.config.ts            # Playwright configuration
```

---

## Architecture & Design

### Page Object Model

The project uses a two-level abstract hierarchy to share logic without repetition:

```
BasePage (abstract)
│   navigate(), reloadPage(), currentUrl
│
└── SauceDemoBasePage (abstract)
    │   header, secondaryHeader, sideMenu, footer (shared components)
    │
    ├── InventoryPage
    ├── CartPage
    ├── CheckoutStepOnePage
    ├── CheckoutStepTwoPage
    ├── CheckoutCompletePage
    └── ProductPage

LoginPage → BasePage  (no shared components needed)
```

All selectors use `data-test` attributes exclusively, configured as `testIdAttribute` in `playwright.config.ts`.

### Custom Fixtures

Fixtures in `fixtures/fixtures.ts` eliminate repetitive setup from every test file. All fixtures that require authentication are built on top of `authenticatedPage`, which restores a pre-saved session state.

```
test (Playwright base)
└── authenticatedPage   ← restores storageState from global-setup
    ├── inventoryPage
    ├── cartPage
    ├── checkoutStepOnePage
    ├── checkoutStepTwoPage
    ├── checkoutCompletePage
    └── productPage
```

### Authentication Strategy

`global-setup.ts` runs **once** before the entire suite. It performs a real UI login, saves the browser storage state to `playwright/.auth/user.json`, and all subsequent tests reuse that session — avoiding redundant login cycles. Tests in `login.spec.ts` override this with `test.use({ storageState: undefined })` to test the login form itself.

### Test Data Strategy — Data-Driven Testing

The suite applies the **Data-Driven Testing (DDT)** technique: test logic is written once and executed multiple times against different input sets, separating *what to test* from *how to test it*.

Test data lives in `data/*.json` and is imported as typed objects via TypeScript models. Tests iterate over that data at runtime, generating one test case per entry — no hardcoded values, no copy-pasted test blocks:

```typescript
for (const product of products) {
  test(`displays details for ${product.name}`, async ({ productPage }) => { ... });
}
```

A single loop over `products.json` produces 6 independent test cases. Adding a new product to the JSON automatically creates a new test — the spec file never needs to change.

| Data file | Used by |
|-----------|---------|
| `products.json` | Inventory, product details, cart, and checkout specs |
| `users.json` | Login spec (valid, locked-out, invalid credential scenarios) |
| `sample-checkout-data.json` | Checkout step one form filling |

### Design Decisions

#### 1. Two abstract base classes instead of one

`BasePage` handles generic browser navigation (`navigate()`, `reloadPage()`, `currentUrl`). `SauceDemoBasePage` extends it and composes the four shared UI components (header, footer, side menu, secondary header).

This separation follows the **Single Responsibility Principle**: `BasePage` knows nothing about Saucedemo's UI, making it reusable in any project. `SauceDemoBasePage` knows about the app's layout but not about specific page content. Each concrete page only defines what is unique to it.

`LoginPage` skips `SauceDemoBasePage` entirely and extends `BasePage` directly — the login screen has no header, footer, or menu, so inheriting them would violate the **Interface Segregation Principle**.

#### 2. Components receive a root `Locator`, not `Page`

Every component constructor accepts a `root: Locator` that scopes all internal selectors to that container:

```typescript
// ProductListComponent works in both contexts with the same code
new ProductListComponent(page.getByTestId('inventory-list'))  // InventoryPage
new ProductListComponent(page.getByTestId('cart-list'))       // CartPage
```

Passing `Page` would force each component to know which page it lives on, creating tight coupling. Passing a `Locator` makes components context-agnostic — the caller decides the scope. This is the **Dependency Inversion Principle** applied at the component level.

#### 3. Fixtures over `beforeEach` hooks

Playwright fixtures compose declaratively: `inventoryPage` builds on `authenticatedPage`, which builds on Playwright's `page`. A `beforeEach` hook is imperative, does not compose, and leaks setup logic into every spec file.

Fixtures are also lazy — only instantiated when a test actually declares them — and fully type-safe. Adding a new page fixture requires changing one file (`fixtures.ts`), not every spec.

#### 4. `globalSetup` + `storageState` for authentication

Performing a real UI login once and reusing the saved session state across all tests avoids two failure modes: slow suites (N tests × login time) and flaky suites (N tests × login risk). The session is stored in `playwright/.auth/user.json` and injected via `storageState` in `playwright.config.ts`.

Login tests opt out explicitly with `test.use({ storageState: undefined })`, keeping authentication concerns isolated from functional test concerns.

#### 5. `data-test` attributes as the sole selector strategy

CSS classes change with redesigns. Text content changes with copy updates or localization. XPath breaks with DOM restructuring. `data-test` attributes exist for one purpose — testing — and are stable across all of the above. Configuring `testIdAttribute: 'data-test'` in `playwright.config.ts` enforces this at the framework level, so `page.getByTestId()` always resolves to the right attribute without per-file configuration.

---

## Test Coverage

| Module | Scenarios covered | Tags |
|--------|------------------|------|
| Login | Valid login, invalid credentials, locked-out user, empty fields | @smoke @regression |
| Logout | Logout from inventory, cart, checkout step 1, step 2, complete | @regression |
| Inventory | Cart badge updates, add/remove each of 6 products | @smoke @regression |
| Product Details | URL params, title/description/price display, add/remove from cart (×6 products) | @regression |
| Cart | View added products, remove individual item, remove all items | @smoke @regression |
| Checkout | Form validation (all fields), price calculation (subtotal/tax/total), cancel flow, order confirmation | @smoke @regression |
| **Total** | **~64 tests** | |

---

## CI / CD

The GitHub Actions workflow (`.github/workflows/ci-regression.yml`) triggers on every push to `main` and runs the full `@regression` suite on `ubuntu-latest` with Node.js 24.

- **Retries:** 2 in CI, 0 locally
- **Workers:** 1 in CI (stability), 3 locally (speed)
- **Artifacts:** HTML report uploaded and retained for 30 days after each run
- **Failure evidence:** Screenshots and videos captured on test failure; traces captured on first retry
