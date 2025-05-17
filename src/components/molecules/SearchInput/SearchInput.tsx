import React, { useState } from 'react';
import Input from '../../atoms/Input/Input';
import SearchIcon from '../../atoms/Icons/SearchIcon';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onSearch?: (value: string) => void;
  disabled?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  value: propValue,
  onChange: propOnChange,
  className = '',
  onSearch,
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState('');
  
  // Use either the controlled value from props or the internal state
  const value = propValue !== undefined ? propValue : internalValue;
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (propOnChange) {
      propOnChange(event);
    } else {
      setInternalValue(event.target.value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onSearch && value) {
      onSearch(value);
    }
  };

  const handleSearchClick = () => {
    if (onSearch && value) {
      onSearch(value);
    }
  };

  return (
    <div className="flex items-center w-full">
      <div className="relative flex-grow">
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          icon={<SearchIcon size={18} className="text-indigo-500" />}
          iconPosition="left"
          className={`pr-12 ${className}`}
          onKeyDown={handleKeyDown}
          testId="search-input"
        />
        <button
          onClick={handleSearchClick}
          disabled={disabled || !value}
          className={`absolute right-0 top-0 h-full px-3 flex items-center justify-center text-white rounded-r-md
            ${disabled || !value 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-indigo-500 hover:bg-indigo-600 transition-colors'}`}
          aria-label="Search"
          data-testid="search-button"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput; 