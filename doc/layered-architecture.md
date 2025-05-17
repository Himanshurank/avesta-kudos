# Layered Architecture Reference Guide

## Overview

This document provides a comprehensive guide to implementing layered architecture for frontend and backend applications. Use this as a reference when creating new projects or features to ensure consistent structure, naming conventions, and design patterns that promote maintainability, testability, and scalability.

## Core Principles

1. **Separation of Concerns**: Each layer has a distinct responsibility
2. **Dependency Rule**: Dependencies only flow inward, from outer to inner layers
3. **Abstraction**: Inner layers are not aware of outer layers
4. **Interface-Based Programming**: Components depend on interfaces, not implementations
5. **Single Responsibility**: Each component should have only one reason to change

## Standard Folder Structure

```
src/
├── domain/                 # Core business logic and rules
│   ├── entities/           # Business objects, core functionality
│   ├── interfaces/         # Contracts for repositories and services
│   ├── valueObjects/       # Immutable typed values
│   ├── enums/              # Type enumerations
│   └── errors/             # Domain-specific errors
├── application/            # Orchestrates domain logic
│   ├── useCases/           # Business operations (features)
│   ├── services/           # Domain services
│   ├── dtos/               # Data transfer objects
│   ├── mappers/            # Transform between layers
│   ├── validators/         # Validation logic
│   └── events/             # Application events
├── infrastructure/         # External implementations
│   ├── repositories/       # Data access implementations
│   ├── services/           # External service implementations
│   ├── api/                # API clients
│   ├── database/           # Database adapters
│   ├── cache/              # Caching mechanisms
│   └── config/             # Configuration
├── presentation/           # UI Layer
│   ├── pages/              # Page components
│   ├── components/         # UI components
│   ├── hooks/              # React hooks
│   ├── contexts/           # React contexts
│   ├── state/              # State management
│   └── utils/              # UI utilities
└── shared/                 # Cross-cutting concerns
    ├── utils/              # Common utilities
    ├── constants/          # Application constants
    ├── types/              # Shared type definitions
    ├── di/                 # Dependency injection
    └── logging/            # Logging functionality
```

### Module-Based Structure (Alternative)

For larger applications, a feature/module-based organization can be more effective:

```
src/
├── modules/                # Feature modules
│   ├── user/               # User module
│   │   ├── domain/         # User domain layer
│   │   ├── application/    # User application layer
│   │   ├── infrastructure/ # User infrastructure layer
│   │   └── presentation/   # User presentation layer
│   ├── product/            # Product module
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── presentation/
│   └── order/              # Order module
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       └── presentation/
├── shared/                 # Shared code across modules
│   ├── domain/
│   ├── application/
│   ├── infrastructure/
│   └── presentation/
└── core/                   # Core application setup
    ├── di/                 # Dependency injection setup
    ├── routing/            # Application routing
    ├── auth/               # Authentication
    └── config/             # App configuration
```

## Layer Responsibilities

### 1. Domain Layer

- **Responsibility**: Core business logic and rules
- **Key Components**:
  - Entities (`src/domain/entities/`)
  - Value objects (`src/domain/valueObjects/`)
  - Domain interfaces (`src/domain/interfaces/`)
  - Domain events (`src/domain/events/`)
- **Rules**:
  - Has NO dependencies on other layers
  - Contains business rules and validation
  - Uses pure TypeScript (no frameworks)
  - Defines interfaces for repositories and services

### 2. Application Layer

- **Responsibility**: Orchestration of business logic and workflows
- **Key Components**:
  - Use cases (`src/application/useCases/`)
  - Services (`src/application/services/`)
  - DTOs (`src/application/dtos/`)
  - Mappers (`src/application/mappers/`)
- **Rules**:
  - Depends only on the Domain layer
  - Orchestrates domain entities but doesn't contain domain rules
  - Handles use case implementation
  - Manages cross-cutting concerns (logging, validation)
  - Transforms data between layers via mappers

### 3. Infrastructure Layer

- **Responsibility**: External communication and data access
- **Key Components**:
  - Repository implementations (`src/infrastructure/repositories/`)
  - API clients (`src/infrastructure/api/`)
  - Database adapters (`src/infrastructure/database/`)
  - External service implementations (`src/infrastructure/services/`)
- **Rules**:
  - Implements interfaces defined in the Domain layer
  - Contains technical details (API calls, database queries)
  - Handles serialization/deserialization of data
  - Manages external resources (APIs, databases, etc.)

### 4. Presentation Layer

- **Responsibility**: User interface and interaction
- **Key Components**:
  - Pages (`src/presentation/pages/`)
  - Components (`src/presentation/components/`)
  - Hooks (`src/presentation/hooks/`)
  - State management (`src/presentation/state/`)
