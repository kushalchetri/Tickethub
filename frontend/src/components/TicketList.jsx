import React from 'react';
import { Search, Circle, CheckCircle2, Clock, Menu } from 'lucide-react';

const TicketList = ({ tickets, selectedTicket, onSelectTicket, searchQuery, onSearchChange, onToggleSidebar }) => {
    // Filter Logic
    const filteredTickets = tickets.filter(ticket => {
        const query = searchQuery.toLowerCase();
        return (
            ticket.title.toLowerCase().includes(query) ||
            ticket.customer.name.toLowerCase().includes(query) ||
            ticket.priority.toLowerCase().includes(query) ||
            ticket.status.toLowerCase().includes(query)
        );
    });

    return (
        <div className="w-96 bg-white border-r border-gray-200 h-screen flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                    <button
                        onClick={onToggleSidebar}
                        className="p-1 hover:bg-gray-100 rounded-md text-gray-500 transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <h2 className="text-lg font-semibold text-gray-900">Tickets</h2>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search tickets..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Ticket List */}
            <div className="flex-1 overflow-y-auto">
                {filteredTickets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <Search className="w-12 h-12 mb-4 text-gray-300" />
                        <p className="text-lg font-medium">No tickets found</p>
                        <p className="text-sm">Try adjusting your search terms</p>
                    </div>
                ) : (
                    <div className="p-2">
                        {filteredTickets.map((ticket) => (
                            <TicketItem
                                key={ticket.id}
                                ticket={ticket}
                                isSelected={selectedTicket?.id === ticket.id}
                                onSelect={() => onSelectTicket(ticket)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper Components & Functions
const TicketItem = ({ ticket, isSelected, onSelect }) => (
    <button
        onClick={onSelect}
        className={`w-full text-left p-4 rounded-lg mb-2 border ${isSelected
            ? 'bg-blue-50 border-blue-200 shadow-sm'
            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
    >
        {/* Ticket Header */}
        <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
                <StatusIcon status={ticket.status} />
                <span className="text-xs font-medium text-gray-500">#{ticket.id}</span>
            </div>
            <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority}
            </span>
        </div>

        {/* Ticket Title */}
        <h3 className={`text-sm font-semibold mb-2 line-clamp-2 ${isSelected ? 'text-blue-900' : 'text-gray-900'
            }`}>
            {ticket.title}
        </h3>

        {/* Customer Info */}
        <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                {ticket.customer.avatar}
            </div>
            <span className="text-xs text-gray-600">{ticket.customer.name}</span>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusBadge(ticket.status)}`}>
                {ticket.status}
            </span>
            <span className="text-xs text-gray-500">
                {new Date(ticket.createdAt).toLocaleDateString()}
            </span>
        </div>
    </button>
);

const StatusIcon = ({ status }) => {
    switch (status) {
        case 'Done': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
        case 'In Progress': return <Clock className="w-4 h-4 text-yellow-500" />;
        default: return <Circle className="w-4 h-4 text-gray-400" />;
    }
};

const getPriorityColor = (priority) => {
    const colors = {
        'Urgent': 'text-red-600',
        'High': 'text-yellow-600',
        'Medium': 'text-blue-600',
        'Low': 'text-gray-500',
    };
    return colors[priority] || colors['Low'];
};

const getStatusBadge = (status) => {
    const styles = {
        'To Do': 'bg-gray-100 text-gray-700',
        'In Progress': 'bg-yellow-100 text-yellow-700',
        'Done': 'bg-green-100 text-green-700',
    };
    return styles[status] || styles['To Do'];
};

export default TicketList;
