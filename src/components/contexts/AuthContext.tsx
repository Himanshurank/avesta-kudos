import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { User } from "@/core/domain/entities/User";
import { useRouter } from "next/router";
import { container } from "@/core/shared/di/container";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; message: string }>;
  resetPasswordRequest: (
    email: string
  ) => Promise<{ success: boolean; message: string }>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch the current user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const currentUser = await container.getCurrentUserUseCase.execute();
        setUser(currentUser);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await container.loginUseCase.execute(email, password);

      if (response.success === false || !response.data.user) {
        setError(response.error || "Login failed");
        return false;
      }

      setUser(response.data.user);
      setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<boolean> => {
    setLoading(true);
    try {
      await container.authService.logout();
      setUser(null);
      router.push("/auth/login");
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const response = await container.registerUseCase.execute(
        email,
        password,
        name
      );
      setError(null);
      return { success: true, message: response.message };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Reset Password Request function
  const resetPasswordRequest = async (email: string) => {
    setLoading(true);
    try {
      const response = await container.resetPasswordRequestUseCase.execute(
        email
      );
      setError(null);
      return { success: true, message: response.message };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Password reset request failed";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const authContextValue = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    resetPasswordRequest,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
