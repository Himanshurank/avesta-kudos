# HTTP and Config Services Implementation Guide

## Quick Start

1. **Install Dependencies**

```bash
npm install @realestateview/avesta-ui-core
```

2. **Create Config Service**

```typescript
import { IConfigService } from '@realestateview/avesta-ui-core';

export class ConfigService implements IConfigService {
  getAppConfig(): Record<string, any> {
    return {
      internalLancerAPI: 'your-api-base-url',
      database: {
        host: 'your-db-host',
      },
    };
  }

  getApiPaths(): Record<string, any> {
    return {
      // your API paths
    };
  }
}
```

3. **Create HTTP Service**

```typescript
import { IHttpService } from '@realestateview/avesta-ui-core';

export class CoreBackendHttpService implements IHttpService {
  constructor(private readonly config: IConfigService, private readonly headers: Record<string, any>) {}

  async get<T>(aParams: { path: string; queryParams?: Record<string, any> }): Promise<T> {
    const url = `${this.config.getAppConfig().internalLancerAPI}/${aParams.path}`;
    // Implement your HTTP client logic
    return {} as T;
  }

  // Implement other methods similarly
}
```

4. **Create Repository**

```typescript
export abstract class BaseRepository {
  constructor(protected readonly httpService: IHttpService, protected readonly configService: IConfigService) {}
}

export class UserRepository extends BaseRepository {
  private readonly endpoint = 'users';

  async getUsers(): Promise<User[]> {
    return this.httpService.get<User[]>({ path: this.endpoint });
  }
}
```

## Core Interfaces

### IHttpService

```typescript
export interface IHttpService {
  get<T>(aParams: { path: string; queryParams?: Record<string, any> }): Promise<T>;
  post<T>(aParams: { path: string; body: Record<string, any> }): Promise<T>;
  put<T>(aParams: { path: string; body: Record<string, any> }): Promise<T>;
  delete<T>(aParams: { path: string; body: Record<string, any> }): Promise<T>;
}
```

### IConfigService

```typescript
export interface IConfigService {
  getAppConfig(): Record<string, any>;
  getApiPaths(): Record<string, any>;
}
```

## Implementation Details

### HTTP Service Features

- Generic type support for responses
- Query parameter handling
- Error middleware integration
- Header management
- Environment-specific configuration

### Config Service Features

- Centralized configuration management
- API path management
- Environment-specific settings

### Repository Pattern

- Abstract base repository
- Entity-specific repositories
- Type-safe API calls
- Centralized error handling

## Best Practices

1. **Error Handling**

```typescript
try {
  return await this.httpService.get<T>({ path: 'endpoint' });
} catch (error) {
  // Log error
  // Handle specific error cases
  throw error;
}
```

2. **Type Safety**

```typescript
interface User {
  id: string;
  name: string;
}

// Use with generics
const users = await httpService.get<User[]>({ path: 'users' });
```

3. **Configuration Management**

```typescript
// Environment-specific config
const config = {
  development: {
    apiUrl: 'http://localhost:3000',
  },
  production: {
    apiUrl: 'https://api.production.com',
  },
};
```

## Common Use Cases

### 1. Making API Calls

```typescript
// GET request
const data = await httpService.get<ResponseType>({
  path: 'endpoint',
  queryParams: { page: 1 },
});

// POST request
const response = await httpService.post<ResponseType>({
  path: 'endpoint',
  body: { key: 'value' },
});
```

### 2. Repository Implementation

```typescript
export class ProductRepository extends BaseRepository {
  private readonly endpoint = 'products';

  async getProducts(): Promise<Product[]> {
    return this.httpService.get<Product[]>({ path: this.endpoint });
  }

  async createProduct(data: ProductCreateDTO): Promise<Product> {
    return this.httpService.post<Product>({
      path: this.endpoint,
      body: data,
    });
  }
}
```

### 3. Service Layer

```typescript
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(): Promise<Product[]> {
    return this.productRepository.getProducts();
  }
}
```

## Troubleshooting

1. **Common Issues**

   - Missing headers
   - Incorrect API paths
   - Type mismatches
   - Configuration errors

2. **Debug Tips**
   - Check network requests
   - Verify configuration
   - Validate types
   - Check error middleware

## Migration Guide

When migrating to this pattern:

1. Create ConfigService first
2. Implement HTTP service
3. Create base repository
4. Implement entity repositories
5. Update services to use repositories
