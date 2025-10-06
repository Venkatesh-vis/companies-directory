import React from "react";
import CustomTextField from "../../../components/CustomTextField.jsx";
import CustomDropdown from "../../../components/CustomDropdown.jsx";

const Filters = ({ filters, onFilterChange }) => {
    const locations = [
        { value: "", label: "All Locations" },
        { value: "New York", label: "New York" },
        { value: "San Francisco", label: "San Francisco" },
        { value: "London", label: "London" },
        { value: "Pune", label: "Pune" },
    ];

    const industries = [
        { value: "", label: "All Industries" },
        { value: "Tech", label: "Tech" },
        { value: "Finance", label: "Finance" },
        { value: "Healthcare", label: "Healthcare" },
        { value: "Education", label: "Education" },
    ];

    const employeeRanges = [
        { value: "", label: "All Sizes" },
        { value: "0-50", label: "0-50" },
        { value: "51-200", label: "51-200" },
        { value: "201-1000", label: "201-1000" },
        { value: "1000+", label: "1000+" },
    ];

    const foundedYears = [
        { value: "", label: "All Years" },
        { value: "Before 2000", label: "Before 2000" },
        { value: "2000-2010", label: "2000-2010" },
        { value: "2011-2020", label: "2011-2020" },
        { value: "2021+", label: "2021+" },
    ];

    const ratings = [
        { value: "", label: "All Ratings" },
        { value: "4.5+", label: "⭐ 4.5+" },
        { value: "4+", label: "⭐ 4+" },
        { value: "3+", label: "⭐ 3+" },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Name Search */}
            <CustomTextField
                label="Search by Name"
                value={filters.name}
                onChange={(e) => onFilterChange("name", e.target.value)}
            />

            {/* Location */}
            <CustomDropdown
                options={locations}
                value={filters.location}
                onChange={(val) => onFilterChange("location", val)}
                placeholder="Select Location"
            />

            {/* Industry */}
            <CustomDropdown
                options={industries}
                value={filters.industry}
                onChange={(val) => onFilterChange("industry", val)}
                placeholder="Select Industry"
            />

            {/* Employees */}
            <CustomDropdown
                options={employeeRanges}
                value={filters.employees}
                onChange={(val) => onFilterChange("employees", val)}
                placeholder="Employees"
            />

            {/* Founded Year */}
            <CustomDropdown
                options={foundedYears}
                value={filters.founded}
                onChange={(val) => onFilterChange("founded", val)}
                placeholder="Founded Year"
            />

            {/* Ratings */}
            <CustomDropdown
                options={ratings}
                value={filters.rating}
                onChange={(val) => onFilterChange("rating", val)}
                placeholder="Minimum Rating"
            />
        </div>
    );
};

export default Filters;