- **Rules**:
  - Only depends on the Application layer
  - Never contains business logic
  - Focuses on UI rendering and user interaction
  - Translates user actions into application use case calls

## Naming Conventions

### General Rules

- **CamelCase**: Use camelCase for variables, properties, function names, and method names
- **PascalCase**: Use PascalCase for class names, interfaces, types, enums, and React components
- **Constants**: Use UPPER_SNAKE_CASE for constants and static final variables
- **Private variables**: Prefix private class variables with underscore (\_variableName)

### Layer-Specific Conventions

1. **Domain Layer**:

   - **Entities**: Noun, representing the business concept (e.g., `User`, `Product`, `Order`)
   - **Interfaces**: Prefix with "I" (e.g., `IUserRepository`)
   - **Enums**: Prefix with "E" (e.g., `EUserStatus`)
   - **Types**: Prefix with "T" (e.g., `TUserCredentials`)

2. **Application Layer**:

   - **Use Cases**: Verb + Noun + "UseCase" (e.g., `CreateUserUseCase`)
   - **Services**: Noun + "Service" (e.g., `AuthenticationService`)
   - **DTOs**: Noun + "Dto" (e.g., `UserDto`)
   - **Mappers**: Noun + "Mapper" (e.g., `UserMapper`)

3. **Infrastructure Layer**:

   - **Repositories**: Interface name + "Impl" (e.g., `UserRepositoryImpl`)
   - **API Clients**: Noun + "ApiClient" (e.g., `UserApiClient`)
   - **Service Implementations**: Interface name + "Impl" (e.g., `EmailServiceImpl`)

4. **Presentation Layer**:
   - **Components**: Noun or feature (e.g., `UserProfile`, `ProductList`)
   - **Pages**: Noun + "Page" (e.g., `UserProfilePage`)
   - **Hooks**: "use" + Feature (e.g., `useUserProfile`)
   - **Context**: Noun + "Context" (e.g., `UserContext`)
   - **State**: Noun + "State" (e.g., `userState`)

### File Naming Conventions

- **Use kebab-case** for file names
- **Group by feature** rather than by type when possible
- **Add suffixes** to indicate file type:

```
// Domain Layer
user.entity.ts                # Domain entity
user-repository.interface.ts  # Domain repository interface
user-status.enum.ts           # Domain enum
address.value-object.ts       # Domain value object

// Application Layer
create-user.use-case.ts       # Application use case
user-authentication.service.ts # Application service
user.dto.ts                   # Data transfer object
user.mapper.ts                # Mapper

// Infrastructure Layer
user-repository.impl.ts       # Repository implementation
user-api.client.ts            # API client
email.service.impl.ts         # Service implementation

// Presentation Layer
user-profile.component.tsx    # UI component
user-profile.page.tsx         # Page component
use-user-profile.hook.ts      # Custom hook
user.context.tsx              # React context
user.slice.ts                 # Redux slice
```

## Implementation Patterns

### Domain Layer Implementation

```typescript
// user.entity.ts - Domain Entity
export class User {
  private _id: string;
  private _email: string;
  private _password: string;
  private _status: EUserStatus;

  constructor(id: string, email: string, password: string) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._status = EUserStatus.PENDING;
  }

  get email(): string {
    return this._email;
  }

  activate(): void {
    if (this._status === EUserStatus.PENDING) {
      this._status = EUserStatus.ACTIVE;
    } else {
      throw new Error("User can only be activated from pending status");
    }
  }

  isActive(): boolean {
    return this._status === EUserStatus.ACTIVE;
  }

  // Other methods and business rules...
}

// user-repository.interface.ts - Domain Repository Interface
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}

// user-status.enum.ts - Domain Enum
export enum EUserStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  DELETED = "DELETED",
}
```

### Application Layer Implementation

```typescript
// create-user.use-case.ts - Application Use Case
export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private emailService: IEmailService
  ) {}

  async execute(params: CreateUserParams): Promise<UserDto> {
    // Validation
    if (!this.isValidEmail(params.email)) {
      throw new ValidationError("Invalid email format");
    }

    // Check if user exists
    const existingUser = await this.userRepository.findByEmail(params.email);
    if (existingUser) {
      throw new UserAlreadyExistsError(params.email);
    }

    // Hash password
    const hashedPassword = await this.passwordHasher.hash(params.password);

    // Create user
    const id = generateUniqueId();
    const user = new User(id, params.email, hashedPassword);

    // Save to repository
    await this.userRepository.save(user);

    // Send welcome email
    await this.emailService.sendWelcomeEmail(user.email);

    // Return DTO
    return UserMapper.toDto(user);
  }

  private isValidEmail(email: string): boolean {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

// user.mapper.ts - Mapper
export class UserMapper {
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      status: user.status,
      createdAt: user.createdAt.toISOString(),
    };
  }

  static toDomain(userDto: UserDto): User {
    // Map DTO to domain entity
    return new User(userDto.id, userDto.email, ""); // Password handled separately
  }
}
```

