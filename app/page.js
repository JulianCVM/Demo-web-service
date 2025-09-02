'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';
import AppointmentForm from '@/components/AppointmentForm';
import DoctorList from '@/components/DoctorList';
import AppointmentList from '@/components/AppointmentList';
import { demoUsers, demoAppointments, demoDoctors } from '@/lib/data';

export default function Home() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [appointments, setAppointments] = useState(demoAppointments);
  const [doctors, setDoctors] = useState(demoDoctors);
  const [loading, setLoading] = useState(false);

  // Simular carga inicial
  useEffect(() => {
    const token = localStorage.getItem('demo-token');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('demo-user'));
      if (userData) {
        setUser(userData);
        setCurrentView('dashboard');
      }
    }
  }, []);

  const handleLogin = (email, password) => {
    setLoading(true);
    
    // Simular delay de autenticación
    setTimeout(() => {
      let userData = null;
      
      // Verificar credenciales de demo
      if (email === 'admin@demo.com' && password === 'admin123') {
        userData = demoUsers.admin;
      } else if (email === 'doctor@demo.com' && password === 'doctor123') {
        userData = demoUsers.doctor;
      } else if (email === 'paciente@demo.com' && password === 'paciente123') {
        userData = demoUsers.patient;
      }

      if (userData) {
        setUser(userData);
        localStorage.setItem('demo-token', 'demo-jwt-token');
        localStorage.setItem('demo-user', JSON.stringify(userData));
        setCurrentView('dashboard');
      } else {
        alert('Credenciales incorrectas. Usa las cuentas de demo proporcionadas.');
      }
      
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('demo-token');
    localStorage.removeItem('demo-user');
    setCurrentView('login');
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleAppointmentCreated = (newAppointment) => {
    const appointment = {
      id: appointments.length + 1,
      patient_name: user.name,
      doctor_name: doctors.find(d => d.id === newAppointment.doctor_id)?.name || 'Dr. Desconocido',
      doctor_id: newAppointment.doctor_id,
      specialty: doctors.find(d => d.id === newAppointment.doctor_id)?.specialty || 'General',
      appointment_date: newAppointment.appointment_date,
      reason: newAppointment.reason,
      notes: newAppointment.notes || '',
      status: 'scheduled'
    };
    
    setAppointments(prev => [...prev, appointment]);
    setCurrentView('dashboard');
  };

  const handleAppointmentCancelled = (appointmentId) => {
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return <LoginForm onLogin={handleLogin} loading={loading} />;
      case 'dashboard':
        return (
          <Dashboard
            user={user}
            appointments={appointments}
            doctors={doctors}
            onViewChange={handleViewChange}
            onAppointmentCancelled={handleAppointmentCancelled}
          />
        );
      case 'book-appointment':
        return (
          <AppointmentForm
            doctors={doctors}
            user={user}
            onAppointmentCreated={handleAppointmentCreated}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'doctors':
        return (
          <DoctorList
            doctors={doctors}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'appointments':
        return (
          <AppointmentList
            appointments={appointments}
            user={user}
            onAppointmentCancelled={handleAppointmentCancelled}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      default:
        return <LoginForm onLogin={handleLogin} loading={loading} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogout={handleLogout}
        currentView={currentView}
        onViewChange={handleViewChange}
      />
      
      <main className="container mx-auto px-4 py-8">
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Cargando...</span>
          </div>
        )}
        
        {!loading && renderCurrentView()}
      </main>

      {/* Demo Banner */}
      {user && (
        <div className="fixed bottom-4 right-4 bg-slate-800 text-white px-3 py-2 shadow-sm text-xs border border-slate-600">
          <div className="flex items-center space-x-2">
            <span className="text-slate-300">●</span>
            <span>Demo Mode</span>
          </div>
        </div>
      )}
    </div>
  );
}