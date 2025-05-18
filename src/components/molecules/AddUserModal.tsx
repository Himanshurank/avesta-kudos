import React, { useState, useEffect } from "react";
import Modal from "../atoms/Modal";
import Input from "../atoms/Input";
import toast from "react-hot-toast";
import { TeamValue } from "@/shared/enums";
import { container } from "@/core/shared/di/container";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (userData: UserFormData) => void;
  onEditUser?: (userId: number, userData: UserFormData) => void;
  initialData?: UserFormData & { id?: number };
  mode?: "add" | "edit";
}

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: number | string;
  status: string;
  team: number | string;
}

interface Team {
  id: string;
  name: string;
  description: string;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
  onEditUser,
  initialData,
  mode = "add",
}) => {
  const [formData, setFormData] = useState<UserFormData & { id?: number }>({
    name: "",
    email: "",
    password: "",
    role: "User",
    status: "Active",
    team: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoadingTeams, setIsLoadingTeams] = useState(false);

  // Fetch teams when modal is opened
  useEffect(() => {
    if (isOpen) {
      fetchTeams();
    }
  }, [isOpen]);

  const fetchTeams = async () => {
    setIsLoadingTeams(true);
    try {
      const response = await container.httpService.get<{
        success: boolean;
        data: Team[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          pages: number;
        };
      }>({
        path: container.configService.getApiPaths().teams.getAll,
        queryParams: {
          page: 1,
          limit: 100,
        },
      });

      setTeams(response.data || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
      toast.error("Failed to load teams. Using default values.");
    } finally {
      setIsLoadingTeams(false);
    }
  };

  // Update form data when initialData changes or mode changes
  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData({
        ...initialData,
        // Don't overwrite with empty password in edit mode
        password: "",
        // Set default team if not provided
        team: initialData.team || TeamValue.ENGINEERING,
      });
    } else {
      // Reset form for add mode
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "User",
        status: "Active",
        team: TeamValue.ENGINEERING,
      });
    }
  }, [initialData, mode, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error when user types
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Only validate password in add mode or if password is provided in edit mode
    if (mode === "add" && !formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.trim() && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      if (mode === "edit" && onEditUser && formData.id) {
        // Call edit handler with ID and form data
        onEditUser(formData.id, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          status: formData.status,
          team: formData.team,
        });
        toast.success("User updated successfully");
      } else {
        // Call add handler with form data
        onAddUser(formData);
        toast.success("User added successfully");
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "User",
        status: "Active",
        team: TeamValue.ENGINEERING,
      });

      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "add" ? "Add New User" : "Edit User"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            testId="user-name-input"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            testId="user-email-input"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {mode === "add"
              ? "Password"
              : "Password (leave blank to keep current)"}
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            testId="user-password-input"
          />
        </div>

        <div>
          <label
            htmlFor="team"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Team
          </label>
          <select
            id="team"
            value={formData.team}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoadingTeams}
          >
            {isLoadingTeams ? (
              <option>Loading teams...</option>
            ) : teams.length > 0 ? (
              <>
                <option value="">Select team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </>
            ) : null}
          </select>
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Role
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Super Admin">Super Admin</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {mode === "add" ? "Add User" : "Update User"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserModal;
