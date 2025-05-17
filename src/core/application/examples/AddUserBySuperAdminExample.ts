import { container } from "../../shared/di/container";
import { User } from "../../domain/entities/User";

/**
 * This is an example showing how a super admin can add a new user
 * using the CreateUserUseCase and authorize the user.
 */
export async function addUserBySuperAdmin(): Promise<User> {
  // Get the current logged-in user
  const currentUser = await container.getCurrentUserUseCase.execute();

  // Check if user is super admin
  if (!currentUser || !currentUser.isSuperAdmin()) {
    throw new Error("Only super admins can add new users directly");
  }

  // Define user data
  const userData = {
    email: "newuser@example.com",
    password: "securePassword123",
    name: "New User",
    roleIds: 2, // Assuming roleId 2 is for regular users
  };

  // Create the user
  const newUser = await container.createUserUseCase.execute(userData);

  // Auto-approve the user
  await container.approveRejectUserUseCase.execute(newUser.id, {
    approvalStatus: "Approved",
  });

  return newUser;
}

/**
 * This is an example showing how a super admin can get all users
 * and filter them by role and approval status
 */
export async function getUsersWithFilters(): Promise<User[]> {
  // Get the current logged-in user
  const currentUser = await container.getCurrentUserUseCase.execute();

  // Check if user is super admin
  if (!currentUser || !currentUser.isSuperAdmin()) {
    throw new Error("Only super admins can view all users");
  }

  // Get users with filtering
  const result = await container.getAllUsersUseCase.execute({
    page: 1,
    limit: 10,
    roleId: 2, // Filter by role ID (optional)
    approvalStatus: "Pending", // Filter by approval status (optional)
  });

  return result.users;
}
