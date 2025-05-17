# Digital Kudos Wall - Backend/Frontend API Contract

This document defines the API contract between the frontend and backend services for the Digital Kudos Wall application.

## Base URL

```
/api/v1
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

## Response Format

All responses follow a standard format:

```json
{
  "success": true|false,
  "data": {}, // Response data (when success is true)
  "error": {  // Error information (when success is false)
    "code": "ERROR_CODE",
    "message": "Error description"
  },
  "pagination": { // Included for paginated responses
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## Error Codes

- `UNAUTHORIZED` - User is not authenticated
- `FORBIDDEN` - User does not have permission
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Input validation failed
- `INTERNAL_ERROR` - Server error

## Endpoints

### Authentication

#### Register User

```
POST /auth/register
```

Request Body:

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "message": "Registration successful. Waiting for admin approval."
  }
}
```

#### Login

```
POST /auth/login
```

Request Body:

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "Admin|User|SuperAdmin",
      "approvalStatus": "Approved"
    }
  }
}
```

#### Logout

```
POST /auth/logout
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

#### Reset Password Request

```
POST /auth/reset-password-request
```

Request Body:

```json
{
  "email": "user@example.com"
}
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "message": "Password reset link sent to email"
  }
}
```

#### Reset Password

```
POST /auth/reset-password
```

Request Body:

```json
{
  "token": "reset_token",
  "password": "newPassword123"
}
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "message": "Password reset successful"
  }
}
```

### User Management

#### Get All Users

```
GET /users
```

Query Parameters:

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `role` (optional): Filter by role
- `approvalStatus` (optional): Filter by approval status

Response (200 OK):

```json
{
  "success": true,
  "data": [
    {
      "id": "user_id_1",
      "email": "user1@example.com",
      "name": "User One",
      "role": "Admin",
      "approvalStatus": "Approved",
      "createdAt": "2023-04-01T12:00:00Z",
      "updatedAt": "2023-04-01T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

#### Get User by ID

```
GET /users/:id
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "Admin",
    "approvalStatus": "Approved",
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T12:00:00Z"
  }
}
```

#### Update User

```
PUT /users/:id
```

Request Body:

```json
{
  "name": "Updated Name",
  "role": "Admin" // Only SuperAdmin can update roles
}
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "Updated Name",
    "role": "Admin",
    "approvalStatus": "Approved",
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T13:00:00Z"
  }
}
```

#### Delete User

```
DELETE /users/:id
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "message": "User deleted successfully"
  }
}
```

#### Approve/Reject User

```
PATCH /users/:id/approval
```

Request Body:

```json
{
  "approvalStatus": "Approved|Rejected",
  "role": "Admin|User" // Required when approving
}
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "message": "User approval status updated"
  }
}
```

### Kudos

#### Create Kudos

```
POST /kudos
```

Request Body:

```json
{
  "recipientName": "Jane Doe",
  "teamName": "Engineering",
  "category": "Helpful",
  "message": "Thanks for helping with the project!"
}
```

Response (201 Created):

```json
{
  "success": true,
  "data": {
    "id": "kudos_id",
    "recipientName": "Jane Doe",
    "teamName": "Engineering",
    "category": "Helpful",
    "message": "Thanks for helping with the project!",
    "createdBy": {
      "id": "user_id",
      "name": "John Doe"
    },
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T12:00:00Z"
  }
}
```

#### Get All Kudos

```
GET /kudos
```

Query Parameters:

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `teamName` (optional): Filter by team name
- `teamId` (optional): Filter by team ID
- `category` (optional): Filter by category name
- `categoryId` (optional): Filter by category ID
- `recipientName` (optional): Filter by recipient name
- `createdBy` (optional): Filter by creator user ID
- `search` (optional): Search in message content
- `startDate` (optional): Filter by date range start
- `endDate` (optional): Filter by date range end
- `sort` (optional): Sort field (default: "createdAt")
- `order` (optional): Sort order ("asc" or "desc", default: "desc")

Response (200 OK):

```json
{
  "success": true,
  "data": [
    {
      "id": "kudos_id",
      "recipientName": "Jane Doe",
      "teamName": "Engineering",
      "category": "Helpful",
      "message": "Thanks for helping with the project!",
      "createdBy": {
        "id": "user_id",
        "name": "John Doe"
      },
      "createdAt": "2023-04-01T12:00:00Z",
      "updatedAt": "2023-04-01T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

#### Get Kudos by ID

```
GET /kudos/:id
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "id": "kudos_id",
    "recipientName": "Jane Doe",
    "teamName": "Engineering",
    "category": "Helpful",
    "message": "Thanks for helping with the project!",
    "createdBy": {
      "id": "user_id",
      "name": "John Doe"
    },
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T12:00:00Z"
  }
}
```

#### Update Kudos

```
PUT /kudos/:id
```

Request Body:

```json
{
  "recipientName": "Jane Doe",
  "teamName": "Engineering",
  "category": "Exceptional",
  "message": "Updated kudos message"
}
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "id": "kudos_id",
    "recipientName": "Jane Doe",
    "teamName": "Engineering",
    "category": "Exceptional",
    "message": "Updated kudos message",
    "createdBy": {
      "id": "user_id",
      "name": "John Doe"
    },
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T13:00:00Z"
  }
}
```

#### Delete Kudos

```
DELETE /kudos/:id
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "message": "Kudos deleted successfully"
  }
}
```

#### Advanced Kudos Filtering

```
POST /kudos/filter
```

Request Body:

```json
{
  "filters": {
    "teams": ["team_id_1", "team_id_2"],
    "categories": ["category_id_1", "category_id_2"],
    "recipients": ["Jane", "John"],
    "createdBy": ["user_id_1", "user_id_2"],
    "dateRange": {
      "start": "2023-01-01T00:00:00Z",
      "end": "2023-12-31T23:59:59Z"
    },
    "keywords": ["helpful", "teamwork", "support"],
    "messageContains": "project"
  },
  "sort": {
    "field": "createdAt",
    "order": "desc"
  },
  "pagination": {
    "page": 1,
    "limit": 20
  }
}
```

Response (200 OK):

```json
{
  "success": true,
  "data": [
    {
      "id": "kudos_id",
      "recipientName": "Jane Doe",
      "teamName": "Engineering",
      "category": "Helpful",
      "message": "Thanks for helping with the project!",
      "createdBy": {
        "id": "user_id",
        "name": "John Doe"
      },
      "createdAt": "2023-04-01T12:00:00Z",
      "updatedAt": "2023-04-01T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "pages": 3
  }
}
```

### Saved Filters

#### Save Filter

```
POST /filters
```

Request Body:

```json
{
  "name": "My Team Kudos",
  "description": "All kudos for the engineering team",
  "filters": {
    "teams": ["team_id_1"],
    "categories": [],
    "recipients": [],
    "dateRange": {
      "start": null,
      "end": null
    }
  },
  "sort": {
    "field": "createdAt",
    "order": "desc"
  }
}
```

Response (201 Created):

```json
{
  "success": true,
  "data": {
    "id": "filter_id",
    "name": "My Team Kudos",
    "description": "All kudos for the engineering team",
    "filters": {
      "teams": ["team_id_1"],
      "categories": [],
      "recipients": [],
      "dateRange": {
        "start": null,
        "end": null
      }
    },
    "sort": {
      "field": "createdAt",
      "order": "desc"
    },
    "userId": "user_id",
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T12:00:00Z"
  }
}
```

#### Get User's Saved Filters

```
GET /filters
```

Response (200 OK):

```json
{
  "success": true,
  "data": [
    {
      "id": "filter_id_1",
      "name": "My Team Kudos",
      "description": "All kudos for the engineering team",
      "createdAt": "2023-04-01T12:00:00Z"
    },
    {
      "id": "filter_id_2",
      "name": "This Month's Appreciation",
      "description": "Kudos from this month",
      "createdAt": "2023-04-10T09:00:00Z"
    }
  ]
}
```

#### Get Saved Filter

```
GET /filters/:id
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "id": "filter_id",
    "name": "My Team Kudos",
    "description": "All kudos for the engineering team",
    "filters": {
      "teams": ["team_id_1"],
      "categories": [],
      "recipients": [],
      "dateRange": {
        "start": null,
        "end": null
      }
    },
    "sort": {
      "field": "createdAt",
      "order": "desc"
    },
    "userId": "user_id",
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T12:00:00Z"
  }
}
```

#### Update Saved Filter

```
PUT /filters/:id
```

Request Body:

```json
{
  "name": "Updated Filter Name",
  "description": "Updated description",
  "filters": {
    "teams": ["team_id_1", "team_id_2"],
    "categories": ["category_id_1"],
    "recipients": ["Jane"]
  },
  "sort": {
    "field": "recipientName",
    "order": "asc"
  }
}
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "id": "filter_id",
    "name": "Updated Filter Name",
    "description": "Updated description",
    "filters": {
      "teams": ["team_id_1", "team_id_2"],
      "categories": ["category_id_1"],
      "recipients": ["Jane"],
      "dateRange": {
        "start": null,
        "end": null
      }
    },
    "sort": {
      "field": "recipientName",
      "order": "asc"
    },
    "userId": "user_id",
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-02T10:30:00Z"
  }
}
```

#### Delete Saved Filter

```
DELETE /filters/:id
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "message": "Filter deleted successfully"
  }
}
```

#### Apply Saved Filter

```
GET /kudos/filter/:filterId
```

Query Parameters:

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

Response (200 OK):

```json
{
  "success": true,
  "data": [
    {
      "id": "kudos_id",
      "recipientName": "Jane Doe",
      "teamName": "Engineering",
      "category": "Helpful",
      "message": "Thanks for helping with the project!",
      "createdBy": {
        "id": "user_id",
        "name": "John Doe"
      },
      "createdAt": "2023-04-01T12:00:00Z",
      "updatedAt": "2023-04-01T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  },
  "filter": {
    "id": "filter_id",
    "name": "My Team Kudos",
    "description": "All kudos for the engineering team"
  }
}
```

### Teams

#### Create Team

```
POST /teams
```

Request Body:

```json
{
  "name": "Engineering",
  "description": "The engineering team"
}
```

Response (201 Created):

```json
{
  "success": true,
  "data": {
    "id": "team_id",
    "name": "Engineering",
    "description": "The engineering team",
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T12:00:00Z"
  }
}
```

#### Get All Teams

```
GET /teams
```

Query Parameters:

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

Response (200 OK):

```json
{
  "success": true,
  "data": [
    {
      "id": "team_id",
      "name": "Engineering",
      "description": "The engineering team",
      "createdAt": "2023-04-01T12:00:00Z",
      "updatedAt": "2023-04-01T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 10,
    "pages": 1
  }
}
```

#### Get Team by ID

```
GET /teams/:id
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "id": "team_id",
    "name": "Engineering",
    "description": "The engineering team",
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T12:00:00Z"
  }
}
```

#### Update Team

```
PUT /teams/:id
```

Request Body:

```json
{
  "name": "Engineering Team",
  "description": "Updated description"
}
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "id": "team_id",
    "name": "Engineering Team",
    "description": "Updated description",
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T13:00:00Z"
  }
}
```

#### Delete Team

```
DELETE /teams/:id
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "message": "Team deleted successfully"
  }
}
```

### Categories

#### Create Category

```
POST /categories
```

Request Body:

```json
{
  "name": "Helpful",
  "description": "For helping others"
}
```

Response (201 Created):

```json
{
  "success": true,
  "data": {
    "id": "category_id",
    "name": "Helpful",
    "description": "For helping others",
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T12:00:00Z"
  }
}
```

#### Get All Categories

```
GET /categories
```

Query Parameters:

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

Response (200 OK):

```json
{
  "success": true,
  "data": [
    {
      "id": "category_id",
      "name": "Helpful",
      "description": "For helping others",
      "createdAt": "2023-04-01T12:00:00Z",
      "updatedAt": "2023-04-01T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "pages": 1
  }
}
```

#### Get Category by ID

```
GET /categories/:id
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "id": "category_id",
    "name": "Helpful",
    "description": "For helping others",
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T12:00:00Z"
  }
}
```

#### Update Category

```
PUT /categories/:id
```

Request Body:

```json
{
  "name": "Very Helpful",
  "description": "Updated description"
}
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "id": "category_id",
    "name": "Very Helpful",
    "description": "Updated description",
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T13:00:00Z"
  }
}
```

#### Delete Category

```
DELETE /categories/:id
```

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "message": "Category deleted successfully"
  }
}
```

