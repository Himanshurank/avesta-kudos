import { User } from "../entities/User";

export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  roleIds: number;
  teamId?: string | number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface IUserRepository {
  createUser(data: CreateUserDTO): Promise<User>;
  getAllUsers(params?: {
    page?: number;
    limit?: number;
    roleId?: number;
    approvalStatus?: string;
  }): Promise<{ users: User[]; pagination: PaginationMeta }>;
  getUserById(id: number): Promise<User>;
  updateUser(id: number, data: Partial<CreateUserDTO>): Promise<User>;
  deleteUser(id: number): Promise<{ message: string }>;
  approveRejectUser(
    id: number,
    data: { approvalStatus: "Approved" | "Rejected"; roleIds?: number }
  ): Promise<{ message: string }>;
}
