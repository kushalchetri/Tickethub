import React from 'react';
import { Calendar, Tag, User, AlertCircle } from 'lucide-react';

const TicketMetaPanel = ({ ticket, onUpdateTicket }) => {
    if (!ticket) return null;

    const handleChange = (field, value) => {
        onUpdateTicket({
            ...ticket,
            [field]: value
        });
    };

    return (
        <div className="w-80 bg-white border-l border-gray-200 h-screen overflow-y-auto">
            <div className="p-6 space-y-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Ticket Properties</h3>

                {/* Priority */}
                <PropertySelect
                    label="Priority"
                    icon={<AlertCircle className="w-4 h-4" />}
                    value={ticket.priority}
                    onChange={(e) => handleChange('priority', e.target.value)}
                    options={['Low', 'Medium', 'High', 'Urgent']}
                    colorClass={getPriorityColor(ticket.priority)}
                />

                {/* Status */}
                <PropertySelect
                    label="Status"
                    icon={<div className="w-4 h-4 rounded-full border-2 border-current" />}
                    value={ticket.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    options={['To Do', 'In Progress', 'Done', 'Closed']}
                    colorClass={getStatusColor(ticket.status)}
                />

                {/* Assigned To */}
                <PropertySelect
                    label="Assigned To"
                    icon={<User className="w-4 h-4" />}
                    value={ticket.assignee}
                    onChange={(e) => handleChange('assignee', e.target.value)}
                    options={['Sarah Chen', 'Mike Johnson', 'Alex Rivera', 'Unassigned']}
                    colorClass="bg-white border-gray-300"
                />

                {/* Tags */}
                <div>
                    <Label icon={<Tag className="w-4 h-4" />} text="Tags" />
                    <div className="flex flex-wrap gap-2">
                        {ticket.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Due Date */}
                <div>
                    <Label icon={<Calendar className="w-4 h-4" />} text="Due Date" />
                    <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                        <p className="text-sm text-gray-900">
                            {formatDate(ticket.dueDate)}
                        </p>
                    </div>
                </div>

                {/* Created Date */}
                <div>
                    <label className="text-xs font-medium text-gray-700 mb-2 block">Created</label>
                    <p className="text-sm text-gray-600">
                        {formatDate(ticket.createdAt, true)}
                    </p>
                </div>
            </div>
        </div>
    );
};

// Helper Components & Functions
const Label = ({ icon, text }) => (
    <label className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-2">
        {icon}
        {text}
    </label>
);

const PropertySelect = ({ label, icon, value, onChange, options, colorClass }) => (
    <div>
        <Label icon={icon} text={label} />
        <select
            value={value}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${colorClass}`}
        >
            {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

const formatDate = (dateString, includeTime = false) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        ...(includeTime && { hour: '2-digit', minute: '2-digit' })
    });
};

const getPriorityColor = (priority) => {
    const colors = {
        'Urgent': 'bg-red-100 text-red-700 border-red-200',
        'High': 'bg-yellow-100 text-yellow-700 border-yellow-200',
        'Medium': 'bg-blue-100 text-blue-700 border-blue-200',
        'Low': 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return colors[priority] || colors['Low'];
};

const getStatusColor = (status) => {
    const colors = {
        'To Do': 'bg-gray-100 text-gray-700 border-gray-200',
        'In Progress': 'bg-yellow-100 text-yellow-700 border-yellow-200',
        'Done': 'bg-green-100 text-green-700 border-green-200',
    };
    return colors[status] || colors['To Do'];
};

export default TicketMetaPanel;
