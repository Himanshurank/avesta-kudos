# Testing Strategy SOP for Avesta-Lancer

This document outlines the comprehensive testing strategy for the Avesta-Lancer project. It serves as a reference guide for implementing tests across different layers of the application.

## Table of Contents

1. [Testing Overview](#testing-overview)
2. [Testing Technologies](#testing-technologies)
3. [Testing Structure](#testing-structure)
4. [Test Identification Rules & Naming Conventions](#test-identification-rules--naming-conventions)
5. [Unit Testing](#unit-testing)
6. [Integration Testing](#integration-testing)
7. [Component Testing](#component-testing)
8. [E2E Testing](#e2e-testing)
9. [Acceptance Testing](#acceptance-testing)
10. [Test Reports](#test-reports)
11. [CI/CD Integration](#cicd-integration)

## Test Identification Rules & Naming Conventions

Clear test identification and consistent naming are critical for maintainable test suites. Follow these rules across all test types:

### Test File Naming

| Test Type         | File Naming Pattern                          | Example                            |
| ----------------- | -------------------------------------------- | ---------------------------------- |
| Unit Tests        | `[filename].test.ts` or `[filename].spec.ts` | `formatCurrency.test.ts`           |
| Component Tests   | `[ComponentName].test.tsx`                   | `Button.test.tsx`                  |
| Integration Tests | `[Feature].integration.test.tsx`             | `UserProfile.integration.test.tsx` |
| E2E Tests         | `[Flow].e2e.test.tsx`                        | `login.e2e.test.tsx`               |
| Acceptance Tests  | `[Feature].feature` + `[Feature].steps.ts`   | `login.feature` + `login.steps.ts` |

## Naming Conventions

Test files: \*.test.ts
Test cases: Should follow the pattern:
Success: "should [expected outcome] when [condition]"
Failure: "should throw [error type] when [condition]"
Integration: "should coordinate with [dependency] to [outcome]"

### Test Suite Organization

1. **Group Related Tests**: Use descriptive `describe` blocks to group related test cases

   ```typescript
   describe("Button Component", () => {
     describe("when disabled", () => {
       // tests for disabled state
     });

     describe("when enabled", () => {
       // tests for enabled state
     });
   });
   ```

2. **Test Case Naming**: Use clear, action-oriented test names with the pattern:

   - "it should [expected behavior] when [condition]"

   ```typescript
   it("should disable submit button when form is invalid", () => {
     // test implementation
   });
   ```

3. **Arrange-Act-Assert (AAA)** pattern in tests:

   ```typescript
   it("should update counter when increment button is clicked", () => {
     // Arrange
     const { getByRole } = render(<Counter initialValue={0} />);

     // Act
     fireEvent.click(getByRole("button", { name: /increment/i }));

     // Assert
     expect(getByRole("heading")).toHaveTextContent("1");
   });
   ```

### Test Data Naming

1. **Mock Data Variables**: Use descriptive names that indicate what the data represents:

   ```typescript
   const mockValidUser = {
     /* ... */
   };
   const mockInvalidUserMissingEmail = {
     /* ... */
   };
   ```

2. **Test Fixtures**: Store reusable test data in dedicated fixture files with clear naming:
   ```
   __fixtures__/
   ├── users/
   │   ├── validUsers.ts
   │   └── invalidUsers.ts
   └── products/
       ├── catalogProducts.ts
       └── outOfStockProducts.ts
   ```

### Test Tags and Categories

Use tags to categorize tests for selective execution:

1. **Priority Tags**: Mark critical tests for faster feedback loops

   ```typescript
   // @critical
   it("should authenticate user with valid credentials", () => {
     // test implementation
   });
   ```

2. **Smoke Test Tags**: Identify basic functionality tests

   ```typescript
   // @smoke
   it("should load home page successfully", () => {
     // test implementation
   });
   ```

3. **Performance Tags**: Mark tests focused on performance metrics
   ```typescript
   // @performance
   it("should load search results in under 300ms", () => {
     // test implementation
   });
   ```

### Test ID Attributes in Components

For reliable component selection in tests, use consistent test IDs:

1. **Format**: `[component]-[element]-[purpose]`

   ```jsx
   <button data-testid="user-form-submit">Submit</button>
   ```

2. **Hierarchy**: Include component hierarchy when necessary

   ```jsx
   <input data-testid="user-form-email-input" type="email" />
   ```

3. **Selection in Tests**: Use dedicated helpers to select by test ID
   ```typescript
   const submitButton = screen.getByTestId("user-form-submit");
   ```

By following these identification rules and naming conventions, you'll create a test suite that is:

- Easy to navigate and understand
- Self-documenting
- Maintainable by the entire team
- Organized for selective test execution

## Testing Overview

The Avesta-Lancer testing strategy implements a multi-layered approach:

- **Unit Tests**: Test individual functions and methods
- **Component Tests**: Test React components in isolation
- **Integration Tests**: Test interactions between multiple components or services
- **E2E Tests**: Test complete user flows through the application
- **Acceptance Tests**: Validate features against business requirements using BDD

## Testing Technologies

The project uses the following testing technologies:

- **Jest**: Primary test runner and assertion library
- **React Testing Library**: Component testing
- **MSW (Mock Service Worker)**: API mocking for tests
- **Cucumber/Jest-Cucumber**: BDD acceptance testing
- **Testing Library User Event**: Simulating user interactions

## Testing Structure

Tests are organized in the `src/__tests_` directory with the following structure:

```
src/__tests_/
├── components/    # Component tests
├── e2e/          # End-to-end tests
├── acceptance/   # Acceptance/BDD tests
├── Integration_test/ # Integration tests
└── pages/        # Page component tests
```

## Unit Testing

### Step 1: Identify Units to Test

- Functions, utilities, hooks, and other pure logic
- Focus on testing business logic, data transformations, and utilities

### Step 2: Creating Unit Tests

1. Create test file with naming convention: `[filename].test.ts` or `[filename].spec.ts`
2. Import the unit to test
3. Use Jest's `describe` and `it` for organizing test suites
4. Use Jest assertions to verify expected outcomes

### Example Unit Test Implementation

```typescript
// src/__tests_/utils/formatCurrency.test.ts
import { formatCurrency } from "@/shared/utils/formatCurrency";

describe("formatCurrency", () => {
  it("formats number to currency with default options", () => {
    expect(formatCurrency(1000)).toBe("$1,000");
  });

  it("handles decimal values correctly", () => {
    expect(formatCurrency(1000.5)).toBe("$1,000.50");
  });
});
```

## Component Testing

### Step 1: Identify Components to Test

- Focus on reusable components first
- Prioritize components with complex logic or state

### Step 2: Creating Component Tests

1. Create test file with naming convention: `[ComponentName].test.tsx`
2. Import the component and React Testing Library utilities
3. Render the component with necessary props and context
4. Assert on rendered output and component behavior

### Example Component Test Implementation

```typescript
// src/__tests_/components/Button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/shared/components/Button";

describe("Button Component", () => {
  it("renders with default props", () => {
    const { getByRole } = render(<Button>Click Me</Button>);
    const button = getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Button onClick={handleClick}>Click Me</Button>
    );
    const button = getByRole("button", { name: /click me/i });

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Integration Testing

### Step 1: Identify Integration Points

- Component compositions
- Data flow between connected components
- API interactions

### Step 2: Creating Integration Tests

1. Create test file with naming convention: `[Feature].integration.test.tsx`
2. Use the React Testing Library to render connected components
3. Use MSW to mock API responses
4. Test the interactions between components and services

### Example Integration Test Implementation

```typescript
// src/__tests_/Integration_test/UserProfile.integration.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import UserProfile from "@/modules/user/UserProfile";

// Mock API responses
const server = setupServer(
  rest.get("/api/user/profile", (req, res, ctx) => {
    return res(ctx.json({ name: "John Doe", email: "john@example.com" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("UserProfile Integration", () => {
  it("loads and displays user profile data", async () => {
    render(<UserProfile userId="123" />);

    // Wait for API data to load
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
    });
  });
});
```

## E2E Testing

### Step 1: Identify Key User Flows

- Critical business paths (registration, login, etc.)
- High-value user journeys

### Step 2: Creating E2E Tests

1. Create test file with naming convention: `[Flow].e2e.test.ts`
2. Use Jest with user-event to simulate complete user flows
3. Test entire features from a user's perspective

### Example E2E Test Implementation

```typescript
// src/__tests_/e2e/login.e2e.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "@/pages/_app";

const server = setupServer(
  rest.post("/api/login", (req, res, ctx) => {
    return res(ctx.json({ success: true, token: "fake-token" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Login Flow", () => {
  it("allows user to login successfully", async () => {
    render(<App />);

    // Navigate to login page
    const loginLink = screen.getByText(/login/i);
    userEvent.click(loginLink);

    // Fill in login form
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password123");
    userEvent.click(submitButton);

    // Verify successful login
    await screen.findByText(/welcome back/i);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
```

## Acceptance Testing

### Step 1: Define Features and Scenarios

1. Create feature files using Gherkin syntax in `.feature` files
2. Define scenarios with Given/When/Then steps

### Step 2: Implement Step Definitions

1. Create step definition files: `[Feature].steps.ts`
2. Map Gherkin steps to test implementations

### Example Acceptance Test Implementation

```gherkin
# src/__tests_/acceptance/features/login.feature
Feature: User Login
  As a user
  I want to login to the system
  So that I can access my account

  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard
```

```typescript
// src/__tests_/acceptance/login.steps.ts
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "@/pages/login";

const feature = loadFeature("src/__tests_/acceptance/features/login.feature");

defineFeature(feature, (test) => {
  test("Successful login", ({ given, when, and, then }) => {
    given("I am on the login page", () => {
      render(<Login />);
      expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    });

    when("I enter valid credentials", () => {
      userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
      userEvent.type(screen.getByLabelText(/password/i), "password123");
    });

    and("I click the login button", () => {
      userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });

    then("I should be redirected to the dashboard", async () => {
      await screen.findByText(/dashboard/i);
      expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    });
  });
});
```

## Test Reports

The project generates test reports for better visibility:

1. **Jest HTML Reporter**: Standard HTML reports for all tests
2. **Cucumber HTML Reporter**: BDD-style reports for acceptance tests

Run acceptance tests with reports:

```bash
npm run test:acceptance:report
```

## CI/CD Integration

Tests are integrated into CI/CD pipelines:

1. **Pull Request Checks**: Unit and component tests run on every PR
2. **Nightly Builds**: Full suite including E2E and acceptance tests
3. **Pre-deployment Checks**: Critical path tests before production deployment

### CI/CD Test Commands:

```bash
# CI unit and component tests
npm run test:ci

# CI acceptance tests
npm run test:acceptance:ci
```

## Best Practices

## Best Practices

1. **Write Tests First**: Practice TDD when possible
2. **Keep Tests Independent**: Each test should run in isolation
3. **Use Real DOM Testing**: Prefer React Testing Library over shallow rendering
4. **Mock External Dependencies**: Use MSW for API mocking
5. **Maintain Test Coverage**: Aim for high coverage in critical paths
6. **Organize Tests Logically**: Follow the test pyramid approach
7. **Create Test Utilities**: Build helpers for common testing needs
8. **DO**

   - Test user-facing behavior and outcomes
   - Write tests that survive refactoring
   - Use semantic queries (getByRole, getByLabelText)
   - Mock external dependencies
   - Test error states
   - Document complex test flows
   - Clean up after tests
   - Use proper async patterns
   - Test from the user's perspective
   - Focus on component contracts/APIs

9. **DON'T**
   - Test implementation details (internal state, private methods)
   - Couple tests to specific implementations
   - Use non-semantic queries (getByTestId) as first choice
   - Test library internals
   - Skip error handling
   - Leave commented-out tests
   - Write dependent tests
   - Test exact component structure
   - Assert on component internals
   - Mock things not needed to be mocked

## Test Architecture & Page Object Model

The testing architecture in this project follows a structured approach to ensure maintainability, reusability, and clarity. One of the core design patterns we use is the Page Object Model (POM).

### Page Object Model

The Page Object Model is a design pattern that creates an object repository for web UI elements. It helps reduce code duplication and improves test maintenance.

#### Directory Structure

```
src/__tests_/
├── pageObjects/
│   ├── components/
│   │   ├── NavBar.ts
│   │   ├── SearchForm.ts
│   │   └── ...
│   ├── pages/
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── ProfilePage.ts
│   │   └── ...
│   └── common/
│       ├── BasePage.ts
│       ├── FormBase.ts
│       └── ...
```

#### Base Page Object Class

```typescript
// src/__tests_/pageObjects/common/BasePage.ts
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export class BasePage {
  protected getByTestId(testId: string) {
    return screen.getByTestId(testId);
  }

  protected getByText(text: string | RegExp) {
    return screen.getByText(text);
  }

  protected async waitForElement(testId: string) {
    return await screen.findByTestId(testId);
  }

  // More helper methods...
}
```

#### Specific Page Object

```typescript
// src/__tests_/pageObjects/pages/LoginPage.ts
import { BasePage } from "../common/BasePage";
import userEvent from "@testing-library/user-event";

export class LoginPage extends BasePage {
  // Selectors
  private emailInputSelector = "login-email-input";
  private passwordInputSelector = "login-password-input";
  private submitButtonSelector = "login-submit-button";
  private errorMessageSelector = "login-error-message";

  // Actions
  async enterEmail(email: string) {
    const emailInput = this.getByTestId(this.emailInputSelector);
    await userEvent.type(emailInput, email);
    return this;
  }

  async enterPassword(password: string) {
    const passwordInput = this.getByTestId(this.passwordInputSelector);
    await userEvent.type(passwordInput, password);
    return this;
  }

  async clickSubmit() {
    const submitButton = this.getByTestId(this.submitButtonSelector);
    await userEvent.click(submitButton);
    return this;
  }

  // Login flow combining multiple actions
  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSubmit();
    return this;
  }

  // Assertions
  async expectErrorMessage(message: string | RegExp) {
    const errorElement = await this.waitForElement(this.errorMessageSelector);
    expect(errorElement).toHaveTextContent(message);
    return this;
  }

  async expectSuccessfulLogin() {
    // Navigate to Dashboard after successful login
    await screen.findByTestId("dashboard-heading");
    return this;
  }
}
```

#### Component Object

```typescript
// src/__tests_/pageObjects/components/NavBar.ts
import { BasePage } from "../common/BasePage";
import userEvent from "@testing-library/user-event";

export class NavBar extends BasePage {
  // Selectors
  private profileDropdownSelector = "navbar-profile-dropdown";
  private logoutButtonSelector = "navbar-logout-button";
  private loginLinkSelector = "navbar-login-link";

  // Actions
  async clickProfileDropdown() {
    const dropdown = this.getByTestId(this.profileDropdownSelector);
    await userEvent.click(dropdown);
    return this;
  }

  async clickLogout() {
    await this.clickProfileDropdown();
    const logoutButton = this.getByTestId(this.logoutButtonSelector);
    await userEvent.click(logoutButton);
    return this;
  }

  async clickLogin() {
    const loginLink = this.getByTestId(this.loginLinkSelector);
    await userEvent.click(loginLink);
    return this;
  }
}
```

### Using Page Objects in Tests

```typescript
// src/__tests_/e2e/login.e2e.test.tsx
import { render } from "@testing-library/react";
import App from "@/pages/_app";
import { LoginPage } from "../pageObjects/pages/LoginPage";
import { setupApiMocks } from "../mocks/api";

describe("Login Flow", () => {
  let loginPage: LoginPage;

  beforeEach(() => {
    setupApiMocks();
    render(<App />);
    loginPage = new LoginPage();
  });

  it("should login successfully with valid credentials", async () => {
    await loginPage.login("test@example.com", "valid-password");
    await loginPage.expectSuccessfulLogin();
  });

  it("should show error message with invalid credentials", async () => {
    await loginPage.login("test@example.com", "invalid-password");
    await loginPage.expectErrorMessage(/invalid email or password/i);
  });
});
```

### Test Data Management

We create class-based test data factories to generate consistent test data:

```typescript
// src/__tests_/factories/UserFactory.ts
import { User } from "@/shared/interfaces/User";

export class UserFactory {
  static createValidUser(overrides = {}): User {
    return {
      id: "123",
      email: "test@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "user",
      ...overrides,
    };
  }

  static createInvalidUser(overrides = {}): Partial<User> {
    return {
      email: "invalid-email",
      ...overrides,
    };
  }

  static createAdmin(overrides = {}): User {
    return this.createValidUser({
      role: "admin",
      ...overrides,
    });
  }
}
```

### API Mocking Architecture

We use a structured approach to organize API mocks:

```typescript
// src/__tests_/mocks/api/handlers/auth.ts
import { rest } from "msw";
import { UserFactory } from "../../../factories/UserFactory";

export const authHandlers = [
  rest.post("/api/login", (req, res, ctx) => {
    const { email, password } = req.body as any;

    if (email === "test@example.com" && password === "valid-password") {
      return res(
        ctx.status(200),
        ctx.json({
          token: "fake-jwt-token",
          user: UserFactory.createValidUser(),
        })
      );
    }

    return res(
      ctx.status(401),
      ctx.json({ message: "Invalid email or password" })
    );
  }),

  rest.post("/api/logout", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
];

// src/__tests_/mocks/api/handlers/index.ts
import { authHandlers } from "./auth";
import { userHandlers } from "./users";
import { productHandlers } from "./products";

export const handlers = [...authHandlers, ...userHandlers, ...productHandlers];

// src/__tests_/mocks/api/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

// src/__tests_/mocks/api/index.ts
import { server } from "./server";

export const setupApiMocks = () => {
  // Start the server before all tests
  beforeAll(() => server.listen());

  // Reset handlers after each test (important for test isolation)
  afterEach(() => server.resetHandlers());

  // Close server after all tests
  afterAll(() => server.close());
};
```

### Test Context Providers

For tests requiring context providers (like Redux, ThemeProvider, Router, etc.):

```typescript
// src/__tests_/utils/TestProviders.tsx
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/shared/contexts/ThemeContext";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/store/rootReducer";

interface TestProvidersProps {
  children: ReactNode;
  initialState?: any;
}

export const TestProviders = ({
  children,
  initialState = {},
}: TestProvidersProps) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

// Usage in tests
import { render } from "@testing-library/react";
import { TestProviders } from "../utils/TestProviders";
import ProfileComponent from "@/components/Profile";

describe("Profile Component", () => {
  it("renders user information", () => {
    const initialState = {
      user: {
        data: UserFactory.createValidUser(),
      },
    };

    render(
      <TestProviders initialState={initialState}>
        <ProfileComponent />
      </TestProviders>
    );

    // Test assertions...
  });
});
```

### Custom Test Commands and Utilities

Create utility functions for common test operations:

```typescript
// src/__tests_/utils/testUtils.ts
import { screen, waitForElementToBeRemoved } from "@testing-library/react";

// Wait for loading state to complete
export const waitForLoadingToComplete = async () => {
  const loader = screen.queryByTestId("loader");
  if (loader) {
    await waitForElementToBeRemoved(() => screen.queryByTestId("loader"));
  }
};

// Fill a form with data
export const fillForm = async (formData: Record<string, string>) => {
  for (const [fieldName, value] of Object.entries(formData)) {
    const input = screen.getByTestId(`form-field-${fieldName}`);
    await userEvent.type(input, value);
  }
};
```

By following this architecture, we achieve:

1. **Reusability**: Page objects and utilities are reused across test suites
2. **Maintainability**: Changes to the UI only require updates in one place
3. **Readability**: Tests focus on behavior, not implementation details
4. **Stability**: Tests are less brittle as selectors are centralized

## Implementing New Tests

When implementing tests for a new feature:

1. Start with unit tests for utility functions and hooks
2. Add component tests for UI elements
3. Create integration tests for component interactions
4. Add E2E tests for critical user flows
5. Write acceptance tests to validate business requirements

By following this testing strategy, you'll ensure comprehensive test coverage and maintain a high-quality codebase.
