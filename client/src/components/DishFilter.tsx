import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Option,
  Input,
  Button,
  makeStyles,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  filterContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "1rem",
    flexWrap: "wrap", // For responsiveness
    alignItems: "center",
  },
  dropdownField: {
    minWidth: "220px",
  },
  inputField: {
    minWidth: "200px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "1rem",
  },
  clearButton: {
    display: "none", // Hidden by default, shown conditionally
  },
  showClearButton: {
    display: "inline-block", // Shown when a filter is applied
  },
});

interface FilterProps {
  onFilterChange: (filters: {
    diet: string;
    course: string;
    region: string;
    cook_time: { gte: string; lte: string };
  }) => void;
}

const DishFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    diet: "",
    course: "",
    region: "",
    cook_time: { gte: "", lte: "" },
  });
  const styles = useStyles();

  // Track whether any filter has been applied
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  // Update filter and pass the data to parent component
  const handleFilterChange = (field: string, value: string | undefined) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    setIsFilterApplied(
      !!value ||
        !!filters.course ||
        !!filters.region ||
        !!filters.cook_time.gte ||
        !!filters.cook_time.lte
    );
  };

  const handleCookTimeChange = (field: string, value: string) => {
    const updatedCookTime = { ...filters.cook_time, [field]: value };
    setFilters((prev) => ({ ...prev, cook_time: updatedCookTime }));
    setIsFilterApplied(
      !!updatedCookTime.gte ||
        !!updatedCookTime.lte ||
        !!filters.diet ||
        !!filters.course ||
        !!filters.region
    );
  };

  // Apply filter button clicked
  const handleApplyFilters = () => {
    onFilterChange(filters); // Pass updated filters to parent component
  };

  // Clear filter button clicked
  const handleClearFilters = () => {
    const clearedFilters = {
      diet: "",
      course: "",
      region: "",
      cook_time: { gte: "", lte: "" },
    };
    setFilters(clearedFilters);
    setIsFilterApplied(false); // Reset filter applied state
    onFilterChange(clearedFilters); // Reset filters in parent component
  };

  return (
    <div>
      <div className={styles.filterContainer}>
        {/* Diet Filter */}
        <Dropdown
          className={styles.dropdownField}
          placeholder="Select Diet"
          value={filters.diet}
          onOptionSelect={(e, data) =>
            handleFilterChange("diet", data.optionValue)
          }
        >
          <Option key="all" value="">
            All
          </Option>
          <Option key="vegetarian" value="Vegetarian">
            Vegetarian
          </Option>
          <Option key="non-vegeterian" value="Non Vegetarian">
            Non Vegetarian
          </Option>
        </Dropdown>

        {/* Course Filter */}
        <Dropdown
          className={styles.dropdownField}
          placeholder="Select Course"
          value={filters.course}
          onOptionSelect={(e, data) =>
            handleFilterChange("course", data.optionValue)
          }
        >
          <Option value="">All</Option>
          <Option value="Starter">Starter</Option>
          <Option value="Main Course">Main Course</Option>
          <Option value="Dessert">Dessert</Option>
        </Dropdown>

        {/* Region Filter */}
        <Dropdown
          className={styles.dropdownField}
          placeholder="Select Region"
          value={filters.region}
          onOptionSelect={(e, data) =>
            handleFilterChange("region", data.optionValue)
          }
        >
          <Option value="">All</Option>
          <Option value="North">North</Option>
          <Option value="South">South</Option>
          <Option value="East">East</Option>
          <Option value="West">West</Option>
        </Dropdown>

        {/* Cook Time Filter */}
        <Input
          className={styles.inputField}
          type="number"
          value={filters.cook_time.gte}
          placeholder="Min Cook Time (min)"
          onChange={(e) => handleCookTimeChange("gte", e.target.value)}
        />
        <Input
          className={styles.inputField}
          type="number"
          value={filters.cook_time.lte}
          placeholder="Max Cook Time (min)"
          onChange={(e) => handleCookTimeChange("lte", e.target.value)}
        />
        <Button
          appearance="primary"
          shape="circular"
          onClick={handleApplyFilters}
        >
          Filter
        </Button>

        {/* Show Clear Filter button only if any filter is applied */}
        <Button
          appearance="outline"
          shape="circular"
          className={
            isFilterApplied ? styles.showClearButton : styles.clearButton
          }
          onClick={handleClearFilters}
        >
          Clear Filter
        </Button>
      </div>

      {/* Filter and Clear Filter Buttons */}
      <div className={styles.buttonContainer}></div>
    </div>
  );
};

export default DishFilter;
