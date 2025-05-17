import React, { useState } from 'react';
import SearchInput from '../components/molecules/SearchInput/SearchInput';

const SearchExample: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    // Simulate a search with fake results
    console.log('Searching for:', value);
    
    // Simulate API call delay
    setTimeout(() => {
      const fakeResults = [
        `Result 1 for "${value}"`,
        `Result 2 for "${value}"`,
        `Result 3 for "${value}"`,
        `Result 4 for "${value}"`,
      ];
      setSearchResults(fakeResults);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Search Example</h1>
      
      <div className="mb-8">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          placeholder="Search for anything..."
        />
      </div>
      
      {searchResults.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Search Results</h2>
          <ul className="border rounded-lg divide-y">
            {searchResults.map((result, index) => (
              <li 
                key={index} 
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchExample; 