### Analytics

#### Get Kudos Statistics

```
GET /analytics/statistics
```

Query Parameters:

- `startDate` (optional): Start date for analysis
- `endDate` (optional): End date for analysis
- `teamName` (optional): Filter by team

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "totalKudos": 250,
    "kudosByTeam": [
      { "team": "Engineering", "count": 120 },
      { "team": "Marketing", "count": 85 },
      { "team": "Sales", "count": 45 }
    ],
    "kudosByCategory": [
      { "category": "Helpful", "count": 100 },
      { "category": "Creative", "count": 75 },
      { "category": "Leader", "count": 75 }
    ],
    "topRecipients": [
      { "name": "Jane Doe", "count": 15 },
      { "name": "John Smith", "count": 12 },
      { "name": "Alice Johnson", "count": 10 }
    ]
  }
}
```

#### Get Time-Based Analysis

```
GET /analytics/time-based
```

Query Parameters:

- `period`: "weekly"|"monthly"|"quarterly"|"yearly"
- `startDate` (optional): Start date for analysis
- `endDate` (optional): End date for analysis
- `teamName` (optional): Filter by team

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "timeSeries": [
      { "period": "2023-W01", "count": 25 },
      { "period": "2023-W02", "count": 30 },
      { "period": "2023-W03", "count": 15 },
      { "period": "2023-W04", "count": 40 }
    ]
  }
}
```