### Infrastructure Layer Implementation

```typescript
// user-repository.impl.ts - Repository Implementation
export class UserRepositoryImpl implements IUserRepository {
  constructor(private dataSource: DataSource) {}

  async findById(id: string): Promise<User | null> {
    try {
      const userRecord = await this.dataSource.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );

      if (!userRecord) return null;

      return this.mapDbRecordToUser(userRecord);
    } catch (error) {
      throw new RepositoryError("Failed to find user by ID", error);
    }
  }

  async save(user: User): Promise<void> {
    try {
      // Map domain entity to database format
      const userRecord = this.mapUserToDbRecord(user);

      // Insert or update
      await this.dataSource.query(
        "INSERT INTO users (id, email, password, status) VALUES (?, ?, ?, ?)",
        [
          userRecord.id,
          userRecord.email,
          userRecord.password,
          userRecord.status,
        ]
      );
    } catch (error) {
      throw new RepositoryError("Failed to save user", error);
    }
  }

  private mapDbRecordToUser(record: any): User {
    // Map database record to domain entity
    return new User(record.id, record.email, record.password);
  }
}
```

### Presentation Layer Implementation

```tsx
// user-profile.page.tsx - React Page Component
export function UserProfilePage() {
  const { userId } = useParams();
  const { user, loading, error } = useUserProfile(userId);
  const { updateUser } = useUserActions();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!user) return <NotFound message="User not found" />;

  const handleUpdate = async (formData: UserUpdateFormData) => {
    try {
      await updateUser({
        id: user.id,
        ...formData,
      });
      showToast("Profile updated successfully");
    } catch (error) {
      showToast("Failed to update profile", "error");
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      <UserProfileForm user={user} onSubmit={handleUpdate} />
    </div>
  );
}

// use-user-profile.hook.ts - Custom Hook
export function useUserProfile(userId: string) {
  const [state, setState] = useState({
    user: null,
    loading: true,
    error: null,
  });

  // Get use case from DI container
  const getUserUseCase = useInjection<GetUserUseCase>("getUserUseCase");

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      setState((prev) => ({ ...prev, loading: true }));

      try {
        const user = await getUserUseCase.execute({ userId });

        if (mounted) {
          setState({ user, loading: false, error: null });
        }
      } catch (error) {
        if (mounted) {
          setState({ user: null, loading: false, error });
        }
      }
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, [userId, getUserUseCase]);

  return state;
}
```

## Achieving Loose Coupling

### 1. Dependency Injection

- **Constructor Injection**: Dependencies are provided through constructors

  ```typescript
  export class LocationChangeUseCase {
    constructor(
      private repository: ISearchResultRepository,
      private analyticsService: IAnalyticsService
    ) {}

    // Methods can use injected dependencies
  }
  ```

- **DI Container**: Use a DI container to manage dependency lifetimes and resolution

  ```typescript
  // Example of registering services in a DI container
  diContainer.register(
    "ISearchResultRepository",
    SearchResultRepositoryImpl,
    httpClient
  );

  // Example of resolving a service
  const repository = diContainer.get<ISearchResultRepository>(
    "ISearchResultRepository"
  );
  ```

### 2. Interface-Based Programming

- **Define Contracts**: Use interfaces to define contracts between components

  ```typescript
  export interface IAnalyticsService {
    trackEvent(eventName: string, properties: Record<string, any>): void;
    trackPageView(pageName: string): void;
  }
  ```

- **Program to Interfaces**: Components should depend on interfaces, not concrete implementations

  ```typescript
  // Good: Depends on interface
  constructor(private repository: ISearchResultRepository) {}

  // Avoid: Depends on concrete implementation
  constructor(private repository: SearchResultRepositoryImpl) {}
  ```

### 3. Inversion of Control

- **Control Flow Reversal**: Business logic dictates what interfaces are needed, not how they're implemented
- **Plugin Architecture**: Infrastructure components "plug in" to the application core

### 4. Event-Driven Communication

- **Use Events**: Components can communicate through events without direct references

  ```typescript
  // Publisher
  eventBus.publish("LOCATION_CHANGED", { latitude, longitude });

  // Subscriber
  eventBus.subscribe("LOCATION_CHANGED", (data) => {
    // Handle the event
  });
  ```

### 5. Command Pattern

- **Encapsulate Operations**: Package requests as objects, allowing for flexible handling

  ```typescript
  // Command object
  const changeLocationCommand = {
    type: "CHANGE_LOCATION",
    payload: { latitude, longitude },
  };

  // Command handler
  commandBus.dispatch(changeLocationCommand);
  ```

### 6. Facade Pattern

