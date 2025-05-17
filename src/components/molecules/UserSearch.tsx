import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface UserSearchProps {
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const UserSearch: React.FC<UserSearchProps> = ({
  searchTerm,
  onSearch,
  className = "",
}) => {
  return (
    <div className={`mt-6 relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={onSearch}
        placeholder="Search users by name or email..."
        className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black shadow-sm"
        data-testid="user-search-input"
      />
    </div>
  );
};

export default UserSearch;
