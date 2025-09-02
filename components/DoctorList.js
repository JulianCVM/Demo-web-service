'use client';

import { useState, useEffect } from 'react';
import { getSpecialtyIcon } from '@/lib/data';
import { FaArrowLeft, FaSearch, FaFilter, FaUserMd, FaEnvelope, FaPhone, FaHospital, FaGraduationCap, FaStar, FaClock, FaTimes } from 'react-icons/fa';

export default function DoctorList({ doctors, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  useEffect(() => {
    let filtered = doctors;

    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSpecialty) {
      filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty);
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchTerm, selectedSpecialty]);

  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];

  const getSpecialtyColor = (specialty) => {
    const colors = {
      'Medicina General': 'bg-blue-100 text-blue-800',
      'Cardiología': 'bg-red-100 text-red-800',
      'Pediatría': 'bg-yellow-100 text-yellow-800',
      'Dermatología': 'bg-pink-100 text-pink-800',
      'Ginecología': 'bg-purple-100 text-purple-800',
      'Neurología': 'bg-indigo-100 text-indigo-800',
      'Ortopedia': 'bg-gray-100 text-gray-800',
      'Oftalmología': 'bg-cyan-100 text-cyan-800',
      'Psiquiatría': 'bg-green-100 text-green-800',
      'Cirugía': 'bg-orange-100 text-orange-800',
    };
    return colors[specialty] || 'bg-gray-100 text-gray-800';
  };

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
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Nuestros Doctores</h1>
        <p className="text-gray-600 text-sm">Conoce a nuestro equipo médico especializado</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow-sm p-6 mb-8 border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="search" className="block text-sm font-semibold text-gray-900 mb-2">
              Buscar Doctor
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                id="search"
                type="text"
                placeholder="Nombre o especialidad..."
                className="w-full pl-10 pr-4 py-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-slate-600 transition-all duration-200 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="specialty" className="block text-sm font-semibold text-gray-900 mb-2">
              Filtrar por Especialidad
            </label>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <select
                id="specialty"
                className="w-full pl-10 pr-4 py-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-slate-600 transition-all duration-200 bg-white"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="">Todas las especialidades</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600 text-sm">
          Mostrando <span className="font-semibold">{filteredDoctors.length}</span> de <span className="font-semibold">{doctors.length}</span> doctores
        </p>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white shadow-sm p-6 border border-gray-300 hover:shadow-md transition-all duration-200 group">
              <div className="text-center">
                <div className="flex justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                  <FaUserMd className="text-4xl text-slate-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Dr. {doctor.name}
                </h3>
                <div className={`inline-flex items-center px-3 py-1 text-sm font-medium mb-4 ${getSpecialtyColor(doctor.specialty)}`}>
                  {doctor.specialty}
                </div>
                
                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <div className="flex items-center justify-center">
                    <FaEnvelope className="mr-2 text-gray-400" />
                    <span>{doctor.email}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <FaPhone className="mr-2 text-gray-400" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <FaHospital className="mr-2 text-gray-400" />
                    <span>Consultorio {doctor.consultation_room}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 mb-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Horarios de Atención</h4>
                  <div className="text-xs text-gray-600 space-y-2">
                    {doctor.schedule && doctor.schedule.length > 0 ? (
                      doctor.schedule.map((schedule, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="capitalize font-medium">{schedule.day_of_week}</span>
                          <span className="bg-white px-2 py-1 border border-gray-200">{schedule.start_time} - {schedule.end_time}</span>
                        </div>
                      ))
                    ) : (
                      <p>Horarios no disponibles</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-center text-sm">
                    <FaStar className="mr-2 text-gray-400" />
                    <span>Experiencia: <span className="font-semibold">{doctor.experience_years || 'N/A'} años</span></span>
                  </div>
                  <div className="flex items-center justify-center text-sm">
                    <FaGraduationCap className="mr-2 text-gray-400" />
                    <span>Universidad: <span className="font-semibold">{doctor.university || 'N/A'}</span></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <FaSearch className="text-6xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">No se encontraron doctores</h3>
          <p className="text-gray-600 mb-6 text-sm">
            Intenta ajustar los filtros de búsqueda
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedSpecialty('');
            }}
            className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Limpiar Filtros
          </button>
        </div>
      )}

      {/* Specialties Summary */}
      <div className="mt-12 bg-white shadow-sm p-8 border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Especialidades Disponibles</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {specialties.map((specialty) => (
            <div
              key={specialty}
              className={`flex items-center space-x-3 p-4 cursor-pointer transition-all duration-200 border ${
                selectedSpecialty === specialty
                  ? getSpecialtyColor(specialty) + ' border-gray-400'
                  : 'bg-gray-100 hover:bg-gray-200 border-gray-200'
              }`}
              onClick={() => setSelectedSpecialty(selectedSpecialty === specialty ? '' : specialty)}
            >
              <FaUserMd className="text-lg text-gray-600" />
              <span className="text-sm font-medium">{specialty}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}