import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchIconProps {
  className?: string;
  size?: number;
}

const SearchIcon: React.FC<SearchIconProps> = ({ className = '', size = 20 }) => {
  return (
    <MagnifyingGlassIcon 
      className={`text-gray-500 ${className}`}
      width={size}
      height={size}
      aria-hidden="true"
    />
  );
};

export default SearchIcon; 