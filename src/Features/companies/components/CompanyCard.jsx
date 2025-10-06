import React, { useState, useRef, useEffect } from 'react';
import DetailedPreview from "./DetailedPreview.jsx";
import DetailedCompanyCard from "./DetailedCompanyCard.jsx";

const CompanyCard = ({ company }) => {
    const [showPreview, setShowPreview] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const descRef = useRef(null);

    const togglePreview = (e) => {
        e.stopPropagation();
        setShowPreview(prev => !prev);
    };

    const toggleDetails = () => setShowDetails(prev => !prev);

    useEffect(() => {
        if (descRef.current) {
            const lineHeight = parseInt(window.getComputedStyle(descRef.current).lineHeight, 10);
            const totalLines = Math.floor(descRef.current.scrollHeight / lineHeight);
            setShowReadMore(totalLines > 3);
        }
    }, [company.description]);

    return (
        <>
            <div
                className="relative border rounded-lg shadow hover:shadow-lg cursor-pointer transition p-4 flex flex-col items-center text-center bg-white"
                onClick={toggleDetails}
            >
                <img
                    src={company.image || 'https://via.placeholder.com/600x300'}
                    alt={company.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                />

                <h2 className="text-lg font-semibold mb-1">{company.name}</h2>

                <p className="text-gray-600 text-sm">{company.location} | {company.industry}</p>

                <p className="text-gray-500 text-sm mt-1">
                    Employees: {company.employees} | Founded: {company.founded}
                </p>

                {company.description && (
                    <div className="text-gray-700 text-sm mt-2 w-full">
                        <p
                            ref={descRef}
                            className="line-clamp-3 overflow-hidden"
                        >
                            {company.description}
                        </p>
                        {showReadMore && (
                            <span
                                onClick={togglePreview}
                                className="text-blue-500 cursor-pointer ml-1 hover:underline"
                            >
                                Read more
                            </span>
                        )}
                    </div>
                )}

                <div className="flex flex-col mt-2 text-blue-600 text-sm">
                    {company.website && (
                        <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                            onClick={(e) => e.stopPropagation()} // prevent popup on link click
                        >
                            {company.website}
                        </a>
                    )}
                    {company.email && (
                        <a
                            href={`mailto:${company.email}`}
                            className="hover:underline"
                            onClick={(e) => e.stopPropagation()} // prevent popup on link click
                        >
                            {company.email}
                        </a>
                    )}
                </div>
            </div>

            {showPreview && <DetailedPreview company={company} togglePopup={togglePreview} />}
            {showDetails && <DetailedCompanyCard company={company} onClose={toggleDetails} />}
        </>
    );
};

export default CompanyCard;
