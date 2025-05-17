# Test Doubles Best Practices

## Definition and Types

Test Doubles are objects that replace real components in tests. They help isolate the code being tested and control test environments. There are five main types of Test Doubles:

### 1. Dummy Objects

- **Purpose**: Passed when an argument is required but never used
- **Behavior**: Methods typically return null or do nothing
- **Usage**: Constructors or methods that require parameters you don't care about
- **Example**:

```javascript
class DummyAuthorizer {
  authorize(username, password) {
    return null;
  }
}
```

### 2. Stub Objects

- **Purpose**: Provide canned answers to method calls
- **Behavior**: Return predetermined values regardless of input
- **Usage**: When you need to simulate specific conditions or states
- **Example**:

```javascript
class AcceptingAuthorizerStub {
  authorize(username, password) {
    return true;
  }
}
```

### 3. Spy Objects

- **Purpose**: Record information about how they were called
- **Behavior**: Track method calls, arguments, and call counts
- **Usage**: When you need to verify behavior without affecting test results
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

### 4. Mock Objects

- **Purpose**: Verify expected behavior
- **Behavior**: Include built-in verification methods that ensure expected methods were called
- **Usage**: When testing behavior rather than state
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

### 5. Fake Objects

- **Purpose**: Simulate real implementation with simplified behavior
- **Behavior**: Contain actual business logic but in a simplified form
- **Usage**: When real implementations are too complex or slow for tests
- **Example**:

```javascript
class AcceptingAuthorizerFake {
  authorize(username, password) {
    return username === "Bob";
  }
}
```

## Best Practices for Using Test Doubles

### When to Use Each Type

1. **Dummies**: Use when you need to satisfy dependencies but the object will not be used
2. **Stubs**: Use when you need to control indirect inputs to test a specific path
3. **Spies**: Use when you need to verify interactions but prefer assertions in the test
4. **Mocks**: Use when behavior verification is the primary concern (often with mocking frameworks)
5. **Fakes**: Use sparingly when stub behavior would be too complex

### Implementation Guidelines

1. **Prefer Hand-Written Test Doubles**:

   - For simple cases, writing your own test doubles is often clearer than using mocking frameworks
   - IDEs can generate interface implementations quickly, making this approach efficient

2. **Keep Test Doubles Simple**:

   - Make them do exactly what's needed for the test, no more
   - Avoid complex logic in test doubles when possible

3. **Avoid Over-Spying**:

   - The more details you verify about interactions, the more coupled your tests become to implementation
   - This creates fragile tests that break when implementation details change

4. **Mock at Boundaries**:

   - Use test doubles primarily at the boundaries of your system
   - Examples: external APIs, databases, file systems

5. **Understand Terminology**:

   - Be aware that "mock" is often used informally to refer to any test double
   - When precision matters, use the formal terms for each type

6. **Test Double Hierarchy**:
   - Mocks are spies with verification methods
   - Spies are stubs that record interactions
   - Stubs are dummies that return consistent values
   - Fakes are a separate category entirely

### Testing Patterns

1. **Arrange-Act-Assert**:

   - Arrange: Set up test doubles and system under test
   - Act: Execute the method being tested
   - Assert: Verify the expected outcomes

2. **London School (Mockist) Testing**:

   - Uses mocks extensively to test interactions between objects
   - Focuses on behavior verification rather than state verification
   - See: "Growing Object-Oriented Software, Guided by Tests" by Freeman & Pryce

3. **Dependency Injection**:
   - Design systems to accept dependencies through constructors or setters
   - This makes it easy to substitute test doubles in tests

## Common Mistakes to Avoid

1. **Testing Implementation Details**:

   - Over-specifying interactions creates brittle tests
   - Focus on behavior visible to clients of the code

2. **Mock Everything**:

   - Excessive mocking creates tests that don't verify real behavior
   - Only mock dependencies that you need to control

3. **Complex Fake Objects**:

   - Fakes that become too complex need their own tests
   - Consider whether a real implementation or a simpler approach would be better

4. **Incorrect Test Double Type**:

   - Using a mock when a stub would suffice adds unnecessary complexity
   - Match the test double type to your specific testing need

5. **Ignoring Fragile Tests**:
   - Tests that break frequently due to implementation changes are a warning sign
   - Refactor tests that couple too tightly to implementation details

## When to Use Mocking Frameworks

1. **Complex Interaction Verification**:

   - When you need to verify complex sequences of calls
   - When argument matching is important

2. **Dynamic Mock Creation**:

   - When creating test doubles manually would be too verbose
   - When you need to create test doubles for many interfaces

3. **Special Mocking Needs**:
   - Mocking static methods or constructors
   - Partial mocking of real objects
