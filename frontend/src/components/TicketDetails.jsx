import React, { useState } from 'react';
import { User, Lock, Send } from 'lucide-react';

const TicketDetails = ({ ticket, onUpdateTicket }) => {
    const [activeTab, setActiveTab] = useState('public');
    const [replyText, setReplyText] = useState('');

    if (!ticket) return <EmptyState />;

    const handleSendReply = () => {
        if (!replyText.trim()) return;

        const newMessage = {
            id: ticket.conversation.length + 1,
            type: activeTab === 'public' ? 'agent' : 'internal',
            author: 'You',
            message: replyText,
            timestamp: new Date().toISOString()
        };

        onUpdateTicket({
            ...ticket,
            conversation: [...ticket.conversation, newMessage]
        });
        setReplyText('');
    };

    return (
        <div className="flex-1 bg-white flex flex-col h-screen">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-gray-500">Ticket #{ticket.id}</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">{ticket.title}</h1>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {ticket.customer.avatar}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{ticket.customer.name}</p>
                        <p className="text-xs text-gray-500">{ticket.customer.email}</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 px-6 flex gap-1">
                <TabButton
                    active={activeTab === 'public'}
                    onClick={() => setActiveTab('public')}
                    icon={<User className="w-4 h-4" />}
                    label="Public Reply"
                />
                <TabButton
                    active={activeTab === 'private'}
                    onClick={() => setActiveTab('private')}
                    icon={<Lock className="w-4 h-4" />}
                    label="Private Comment"
                />
            </div>

            {/* Conversation Thread */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {ticket.conversation.map((message) => (
                    <MessageItem key={message.id} message={message} />
                ))}
            </div>

            {/* Reply Input */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={activeTab === 'public' ? 'Type your public reply...' : 'Add a private comment...'}
                        className="w-full p-4 resize-none focus:outline-none"
                        rows="4"
                    />
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
                        <div className="text-xs text-gray-500">
                            {activeTab === 'public' ? 'Customer will see this reply' : 'Only team members can see this'}
                        </div>
                        <button
                            onClick={handleSendReply}
                            disabled={!replyText.trim()}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4" />
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-components
const EmptyState = () => (
    <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Select a ticket to view details</p>
        </div>
    </div>
);

const TabButton = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-3 border-b-2 ${active
            ? 'border-blue-500 text-blue-700 font-medium'
            : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
    >
        {icon}
        {label}
    </button>
);

const MessageItem = ({ message }) => (
    <div className={`flex gap-3 ${message.type === 'internal' ? 'bg-yellow-50 -mx-6 px-6 py-4' : ''}`}>
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {message.author.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-gray-900">{message.author}</span>
                <span className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleString()}
                </span>
                {message.type === 'internal' && (
                    <span className="px-2 py-0.5 bg-yellow-200 text-yellow-800 text-xs rounded-md font-medium">
                        Internal Note
                    </span>
                )}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{message.message}</p>
        </div>
    </div>
);

export default TicketDetails;
