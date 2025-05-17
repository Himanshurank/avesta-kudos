# Comprehensive Guide to Unit Testing with Test Doubles and Sociable Testing

## 1. Understanding Test Doubles

### Definition and Types

Test Doubles replace real components in tests to isolate code and control test environments. There are five main types:

#### 1.1 Dummy Objects

- **Purpose**: Passed as required arguments but never used
- **Behavior**: Return null or do nothing
- **Example**:

```javascript
class DummyAuthorizer {
  authorize(username, password) {
    return null;
  }
}
```

#### 1.2 Stub Objects

- **Purpose**: Provide predetermined answers
- **Behavior**: Return consistent values regardless of input
- **Example**:

```javascript
class AcceptingAuthorizerStub {
  authorize(username, password) {
    return true;
  }
}
```

#### 1.3 Spy Objects

- **Purpose**: Record how they were called
- **Behavior**: Track method calls and arguments
- **Example**:

```javascript
class AcceptingAuthorizerSpy {
  constructor() {
    this.authorizeWasCalled = false;
  }

  authorize(username, password) {
    this.authorizeWasCalled = true;
    return true;
  }
}
```

#### 1.4 Mock Objects

- **Purpose**: Verify expected behavior
- **Behavior**: Include built-in verification methods
- **Example**:

```javascript
class AcceptingAuthorizerVerificationMock {
  constructor() {
    this.authorizeWasCalled = false;
  }

  authorize(username, password) {
    this.authorizeWasCalled = true;
    return true;
  }

  verify() {
    return this.authorizeWasCalled;
  }
}
```

#### 1.5 Fake Objects

- **Purpose**: Simplified implementations of real components
- **Behavior**: Contain actual business logic in simplified form
- **Example**:

```javascript
class AcceptingAuthorizerFake {
  authorize(username, password) {
    return username === "Bob";
  }
}
```

## 2. Sociable Unit Testing

### 2.1 Sociable Testing Approach

- Uses real implementations for some dependencies
- Mocks only external system boundaries
- Tests how components work together
- Verifies business rules across multiple layers

## 3. When to Use Each Approach

### 3.1 Use Sociable Tests When:

- Verifying business rules that span layers
- Testing integration points between components
- Validating collaboration behaviors
- Supporting safe refactoring
- Testing complex business rules

## 4. Implementing Sociable Tests with TestBed

### 4.1 Basic Structure

```typescript
describe("OrderService Business Rules", () => {
  let orderService: OrderService;
  let paymentGateway: Mocked<PaymentGateway>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.sociable(OrderService)
      .expose(OrderRepository) // Use real implementation
      .expose(DiscountCalculator) // Use real implementation
      .compile();

    orderService = unit;
    paymentGateway = unitRef.get(PaymentGateway);
  });

  it("should apply loyalty discount when customer has sufficient points", async () => {
    // Arrange
    paymentGateway.processPayment.mockResolvedValue({ success: true });

    // Act
    const result = await orderService.placeOrder({
      customerId: "loyal-customer-123",
      items: [{ productId: "product-1", quantity: 2 }],
    });

    // Assert
    expect(result.finalPrice).toBeLessThan(result.originalPrice);
    expect(result.discounts).toContain("LOYALTY_DISCOUNT");
  });
});
```

### 4.2 Key Components

1. **TestBed.sociable()**: Sets up sociable testing environment
2. **.expose()**: Specifies which dependencies should be real
3. **.compile()**: Finalizes test setup and returns unit and unitRef

### 4.3 Configuring Mock Behavior

#### Using .mock().final()

```typescript
const { unit } = await TestBed.sociable(OrderService)
  .expose(OrderRepository)
  .mock(PaymentGateway)
  .final({
    processPayment: async () => ({
      success: true,
      transactionId: "mock-tx-123",
    }),
  })
  .compile();
```

#### Using .mock().impl()

```typescript
const { unit, unitRef } = await TestBed.sociable(OrderService)
  .expose(OrderRepository)
  .mock(PaymentGateway)
  .impl((stubFn) => ({
    processPayment: stubFn().mockImplementation(async (request) => {
      if (request.amount > 1000) {
        return { success: false, error: "AMOUNT_TOO_LARGE" };
      }
      return { success: true, transactionId: "mock-tx-123" };
    }),
  }))
  .compile();
```

## 5. Best Practices for Test Doubles

### 5.1 When to Use Each Test Double Type

- **Dummies**: For required but unused dependencies
- **Stubs**: To control inputs for specific test paths
- **Spies**: To verify interactions with assertions in test
- **Mocks**: When behavior verification is primary concern
- **Fakes**: When stub behavior would be too complex

