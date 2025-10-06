import React from 'react';
import CustomTextField from '../../../components/CustomTextField.jsx';
import CustomDropdown from '../../../components/CustomDropdown.jsx';

const Filters = ({ filters, onFilterChange }) => {
    const locations = [
        { value: '', label: 'All Locations' },
        { value: 'New York', label: 'New York' },
        { value: 'San Francisco', label: 'San Francisco' },
        { value: 'London', label: 'London' },
    ];

    const industries = [
        { value: '', label: 'All Industries' },
        { value: 'Tech', label: 'Tech' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Healthcare', label: 'Healthcare' },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <CustomTextField
                label="Search by Name"
                value={filters.name}
                onChange={(e) => onFilterChange('name', e.target.value)}
            />
            <CustomDropdown
                options={locations}
                value={filters.location}
                onChange={(val) => onFilterChange('location', val)}
                placeholder="Select Location"
            />
            <CustomDropdown
                options={industries}
                value={filters.industry}
                onChange={(val) => onFilterChange('industry', val)}
                placeholder="Select Industry"
            />
        </div>
    );
};

export default Filters;
