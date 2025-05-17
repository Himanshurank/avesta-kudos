/**
 * A stub implementation of IUserRepository that also acts as a spy.
 * This is a combined stub/spy test double for testing purposes.
 */
import { User } from "../domain/entities/User";
import {
  CreateUserDTO,
  IUserRepository,
  PaginationMeta,
} from "../domain/interfaces/IUserRepository";

export class UserRepositoryStub implements IUserRepository {
  // Spy properties for approveRejectUser
  approveRejectUserWasCalled = false;
  approveRejectUserWasCalledWith: {
    id: number;
    data: { approvalStatus: "Approved" | "Rejected"; roleIds?: number };
  } = {
    id: 0,
    data: { approvalStatus: "Approved" },
  };

  // Spy properties for createUser
  createUserWasCalled = false;
  createUserWasCalledWith: CreateUserDTO | null = null;

  // Stub behavior
  approveRejectUserReturnValue: { message: string } = { message: "" };
  createUserReturnValue: User = new User(
    1,
    "test@example.com",
    "Test User",
    [{ id: 1, name: "USER" }],
    "Pending",
    new Date(),
    new Date()
  );

  // Stub implementation for approveRejectUserpx
  async approveRejectUser(
    id: number,
    data: { approvalStatus: "Approved" | "Rejected"; roleIds?: number }
  ): Promise<{ message: string }> {
    this.approveRejectUserWasCalled = true;
    this.approveRejectUserWasCalledWith = { id, data };
    return this.approveRejectUserReturnValue;
  }

  // Stub implementation for createUser
  async createUser(data: CreateUserDTO): Promise<User> {
    this.createUserWasCalled = true;
    this.createUserWasCalledWith = data;
    return this.createUserReturnValue;
  }

  // Implemented to satisfy interface but not used in these tests
  async getAllUsers(params?: {
    page?: number;
    limit?: number;
    roleId?: number;
    approvalStatus?: string;
  }): Promise<{ users: User[]; pagination: PaginationMeta }> {
    // Return mock data to satisfy the interface
    return {
      users: [],
      pagination: {
        total: 0,
        page: params?.page || 1,
        limit: params?.limit || 10,
        pages: 1,
      },
    };
  }

  async getUserById(): Promise<User> {
    // Always return a user to satisfy the interface
    return this.createUserReturnValue;
  }

  async updateUser(): Promise<User> {
    // Unused parameters but kept for interface compatibility
    return this.createUserReturnValue;
  }

  async deleteUser(): Promise<{ message: string }> {
    // Unused parameter but kept for interface compatibility
    return { message: "User deleted" };
  }
}
