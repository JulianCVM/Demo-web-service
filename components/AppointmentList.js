'use client';

import { useState } from 'react';
import { formatDate, getStatusColor, getStatusText, getSpecialtyIcon } from '@/lib/data';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaCheckCircle, FaTimes, FaUserMd, FaFilter, FaSort, FaExclamationTriangle } from 'react-icons/fa';

export default function AppointmentList({ appointments, user, onAppointmentCancelled, onBack }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredAppointments = appointments.filter(appointment => {
    switch (filter) {
      case 'upcoming':
        return new Date(appointment.appointment_date) > new Date() && appointment.status !== 'cancelled';
      case 'completed':
        return new Date(appointment.appointment_date) <= new Date() || appointment.status === 'completed';
      case 'cancelled':
        return appointment.status === 'cancelled';
      default:
        return true;
    }
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.appointment_date) - new Date(b.appointment_date);
      case 'doctor':
        return a.doctor_name.localeCompare(b.doctor_name);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled': return FaClock;
      case 'completed': return FaCheckCircle;
      case 'cancelled': return FaTimes;
      case 'in_progress': return FaClock;
      default: return FaCalendarAlt;
    }
  };

  const canCancelAppointment = (appointment) => {
    const appointmentDate = new Date(appointment.appointment_date);
    const now = new Date();
    const hoursUntilAppointment = (appointmentDate - now) / (1000 * 60 * 60);
    
    return appointment.status === 'scheduled' && hoursUntilAppointment > 24;
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
      return;
    }

    // Simular delay de cancelación
    setTimeout(() => {
      onAppointmentCancelled(appointmentId);
    }, 500);
  };

  const getStats = () => {
    const now = new Date();
    const upcoming = appointments.filter(apt => new Date(apt.appointment_date) > now && apt.status !== 'cancelled');
    const completed = appointments.filter(apt => new Date(apt.appointment_date) <= now || apt.status === 'completed');
    const cancelled = appointments.filter(apt => apt.status === 'cancelled');

    return {
      total: appointments.length,
      upcoming: upcoming.length,
      completed: completed.length,
      cancelled: cancelled.length,
    };
  };

  const stats = getStats();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Volver al Dashboard
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Mis Citas Médicas</h1>
        <p className="text-gray-600 text-sm">Gestiona todas tus citas médicas</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow-sm p-4 border border-gray-300">
          <div className="flex items-center">
            <div className="p-2 bg-slate-100">
              <FaCalendarAlt className="text-xl text-slate-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-xl font-semibold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 border border-gray-300">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100">
              <FaClock className="text-xl text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Próximas</p>
              <p className="text-xl font-semibold text-gray-900">{stats.upcoming}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 border border-gray-300">
          <div className="flex items-center">
            <div className="p-2 bg-green-100">
              <FaCheckCircle className="text-xl text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Completadas</p>
              <p className="text-xl font-semibold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 border border-gray-300">
          <div className="flex items-center">
            <div className="p-2 bg-red-100">
              <FaTimes className="text-xl text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Canceladas</p>
              <p className="text-xl font-semibold text-gray-900">{stats.cancelled}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white shadow-sm p-6 mb-8 border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="filter" className="block text-sm font-semibold text-gray-900 mb-2">
              Filtrar por Estado
            </label>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <select
                id="filter"
                className="w-full pl-10 pr-4 py-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-slate-600 transition-all duration-200 bg-white"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Todas las citas</option>
                <option value="upcoming">Próximas</option>
                <option value="completed">Completadas</option>
                <option value="cancelled">Canceladas</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="sort" className="block text-sm font-semibold text-gray-900 mb-2">
              Ordenar por
            </label>
            <div className="relative">
              <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <select
                id="sort"
                className="w-full pl-10 pr-4 py-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-slate-600 transition-all duration-200 bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Fecha</option>
                <option value="doctor">Doctor</option>
                <option value="status">Estado</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length > 0 ? (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white shadow-sm p-6 border border-gray-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl text-gray-400">
                    {(() => {
                      const IconComponent = getStatusIcon(appointment.status);
                      return <IconComponent />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Dr. {appointment.doctor_name}
                      </h3>
                      <span className={`px-3 py-1 text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
                      <div className="space-y-2">
                        <p><span className="font-semibold text-gray-900">Especialidad:</span> {appointment.specialty}</p>
                        <p><span className="font-semibold text-gray-900">Fecha y Hora:</span> {formatDate(appointment.appointment_date)}</p>
                      </div>
                      <div className="space-y-2">
                        <p><span className="font-semibold text-gray-900">Motivo:</span> {appointment.reason}</p>
                        {appointment.notes && (
                          <p><span className="font-semibold text-gray-900">Notas:</span> {appointment.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  {canCancelAppointment(appointment) && (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Cancelar
                    </button>
                  )}
                  
                  {appointment.status === 'scheduled' && (
                    <div className="text-xs text-gray-500 text-right bg-gray-50 p-3 border border-gray-200">
                      <p className="font-medium">Recordatorios:</p>
                      <p>• Llega 15 min antes</p>
                      <p>• Trae tu identificación</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <FaCalendarAlt className="text-6xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">No hay citas</h3>
          <p className="text-gray-600 mb-6 text-sm">
            {filter === 'all' 
              ? 'No tienes citas médicas registradas'
              : `No hay citas con el filtro seleccionado`
            }
          </p>
          {filter !== 'all' && (
            <button
              onClick={() => setFilter('all')}
              className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Ver Todas las Citas
            </button>
          )}
        </div>
      )}

      {/* Help Section */}
      <div className="mt-12 bg-gray-50 border border-gray-300 p-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FaExclamationTriangle className="mr-2 text-gray-600" />
          Información Importante
        </h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex items-start">
            <span className="mr-2 text-gray-500">•</span>
            <span>Puedes cancelar citas con más de 24 horas de anticipación</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-gray-500">•</span>
            <span>Llega 15 minutos antes de tu cita programada</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-gray-500">•</span>
            <span>Trae tu identificación y tarjeta de seguro médico</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-gray-500">•</span>
            <span>Si necesitas reprogramar, cancela y reserva una nueva cita</span>
          </li>
        </ul>
      </div>
    </div>
  );
}