import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CompanyCard from './CompanyCard.jsx';
import { COMPANY_ACTION_TYPES } from '../../../store/companiesReducer.js';
import { getCompanies } from '../../../API/Companies/company_api.js';
import Paginator from '../../../components/Paginator.jsx';
import LoaderSpinner from '../../../components/LoaderSpinner.jsx';
import Filters from './Filters.jsx';

const CompanyContainer = () => {
    const dispatch = useDispatch();
    const {companies, loading, error, pageCount } = useSelector(state => state.companies);
    const [currentPage, setCurrentPage] = useState(0);
    const [filters, setFilters] = useState({
        name: "",
        location: "",
        industry: "",
        employees: "",
        founded: "",
        rating: ""
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [allCompanies, setAllCompanies] = useState([]);
    const PAGE_SIZE = 12;


    const handleSuccess = (data) => {
        const companies = Array.isArray(data) ? data : (data?.companies || []);
        setAllCompanies(companies);
        dispatch({ type: COMPANY_ACTION_TYPES.SET_LOADING, payload: false });
    };

    const handleFailure = () => {
        dispatch({ type: COMPANY_ACTION_TYPES.SET_ERROR, payload: 'Failed to load companies' });
        dispatch({ type: COMPANY_ACTION_TYPES.SET_LOADING, payload: false });
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
            setCurrentPage(0);
        }, 500);
        return () => clearTimeout(handler);
    }, [filters]);


    useEffect(() => {
        dispatch({ type: COMPANY_ACTION_TYPES.SET_LOADING, payload: true });
        getCompanies(handleSuccess, handleFailure);
    }, []);

    useEffect(() => {
        let filtered = [...allCompanies];

        if (debouncedFilters.name) {
            filtered = filtered.filter(company =>
                company.name.toLowerCase().includes(debouncedFilters.name.toLowerCase())
            );
        }

        if (debouncedFilters.location) {
            filtered = filtered.filter(company =>
                company.location.toLowerCase().includes(debouncedFilters.location.toLowerCase())
            );
        }

        if (debouncedFilters.industry) {
            filtered = filtered.filter(company =>
                company.industry.toLowerCase().includes(debouncedFilters.industry.toLowerCase())
            );
        }

        if (debouncedFilters.employees) {
            filtered = filtered.filter(company => {
                const emp = company.employees || 0;
                if (debouncedFilters.employees.includes("+")) {
                    const min = parseInt(debouncedFilters.employees.replace("+", ""), 10);
                    return emp >= min;
                }
                const [min, max] = debouncedFilters.employees.split("-").map(Number);
                return emp >= min && emp <= max;
            });
        }

        if (debouncedFilters.founded) {
            filtered = filtered.filter(company => {
                const year = company.founded || 0;
                switch (debouncedFilters.founded) {
                    case "Before 2000":
                        return year < 2000;
                    case "2000-2010":
                        return year >= 2000 && year <= 2010;
                    case "2011-2020":
                        return year >= 2011 && year <= 2020;
                    case "2021+":
                        return year >= 2021;
                    default:
                        return true;
                }
            });
        }

        if (debouncedFilters.rating) {
            const minRating = parseFloat(debouncedFilters.rating);
            filtered = filtered.filter(company =>
                company.rating >= minRating
            );
        }

        const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
        dispatch({ type: COMPANY_ACTION_TYPES.SET_PAGE_COUNT, payload: totalPages });

        const startIndex = currentPage * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const paginatedData = filtered.slice(startIndex, endIndex);

        dispatch({ type: COMPANY_ACTION_TYPES.SET_COMPANIES, payload: paginatedData });
    }, [allCompanies, debouncedFilters, currentPage]);

    const onPageChange = (clickedData) => setCurrentPage(clickedData.selected);

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    if (error) return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-red-600 text-lg">{error}</p>
        </div>
    );

    return (
        <div className="p-6 min-h-screen flex flex-col">
            <h1 className="text-center mb-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-500 font-semibold">
                Companies Directory
            </h1>
            <Filters filters={filters} onFilterChange={handleFilterChange} />
            <div className="flex-1">
                <div className="min-h-[16rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {loading ? (
                        <div className="col-span-full flex justify-center items-center">
                            <LoaderSpinner />
                        </div>
                    ) : companies.length > 0 ? (
                        companies.map(company => (
                            <CompanyCard key={company.id} company={company} />
                        ))
                    ) : (
                        <div className="col-span-full flex justify-center items-center text-gray-500 text-lg">
                            No matching results found
                        </div>
                    )}
                </div>
            </div>
            {!loading && companies.length > 0 && pageCount > 1 && (
                <div className="mt-6">
                    <Paginator
                        totalPageCount={pageCount}
                        initialPage={currentPage}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default CompanyContainer;
