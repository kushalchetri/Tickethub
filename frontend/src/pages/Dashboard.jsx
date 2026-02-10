import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import TicketList from '../components/TicketList';
import TicketDetails from '../components/TicketDetails';
import TicketMetaPanel from '../components/TicketMetaPanel';

const Dashboard = () => {
    // UI State
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Data State
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/tickets');
            setTickets(response.data);

            // Auto-select first ticket if available
            if (response.data.length > 0) {
                setSelectedTicket(response.data[0]);
            }
            setError(null);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to connect to the backend server.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateTicket = (updatedTicket) => {
        setTickets(prev => prev.map(t =>
            t.id === updatedTicket.id ? updatedTicket : t
        ));

        if (selectedTicket?.id === updatedTicket.id) {
            setSelectedTicket(updatedTicket);
        }
    };

    if (loading) return <LoadingView />;
    if (error) return <ErrorView message={error} onRetry={fetchTickets} />;

    return (
        <div className="flex h-screen bg-gray-50 relative">
            <div
                className={`flex-shrink-0 bg-white h-screen transition-all duration-300 ease-in-out overflow-hidden border-r border-gray-200 ${sidebarOpen ? 'w-64' : 'w-0 border-none'
                    }`}
            >
                <div className="w-64">
                    <Sidebar />
                </div>
            </div>

            <TicketList
                tickets={tickets}
                selectedTicket={selectedTicket}
                onSelectTicket={setSelectedTicket}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />

            <TicketDetails
                ticket={selectedTicket}
                onUpdateTicket={handleUpdateTicket}
            />

            <TicketMetaPanel
                ticket={selectedTicket}
                onUpdateTicket={handleUpdateTicket}
            />
        </div>
    );
};

// Helper Components
const LoadingView = () => (
    <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Loading tickets...</p>
        </div>
    </div>
);

const ErrorView = ({ message, onRetry }) => (
    <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Error</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
                onClick={onRetry}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
                Retry Request
            </button>
        </div>
    </div>
);

export default Dashboard;