### 5.2 Implementation Guidelines

1. **Prefer Hand-Written Doubles for Simple Cases**
2. **Keep Test Doubles Simple**
3. **Avoid Over-Spying** to prevent brittle tests
4. **Mock at Boundaries** (external APIs, databases)
5. **Understand Test Double Hierarchy**:
   - Mocks are spies with verification
   - Spies are stubs that record interactions
   - Stubs are dummies with return values

## 6. Best Practices for Sociable Unit Testing

### 6.1 Focus on Business Outcomes

- Test business results (calculated values, state transitions)
- Avoid testing implementation details

### 6.2 Limit Exposure to Essential Collaborators

- Expose only directly involved repositories and domain services
- Keep external systems mocked for reliability

### 6.3 Test Business Edge Cases

- Create tests for boundary conditions
- Test both happy paths and exceptional cases

### 6.4 Maintain Domain Integrity

- Ensure business rules apply correctly across domain model
- Verify all business constraints are enforced

## 7. Common Testing Patterns

### 7.1 Arrange-Act-Assert

- **Arrange**: Set up test doubles and system under test
- **Act**: Execute method being tested
- **Assert**: Verify expected outcomes

### 7.2 London School (Mockist) vs. Classical Testing

- **London/Mockist**: Heavy use of mocks, behavior verification
- **Classical/Detroit**: Prefer real objects, state verification

### 7.3 Dependency Injection

- Design for testability with constructor/setter injection
- Makes substituting test doubles easier

## 8. Common Mistakes to Avoid

### 8.1 Testing Implementation Details

- Over-specifying interactions creates brittle tests
- Focus on behavior visible to clients

### 8.2 Mocking Everything

- Excessive mocking doesn't verify real behavior
- Only mock what you need to control

### 8.3 Using Incorrect Test Double Type

- Match the test double to your specific need
- Avoid complexity when simpler doubles would suffice

### 8.4 Ignoring Fragile Tests

- Tests that break frequently are warning signs
- Refactor tests that couple tightly to implementation

## 9. Complete Example of Sociable Business Rule Test

```typescript
import { TestBed, Mocked } from "@suites/unit";
import { InvoiceService } from "./invoice.service";
import {
  InvoiceRepository,
  CustomerRepository,
  TaxRuleRepository,
} from "./repositories";
import { PaymentGateway, NotificationService } from "./external";

describe("InvoiceService Business Rules", () => {
  let invoiceService: InvoiceService;
  let paymentGateway: Mocked<PaymentGateway>;
  let notificationService: Mocked<NotificationService>;

  beforeAll(async () => {
    // Setup with real repositories to test business interactions
    const { unit, unitRef } = await TestBed.sociable(InvoiceService)
      .expose(InvoiceRepository)
      .expose(CustomerRepository)
      .expose(TaxRuleRepository)
      .compile();

    invoiceService = unit;
    paymentGateway = unitRef.get(PaymentGateway);
    notificationService = unitRef.get(NotificationService);
  });

  it("should apply correct tax rates based on customer location", async () => {
    // Arrange
    paymentGateway.processPayment.mockResolvedValue({ success: true });

    // Act
    const invoice = await invoiceService.generateInvoice({
      customerId: "customer-in-california",
      items: [{ productId: "taxable-product", amount: 100 }],
    });

    // Assert business rule: CA tax should be 7.25%
    expect(invoice.taxAmount).toBeCloseTo(7.25);
    expect(invoice.taxRate).toBe("CA_STATE_TAX");
  });

  it("should exempt tax for certain product categories", async () => {
    // Arrange
    paymentGateway.processPayment.mockResolvedValue({ success: true });

    // Act
    const invoice = await invoiceService.generateInvoice({
      customerId: "customer-in-california",
      items: [{ productId: "tax-exempt-medicine", amount: 100 }],
    });

    // Assert business rule: Medicine products are tax exempt
    expect(invoice.taxAmount).toBe(0);
    expect(invoice.taxExemptionReason).toBe("MEDICAL_PRODUCT");
  });
});
```

## 10. Summary

Effective unit testing requires balancing between solitary tests (with test doubles) and sociable tests (with controlled real implementations). By understanding when to use each approach and properly applying test double techniques, you can create tests that:

1. Validate business rules across multiple components
2. Remain resilient against refactoring
3. Execute quickly and reliably
4. Provide useful documentation of system behavior

Choose sociable testing when verifying complex business rules that span layers, and use test doubles strategically at system boundaries to maintain control and isolation.
