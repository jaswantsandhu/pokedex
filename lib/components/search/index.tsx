import React, { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "lodash";

const Search = ({
  onSearchChange,
}: {
  onSearchChange(search: string): void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchChangeRef = useRef(
    debounce((term) => {
      onSearchChange(term);
    }, 300)
  );

  useEffect(() => {
    const debouncedSearchChange = debouncedSearchChangeRef.current;

    debouncedSearchChange(searchTerm);

    return () => {
      debouncedSearchChange.cancel();
    };
  }, [searchTerm]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex justify-center p-4">
      <div className="relative w-full max-w-xl">
        <input
          id="pokemon-search"
          type="text"
          className="search-input pl-4 pr-4 py-2 w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:border-blue-300"
          aria-label="Search Pokemon"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Search;
