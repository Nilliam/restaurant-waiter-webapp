import { createContext, useContext, useState } from "react";

type FilterContextType = {
  filter: string;
  updateFilter: (filter: string) => void;
};

const FilterContext = createContext<FilterContextType>({
  filter: "",
  updateFilter: () => {},
});

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }: any) => {
  const [filter, setFilter] = useState<string>("");

  const updateFilter = (filter: string) => {
    setFilter(filter);
  };


  return (
    <FilterContext.Provider
      value={{
        filter,
        updateFilter
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
