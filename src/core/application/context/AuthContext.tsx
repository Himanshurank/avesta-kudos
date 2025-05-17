import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { User } from "../../domain/entities/User";
import { container } from "../../infrastructure/di/container";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await container.getCurrentUserUseCase.execute();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await container.loginUseCase.execute(email, password);

      // Check if the response contains an error
      if (response.error || response.success === false) {
        // Show error toast
        toast.error(response.error || "Login failed. Please try again.");
        return false;
      }

      // Success case
      if (response.user) {
        setUser(response.user);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login failed:", error);
      // Show error in toast instead of throwing it
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.";
      toast.error(errorMessage);
      return false;
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      await container.authService.logout();
      setUser(null);
      return true;
    } catch (error) {
      console.error("Logout failed:", error);
      // Show error in toast instead of throwing it
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Logout failed. Please try again.";
      toast.error(errorMessage);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const result = await container.registerUseCase.execute(
        email,
        password,
        name
      );
      return { success: true, message: result.message };
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