- **Simplify Complex Subsystems**: Provide a unified interface to a set of interfaces

  ```typescript
  // Facade hiding multiple services
  export class SearchFacade {
    constructor(
      private listingService: ListingService,
      private filterService: FilterService,
      private analyticsService: AnalyticsService
    ) {}

    performSearch(params: SearchParams): Promise<SearchResults> {
      // Coordinates multiple services internally
    }
  }
  ```

### 7. Mediator Pattern

- **Reduce Direct Connections**: Components communicate through a mediator rather than directly
  ```typescript
  // Mediator coordinates component interaction
  export class SearchMediator {
    notifyLocationChanged(location: Location): void {
      // Update relevant components
      this.mapComponent.updateLocation(location);
      this.listingComponent.fetchListingsForLocation(location);
      this.filterComponent.resetFilters();
    }
  }
  ```

### 8. Module Boundaries

- **Explicit Public API**: Each module should have a clear public API
- **Hide Implementation Details**: Internal components should not be accessible outside the module
- **Use Barrel Files**: Export only what's needed from modules

  ```typescript
  // src/modules/searchResult/index.ts
  export { SearchResultService } from "./services/search-result.service";
  export { LocationChangeUseCase } from "./useCases/location-change.usecase";
  export type { SearchParams, SearchResults } from "./types/search.types";

  // Internal implementations remain hidden
  ```

## Project Setup with Dependency Injection

```typescript
// src/shared/di/container.ts
import { Container } from "inversify";
import { IUserRepository } from "@domain/interfaces/user-repository.interface";
import { UserRepositoryImpl } from "@infrastructure/repositories/user-repository.impl";
import { CreateUserUseCase } from "@application/useCases/create-user.use-case";

const container = new Container();

// Infrastructure
container
  .bind<IUserRepository>("IUserRepository")
  .to(UserRepositoryImpl)
  .inSingletonScope();

// Application
container.bind<CreateUserUseCase>("CreateUserUseCase").to(CreateUserUseCase);

export { container };

// React hook for accessing DI container
export function useInjection<T>(identifier: string): T {
  const container = useContext(DiContext);
  return container.get<T>(identifier);
}
```

## Real-world Implementation: SearchResult Module

The `searchResult` module in this project provides a concrete example of layered architecture implementation:

### Folder Structure

```
src/modules/searchResult/
├── commands/           # Command pattern implementations for specific operations
├── infrastructure/     # External implementations of repositories and services
├── mappers/            # Data transformation between layers
├── services/           # Application services
├── shared/             # Cross-cutting utilities
├── types/              # Domain models and interfaces
└── useCases/           # Business logic use cases
```

### Dependencies Flow Example

```typescript
// types/repository.interface.ts (Domain Layer)
export interface ISearchResultRepository {
  getListingsByLocation(
    locationParams: LocationParams
  ): Promise<ListingResults>;
}

// useCases/locationChange/locationChange.usecase.ts (Application Layer)
export class LocationChangeUseCase {
  constructor(
    private repository: ISearchResultRepository,
    private analyticsService: IAnalyticsService
  ) {}

  async execute(
    locationParams: LocationParams
  ): Promise<SearchResultViewModel> {
    // Business logic
    const results = await this.repository.getListingsByLocation(locationParams);
    this.analyticsService.trackLocationChange(locationParams);

    // Transform to view model
    return this.mapToViewModel(results);
  }
}

// infrastructure/searchResultRepositoryImpl.ts (Infrastructure Layer)
export class SearchResultRepositoryImpl implements ISearchResultRepository {
  constructor(private httpClient: IHttpClient) {}

  async getListingsByLocation(
    locationParams: LocationParams
  ): Promise<ListingResults> {
    // External API call implementation
    return this.httpClient.post("/search", locationParams);
  }
}
```

## Benefits

1. **Maintainability**: Changes in one layer have minimal impact on other layers
2. **Testability**: Each layer can be tested in isolation
3. **Scalability**: Layers can be scaled independently
4. **Flexibility**: Implementation details can change without affecting core business logic
5. **Separation of Concerns**: Each layer has specific, well-defined responsibilities
6. **Reusability**: Domain logic can be reused across different interfaces/applications
7. **Onboarding**: New developers can understand the system more easily due to consistent structure

## Common Anti-patterns to Avoid

1. **Layer Skipping**: Don't skip layers in the dependency chain
2. **Domain Layer with External Dependencies**: Domain should never depend on external libraries/frameworks
3. **Business Logic in Infrastructure**: Keep business rules in the domain layer
4. **Circular Dependencies**: Avoid circular dependencies between modules or layers
5. **Fat Controllers/Components**: Don't put business logic in UI components
6. **Leaky Abstractions**: Implementation details should not leak through abstractions
7. **Monolithic Services**: Prefer smaller, focused services over large, do-everything services
