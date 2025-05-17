import { BaseRepository } from "../../shared/repositories/BaseRepository";
import { User } from "../../domain/entities/User";
import {
  CreateUserDTO,
  IUserRepository,
  PaginationMeta,
} from "../../domain/interfaces/IUserRepository";

export class UserRepository extends BaseRepository implements IUserRepository {
  async createUser(data: CreateUserDTO): Promise<User> {
    const path = "users";
    const response = await this.httpService.post<{
      success: boolean;
      data: User;
    }>({
      path,
      body: data as unknown as Record<string, unknown>,
    });
    return response.data;
  }

  async getAllUsers(params?: {
    page?: number;
    limit?: number;
    roleId?: number;
    approvalStatus?: string;
  }): Promise<{ users: User[]; pagination: PaginationMeta }> {
    const path = "users";
    const response = await this.httpService.get<{
      success: boolean;
      data: User[];
      pagination: PaginationMeta;
    }>({
      path,
      queryParams: params as Record<string, string | number | boolean>,
    });

    // Return data in the expected format
    return {
      users: response.data,
      pagination: response.pagination,
    };
  }

  async getUserById(id: number): Promise<User> {
    const path = `users/${id}`;
    const response = await this.httpService.get<{
      success: boolean;
      data: User;
    }>({
      path,
    });
    return response.data;
  }

  async updateUser(id: number, data: Partial<CreateUserDTO>): Promise<User> {
    const path = `users/${id}`;
    const response = await this.httpService.put<{
      success: boolean;
      data: User;
    }>({
      path,
      body: data as unknown as Record<string, unknown>,
    });
    return response.data;
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const path = `users/${id}`;
    return this.httpService.delete<{ message: string }>({
      path,
    });
  }

  async approveRejectUser(
    id: number,
    data: { approvalStatus: "Approved" | "Rejected"; roleIds?: number }
  ): Promise<{ message: string }> {
    const path = `users/${id}/approval`;
    const response = await this.httpService.put<{
      success: boolean;
      data: { message: string };
    }>({
      path,
      body: data as unknown as Record<string, unknown>,
    });
    return response.data;
  }
}
