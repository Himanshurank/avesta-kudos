import React, { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

interface SearchBarProps {
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Initial search value
   */
  initialValue?: string;
  /**
   * Callback when search is submitted
   */
  onSearch: (value: string) => void;
  /**
   * Should search on input change
   */
  searchOnChange?: boolean;
  /**
   * Debounce time in milliseconds for searchOnChange
   */
  debounceTime?: number;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Is compact version
   */
  compact?: boolean;
  /**
   * Test ID for testing
   */
  testId?: string;
}

const SearchBar = (props: SearchBarProps) => {
  const {
    placeholder = 'Search...',
    initialValue = '',
    onSearch,
    searchOnChange = false,
    debounceTime = 300,
    className = '',
    compact = false,
    testId = 'search-bar',
  } = props;

  const [searchValue, setSearchValue] = useState(initialValue);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (searchOnChange) {
      if (timer) {
        clearTimeout(timer);
      }

      const newTimer = setTimeout(() => {
        onSearch(value);
      }, debounceTime);

      setTimer(newTimer);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  // Search icon SVG
  const SearchIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  // Clear icon SVG
  const ClearIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  return (
    <form
      className={`${className}`}
      onSubmit={handleSubmit}
      data-testid={testId}
    >
      <div className="relative flex w-full">
        <Input
          type="search"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
          icon={<SearchIcon />}
          iconPosition="left"
          className={`${compact ? 'py-1.5' : 'py-2'} pr-10`}
          testId={`${testId}-input`}
        />

        {searchValue && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            onClick={handleClear}
            data-testid={`${testId}-clear`}
          >
            <ClearIcon />
          </button>
        )}

        {!searchOnChange && (
          <Button
            type="submit"
            className={`ml-2 ${compact ? 'py-1.5 px-3' : ''}`}
            testId={`${testId}-button`}
          >
            Search
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchBar; 