'use client';

import { useState } from 'react';
import { FaHospital, FaHome, FaCalendarPlus, FaUserMd, FaList, FaSignOutAlt, FaBars } from 'react-icons/fa';

export default function Header({ user, onLogout, currentView, onViewChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaHome },
    { id: 'book-appointment', label: 'Reservar Cita', icon: FaCalendarPlus },
    { id: 'doctors', label: 'Doctores', icon: FaUserMd },
    { id: 'appointments', label: 'Mis Citas', icon: FaList },
  ];

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <FaHospital className="text-2xl text-slate-700" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Sistema de Citas Médicas
              </h1>
              <p className="text-xs text-gray-500">Plataforma Hospitalaria</p>
            </div>
          </div>

          {/* Navigation - Desktop */}
          {user && (
            <nav className="hidden md:flex space-x-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    currentView === item.id
                      ? 'bg-slate-100 text-slate-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="text-sm" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          )}

          {/* User Menu */}
          {user && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <div className="font-semibold text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500 capitalize">{user.role}</div>
              </div>
              
              <button
                onClick={onLogout}
                className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2"
              >
                <FaSignOutAlt className="text-xs" />
                <span>Cerrar Sesión</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              >
                <FaBars className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {user && isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    currentView === item.id
                      ? 'bg-slate-100 text-slate-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="text-base" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}