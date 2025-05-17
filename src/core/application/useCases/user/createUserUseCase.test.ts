import { describe, it, expect, beforeEach } from '@jest/globals';
import { CreateUserUseCase } from './CreateUserUseCase';
import { UserRepositoryStub } from '../../../../__tests__/mocks/UserRepositoryStub';
import { User } from '../../../domain/entities/User';

describe('CreateUserUseCase', () => {
  // System under test
  let createUserUseCase: CreateUserUseCase;
  
  // Test doubles
  let userRepositoryStub: UserRepositoryStub;
  
  // Test data
  const newUserData = {
    email: 'newuser@example.com',
    name: 'New User',
    password: 'Password123',
    roleIds: 1, // USER role
  };

  const mockUser = new User(
    1,
    newUserData.email,
    newUserData.name,
    [{ id: 1, name: 'USER' }],
    'Pending',
    new Date(),
    new Date()
  );
  
  beforeEach(() => {
    // Create fresh test doubles before each test
    userRepositoryStub = new UserRepositoryStub();
    
    // Create the system under test with test doubles
    createUserUseCase = new CreateUserUseCase(userRepositoryStub);
  });

  it('should successfully create a user', async () => {
    // Arrange
    userRepositoryStub.createUserReturnValue = mockUser;
    
    // Act
    const result = await createUserUseCase.execute(newUserData);
    
    // Assert
    expect(result).toEqual(mockUser);
    expect(result.email).toBe(newUserData.email);
    expect(result.name).toBe(newUserData.name);
    
    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.createUserWasCalled).toBe(true);
    expect(userRepositoryStub.createUserWasCalledWith).toEqual(newUserData);
  });

  it('should handle errors when creating a user', async () => {
    // Arrange
    const errorMessage = 'Email already exists';
    userRepositoryStub.createUser = async (data) => {
      userRepositoryStub.createUserWasCalled = true;
      userRepositoryStub.createUserWasCalledWith = data;
      throw new Error(errorMessage);
    };
    
    // Act and Assert
    await expect(createUserUseCase.execute(newUserData)).rejects.toThrow(errorMessage);
    
    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.createUserWasCalled).toBe(true);
    expect(userRepositoryStub.createUserWasCalledWith).toEqual(newUserData);
  });

  it('should create a user with default approval status', async () => {
    // Arrange
    const userWithStatus = new User(
      1,
      newUserData.email,
      newUserData.name,
      [{ id: 1, name: 'USER' }],
      'Pending', // Default approval status
      new Date(),
      new Date()
    );
    userRepositoryStub.createUserReturnValue = userWithStatus;
    
    // Act
    const result = await createUserUseCase.execute(newUserData);
    
    // Assert
    expect(result.approvalStatus).toBe('Pending');
    
    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.createUserWasCalled).toBe(true);
    expect(userRepositoryStub.createUserWasCalledWith).toEqual(newUserData);
  });
}); 