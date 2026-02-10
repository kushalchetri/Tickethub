import React from 'react';
import { LayoutDashboard, Ticket, BarChart3, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', active: true },
        { icon: Ticket, label: 'Tickets', active: false },
        { icon: BarChart3, label: 'Analytics', active: false },
        { icon: Settings, label: 'Settings', active: false },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                        <Ticket className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">TicketHub</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.label}>
                                <button
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${item.active
                                        ? 'bg-primary-50 text-primary-700 font-medium'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Profile & Logout */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 px-2 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                        SC
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Sarah Chen</p>
                        <p className="text-xs text-gray-500">Support Agent</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        localStorage.removeItem('tickethub_auth');
                        window.location.href = '/login';
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