#### Get Trending Keywords

```
GET /analytics/trending-keywords
```

Query Parameters:

- `startDate` (optional): Start date for analysis
- `endDate` (optional): End date for analysis
- `limit` (optional): Number of keywords to return (default: 10)

Response (200 OK):

```json
{
  "success": true,
  "data": {
    "keywords": [
      { "keyword": "help", "count": 45 },
      { "keyword": "project", "count": 38 },
      { "keyword": "support", "count": 25 },
      { "keyword": "teamwork", "count": 22 },
      { "keyword": "dedication", "count": 18 }
    ]
  }
}
```

### Permissions

| Endpoint                    | Super Admin | Admin | User |
| --------------------------- | ----------- | ----- | ---- |
| Auth endpoints              | ✅          | ✅    | ✅   |
| GET /users                  | ✅          | ✅    | ❌   |
| GET /users/:id              | ✅          | ✅    | ❌   |
| PUT/DELETE /users           | ✅          | ❌    | ❌   |
| PATCH /users/:id/approval   | ✅          | ❌    | ❌   |
| GET /kudos                  | ✅          | ✅    | ✅   |
| POST/PUT/DELETE /kudos      | ✅          | ✅    | ❌   |
| POST /kudos/filter          | ✅          | ✅    | ✅   |
| GET /kudos/filter/:filterId | ✅          | ✅    | ✅   |
| Saved filters endpoints     | ✅          | ✅    | ✅   |
| Teams endpoints             | ✅          | ✅    | ❌   |
| Categories endpoints        | ✅          | ✅    | ❌   |
| Analytics endpoints         | ✅          | ✅    | ❌   |

## Rate Limiting

The API implements rate limiting to prevent abuse:

- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated requests

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1615560000
```

## Versioning

The API is versioned in the URL path (/api/v1). Breaking changes will be introduced in new API versions.

## Data Models

### User

```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "role": "SuperAdmin|Admin|User",
  "approvalStatus": "Pending|Approved|Rejected",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Kudos

```json
{
  "id": "string",
  "recipientName": "string",
  "teamName": "string",
  "category": "string",
  "message": "string",
  "createdBy": {
    "id": "string",
    "name": "string"
  },
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Team

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Category

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### SavedFilter

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "filters": {
    "teams": ["string"],
    "categories": ["string"],
    "recipients": ["string"],
    "createdBy": ["string"],
    "dateRange": {
      "start": "datetime|null",
      "end": "datetime|null"
    },
    "keywords": ["string"],
    "messageContains": "string"
  },
  "sort": {
    "field": "string",
    "order": "asc|desc"
  },
  "userId": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```
