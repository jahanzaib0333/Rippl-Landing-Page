import React, { useState, useEffect } from 'react';

interface Signup {
    name: string;
    email: string;
    inspirationOptIn: boolean;
    date: string;
}

interface AdminPageProps {
    onGoHome: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onGoHome }) => {
    const [signups, setSignups] = useState<Signup[]>([]);

    useEffect(() => {
        try {
            const storedSignups = JSON.parse(localStorage.getItem('rippl_signups') || '[]');
            setSignups(storedSignups);
        } catch (e) {
            console.error("Could not retrieve from local storage", e);
            setSignups([]);
        }
    }, []);

    const handleClear = () => {
        if (window.confirm('Are you sure you want to delete all signup entries? This cannot be undone.')) {
            localStorage.removeItem('rippl_signups');
            setSignups([]);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-100 text-slate-800 p-4 sm:p-6 md:p-8">
            <div className="container mx-auto max-w-4xl">
                <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900">Admin Panel</h1>
                        <p className="text-slate-600">Waitlist Signups ({signups.length})</p>
                    </div>
                    <div className="flex gap-4 mt-4 sm:mt-0">
                         <button 
                            onClick={handleClear} 
                            disabled={signups.length === 0}
                            className="px-4 py-2 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors"
                        >
                            Clear Signups
                        </button>
                        <button 
                            onClick={onGoHome} 
                            className="px-4 py-2 rounded-lg font-semibold bg-slate-700 text-white hover:bg-slate-800 transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>
                </header>
                
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        {signups.length > 0 ? (
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="p-4 font-semibold text-sm text-slate-600">Name</th>
                                        <th className="p-4 font-semibold text-sm text-slate-600">Email</th>
                                        <th className="p-4 font-semibold text-sm text-slate-600 text-center">Inspiration Opt-in</th>
                                        <th className="p-4 font-semibold text-sm text-slate-600">Signup Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {signups.map((signup, index) => (
                                        <tr key={index} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50 transition-colors">
                                            <td className="p-4 whitespace-nowrap">{signup.name}</td>
                                            <td className="p-4 whitespace-nowrap text-cyan-600 font-medium">{signup.email}</td>
                                            <td className="p-4 whitespace-nowrap text-center">
                                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${signup.inspirationOptIn ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                                                    {signup.inspirationOptIn ? 'YES' : 'NO'}
                                                </span>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-slate-500">{signup.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center p-12">
                                <p className="text-slate-500 text-lg">No signups yet.</p>
                                <p className="text-slate-400 mt-2">Go back to the homepage and fill out the form to see entries here!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;