'use client';

import { useState, useEffect } from 'react';
import { formatDate, getStatusColor, getStatusText, getSpecialtyIcon, getRoleColor } from '@/lib/data';
import { FaUser, FaUserMd, FaUserTie, FaCalendarAlt, FaClock, FaCheckCircle, FaUserMd as FaDoctor, FaChartBar, FaCalendarPlus, FaListAlt, FaArrowLeft } from 'react-icons/fa';

export default function Dashboard({ user, appointments, doctors, onViewChange, onAppointmentCancelled }) {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
    availableDoctors: 0,
  });

  useEffect(() => {
    const now = new Date();
    const upcoming = appointments.filter(apt => new Date(apt.appointment_date) > now);
    const completed = appointments.filter(apt => new Date(apt.appointment_date) <= now);
    
    setStats({
      totalAppointments: appointments.length,
      upcomingAppointments: upcoming.length,
      completedAppointments: completed.length,
      availableDoctors: doctors.length,
    });
  }, [appointments, doctors]);

  const getUpcomingAppointments = () => {
    const now = new Date();
    return appointments
      .filter(apt => new Date(apt.appointment_date) > now)
      .sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date))
      .slice(0, 3);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return FaUserTie;
      case 'doctor': return FaUserMd;
      case 'patient': return FaUser;
      default: return FaUser;
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case 'admin': return 'Panel de administración del sistema';
      case 'doctor': return 'Panel de gestión médica';
      case 'patient': return 'Gestiona tus citas médicas';
      default: return 'Bienvenido al sistema';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-slate-800 p-6 text-white shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="text-3xl text-slate-300">
            {(() => {
              const IconComponent = getRoleIcon(user.role);
              return <IconComponent />;
            })()}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold mb-1">Bienvenido, {user.name}</h1>
            <p className="text-slate-200 text-sm">
              {getRoleDescription(user.role)}
            </p>
          </div>
          <div className={`inline-flex items-center px-3 py-1 text-sm font-medium ${getRoleColor(user.role)}`}>
            {user.role.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow-sm p-4 border border-gray-300 hover:shadow-md transition-all duration-200">
          <div className="flex items-center">
            <div className="p-2 bg-slate-100">
              <FaCalendarAlt className="text-xl text-slate-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Citas</p>
              <p className="text-xl font-semibold text-gray-900">{stats.totalAppointments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 border border-gray-300 hover:shadow-md transition-all duration-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100">
              <FaClock className="text-xl text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Próximas</p>
              <p className="text-xl font-semibold text-gray-900">{stats.upcomingAppointments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 border border-gray-300 hover:shadow-md transition-all duration-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100">
              <FaCheckCircle className="text-xl text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Completadas</p>
              <p className="text-xl font-semibold text-gray-900">{stats.completedAppointments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 border border-gray-300 hover:shadow-md transition-all duration-200">
          <div className="flex items-center">
            <div className="p-2 bg-slate-100">
              <FaDoctor className="text-xl text-slate-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Doctores</p>
              <p className="text-xl font-semibold text-gray-900">{stats.availableDoctors}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-sm p-6 border border-gray-300 hover:shadow-md transition-all duration-200 group cursor-pointer" onClick={() => onViewChange('book-appointment')}>
          <div className="text-center">
            <div className="flex justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
              <FaCalendarPlus className="text-3xl text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reservar Cita</h3>
            <p className="text-gray-600 mb-4 text-sm">Agenda una nueva cita médica</p>
            <div className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 font-medium transition-all duration-200">
              Reservar Ahora
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-6 border border-gray-300 hover:shadow-md transition-all duration-200 group cursor-pointer" onClick={() => onViewChange('doctors')}>
          <div className="text-center">
            <div className="flex justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
              <FaDoctor className="text-3xl text-slate-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ver Doctores</h3>
            <p className="text-gray-600 mb-4 text-sm">Consulta la lista de doctores disponibles</p>
            <div className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 font-medium transition-all duration-200">
              Ver Doctores
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-6 border border-gray-300 hover:shadow-md transition-all duration-200 group cursor-pointer" onClick={() => onViewChange('appointments')}>
          <div className="text-center">
            <div className="flex justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
              <FaListAlt className="text-3xl text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mis Citas</h3>
            <p className="text-gray-600 mb-4 text-sm">Gestiona tus citas existentes</p>
            <div className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 font-medium transition-all duration-200">
              Ver Citas
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      {getUpcomingAppointments().length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">⏰</span>
            Próximas Citas
          </h2>
          <div className="space-y-4">
            {getUpcomingAppointments().map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{getSpecialtyIcon(appointment.specialty)}</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">
                      Dr. {appointment.doctor_name}
                    </p>
                    <p className="text-gray-600">
                      {appointment.specialty}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatDate(appointment.appointment_date)}
                  </p>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                    {getStatusText(appointment.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white shadow-sm p-8 border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <FaChartBar className="mr-3 text-slate-600" />
          Actividad Reciente
        </h2>
        <div className="space-y-3">
          {appointments.slice(0, 5).map((appointment) => (
            <div key={appointment.id} className="flex items-center space-x-4 p-4 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
              <div className="text-xl text-gray-400">
                {appointment.status === 'completed' ? <FaCheckCircle /> : 
                 appointment.status === 'cancelled' ? <FaTimes /> : <FaClock />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  Cita con Dr. {appointment.doctor_name}
                </p>
                <p className="text-sm text-gray-600">
                  {formatDate(appointment.appointment_date)}
                </p>
              </div>
              <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(appointment.status)}`}>
                {getStatusText(appointment.status)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}