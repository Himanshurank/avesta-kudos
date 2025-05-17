# Resume-builder - Architecture Principles

This document outlines the core architectural principles that all developers must follow when contributing to the Resume-builder project.

## 1. Layered Architecture

Resume-builder follows a strict layered architecture with clear separation of concerns:

1. **Presentation Layer**: UI components, pages, and user interaction
2. **Application Layer**: Business logic, use cases, and services
3. **Domain Layer**: Core business entities, rules, and interfaces
4. **Infrastructure Layer**: External services, data access, and technical implementations

### Key Principles:

- **Dependency Direction**: Dependencies must flow inward (Presentation → Application → Domain ← Infrastructure)
- **Layer Isolation**: Each layer should be testable in isolation
- **No Layer Skipping**: A layer should only interact with adjacent layers

## 2. SOLID Principles

All code in Resume-builder must adhere to SOLID principles:

### Single Responsibility Principle (SRP)

- Each class should have only one reason to change
- Keep methods focused on a single task
- Split large components/functions into smaller, focused ones

### Open/Closed Principle (OCP)

- Entities should be open for extension but closed for modification
- Use interfaces and abstract classes to allow extending functionality
- Avoid modifying existing code when adding new features

### Liskov Substitution Principle (LSP)

- Derived classes must be substitutable for their base classes
- Maintain expected behavior when overriding methods
- Honor contracts defined by interfaces

### Interface Segregation Principle (ISP)

- Create specific interfaces rather than general-purpose ones
- Clients should not depend on methods they don't use
- Keep interfaces focused and cohesive

### Dependency Inversion Principle (DIP)

- High-level modules should not depend on low-level modules
- Both should depend on abstractions
- Abstractions should not depend on details; details should depend on abstractions
- Use dependency injection for flexible and testable code

## 3. Atomic Design for UI

The presentation layer follows Atomic Design principles:

### Atoms

- Smallest UI components (buttons, inputs, icons)
- Should be highly reusable and stateless
- Focused on a single UI element

### Molecules

- Combinations of atoms that work together
- Form small functional groups (search field with button)
- Still relatively simple and focused

### Organisms

- Complex UI sections composed of molecules and atoms
- Self-contained components (forms, headers, sidebars)
- May maintain their own state

### Templates

- Page layouts without specific content
- Define structure and placement of organisms
- Handle responsiveness and layout concerns

### Pages

- Complete views with actual content
- Combine templates with real data
- Handle page-specific logic and state

## 4. Implementation Guidelines

### Code Organization

- Follow the project structure defined in `/docs/implementation/01-folder-structure.md`
- Keep related files together within their appropriate layer
- Use consistent naming conventions across the project

### State Management

- Use Zustand for global state management
- Keep state minimal and focused
- Follow unidirectional data flow

### Testing Approach

- Each layer requires appropriate tests:
  - Domain: Unit tests for entities and business rules
  - Application: Unit tests for services with mocked dependencies
  - Infrastructure: Integration tests for external services
  - Presentation: Component tests and end-to-end tests

### Error Handling

- Domain errors should be specific and meaningful
- Application layer should translate technical errors to domain errors
- Presentation layer should display user-friendly error messages

## 5. Application to Resume-builder Features

### Event Management

- Domain: Events as entities with validation rules
- Application: Event creation, editing, and management use cases
- Infrastructure: Event data persistence via Supabase
- Presentation: Event forms, lists, and details using atomic components

### Check-in Process

- Domain: Check-in rules and validation
- Application: Check-in workflow and business logic
- Infrastructure: Real-time attendance tracking
- Presentation: Mobile-friendly check-in UI with clear user guidance

### Reporting

- Domain: Core report definitions and calculations
- Application: Report generation and data aggregation
- Infrastructure: Efficient data querying
- Presentation: Interactive visualizations and export functionality

## 6. Compliance Requirements

All contributions must:

- Follow these architectural principles
- Pass linting and type checking
- Include appropriate tests
- Maintain or improve code coverage
- Be reviewed for architectural compliance before merging

By consistently applying these principles, we ensure Resume-builder remains maintainable, extensible, and high-quality as it evolves.
