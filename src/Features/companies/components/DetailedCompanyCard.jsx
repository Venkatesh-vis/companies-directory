import React from "react";

const DetailedCompanyCard = ({ company, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-[600px] h-[500px] flex flex-col relative">
                <h2 className="text-center text-xl font-bold mb-1">{company.name}</h2>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl sm:text-2xl"
                >
                    &times;
                </button>
                <div
                    className="overflow-y-auto h-full p-4 pr-2"
                    style={{ scrollbarWidth: "none" }}>
                    <img
                        src={company.image || "https://via.placeholder.com/600x300"}
                        alt={company.name}
                        className="w-full h-40 object-cover rounded-md mb-4"
                    />

                    <p className="text-gray-600 text-sm">
                        {company.location} | {company.industry}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                        Employees: {company.employees} | Founded: {company.founded}
                    </p>
                    <p className="text-gray-500 text-sm">Revenue: {company.revenue}</p>
                    <p className="text-gray-500 text-sm">CEO: {company.ceo}</p>
                    <p className="text-gray-500 text-sm">Phone: {company.phone}</p>
                    <p className="text-gray-500 text-sm">Clients: {company.clients}</p>
                    <p className="text-gray-500 text-sm">Rating: ⭐ {company.rating}</p>

                    <div className="mt-3">
                        <h3 className="text-md font-semibold">About</h3>
                        <p className="text-gray-700 text-sm mt-1">{company.description}</p>
                    </div>

                    {company.services?.length > 0 && (
                        <div className="mt-3">
                            <h3 className="text-md font-semibold">Services</h3>
                            <ul className="list-disc list-inside text-gray-700 text-sm">
                                {company.services.map((service, idx) => (
                                    <li key={idx}>{service}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {company.certifications?.length > 0 && (
                        <div className="mt-3">
                            <h3 className="text-md font-semibold">Certifications</h3>
                            <ul className="list-disc list-inside text-gray-700 text-sm">
                                {company.certifications.map((cert, idx) => (
                                    <li key={idx}>{cert}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-3 flex flex-col text-blue-600 text-sm">
                        {company.website && (
                            <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                {company.website}
                            </a>
                        )}
                        {company.email && (
                            <a href={`mailto:${company.email}`} className="hover:underline">
                                {company.email}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedCompanyCard;
