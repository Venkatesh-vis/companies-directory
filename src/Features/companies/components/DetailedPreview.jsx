import React from 'react';


const DetailedPreview = ({company, togglePopup}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg relative">
                <button
                    onClick={togglePopup}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✖
                </button>

                <div className="flex items-center gap-4 mb-4">
                    <img
                        src={company.image || 'https://via.placeholder.com/150'}
                        alt={company.name}
                        className="w-20 h-20 object-cover rounded-full"
                    />
                    <div>
                        <h2 className="text-xl font-semibold">{company.name}</h2>
                        {company.email && (
                            <a
                                href={`mailto:${company.email}`}
                                className="text-blue-600 text-sm hover:underline"
                            >
                                {company.email}
                            </a>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed">
                    {company.description}
                </p>
            </div>
        </div>
    )
}

export default DetailedPreview;