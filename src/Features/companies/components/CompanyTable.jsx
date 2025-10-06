import React from 'react';

const CompanyTable = ({companies}) => {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full text-left">
                <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Industry</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Employees</th>
                    <th className="px-4 py-2">Founded</th>
                </tr>
                </thead>
                <tbody className="text-sm text-gray-600">
                {companies.length === 0 ? (<tr>
                        <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                            No companies found.
                        </td>
                    </tr>
                ) : (
                    companies.map((c) => (<tr key={c.id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-2 font-medium">{c.name}</td>
                            <td className="px-4 py-2">{c.industry}</td>
                            <td className="px-4 py-2">{c.location}</td>
                            <td className="px-4 py-2">{c.employees}</td>
                            <td className="px-4 py-2">{c.founded}</td>
                        </tr>
                    ))
                )} </tbody>
            </table>
        </div>
    );
};

export default CompanyTable;
