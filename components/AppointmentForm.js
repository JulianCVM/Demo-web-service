'use client';

import { useState } from 'react';
import { availableTimeSlots, appointmentReasons } from '@/lib/data';
import { FaArrowLeft, FaUserMd, FaCalendarAlt, FaClock, FaFileAlt, FaStethoscope } from 'react-icons/fa';

export default function AppointmentForm({ doctors, user, onAppointmentCreated, onBack }) {
  const [formData, setFormData] = useState({
    doctor_id: '',
    appointment_date: '',
    appointment_time: '',
    reason: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simular delay de procesamiento
    setTimeout(() => {
      if (!formData.doctor_id || !formData.appointment_date || !formData.appointment_time) {
        setError('Por favor completa todos los campos obligatorios');
        setLoading(false);
        return;
      }

      const appointmentDateTime = `${formData.appointment_date}T${formData.appointment_time}:00`;
      const newAppointment = {
        ...formData,
        appointment_date: appointmentDateTime,
      };

      onAppointmentCreated(newAppointment);
      setLoading(false);
    }, 1500);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Volver al Dashboard
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Reservar Nueva Cita</h1>
        <p className="text-gray-600 text-sm">Completa el formulario para agendar tu cita médica</p>
      </div>

      <div className="bg-white shadow-sm p-8 border border-gray-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Doctor Selection */}
            <div>
              <label htmlFor="doctor_id" className="block text-sm font-semibold text-gray-900 mb-2">
                Seleccionar Doctor
              </label>
              <div className="relative">
                <FaUserMd className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <select
                  id="doctor_id"
                  name="doctor_id"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-slate-600 transition-all duration-200 bg-white"
                  value={formData.doctor_id}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona un doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      Dr. {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label htmlFor="appointment_date" className="block text-sm font-semibold text-gray-900 mb-2">
                Fecha de la Cita
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  id="appointment_date"
                  name="appointment_date"
                  type="date"
                  required
                  min={getMinDate()}
                  max={getMaxDate()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-slate-600 transition-all duration-200 bg-white"
                  value={formData.appointment_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label htmlFor="appointment_time" className="block text-sm font-semibold text-gray-900 mb-2">
                Hora Disponible
              </label>
              <div className="relative">
                <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <select
                  id="appointment_time"
                  name="appointment_time"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-slate-600 transition-all duration-200 bg-white"
                  value={formData.appointment_time}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona una hora</option>
                  {availableTimeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label htmlFor="reason" className="block text-sm font-semibold text-gray-900 mb-2">
                Motivo de la Consulta
              </label>
              <div className="relative">
                <FaStethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <select
                  id="reason"
                  name="reason"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-slate-600 transition-all duration-200 bg-white"
                  value={formData.reason}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona el motivo</option>
                  {appointmentReasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-gray-900 mb-2">
              Notas Adicionales (Opcional)
            </label>
            <div className="relative">
              <FaFileAlt className="absolute left-3 top-3 text-gray-400 text-sm" />
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="w-full pl-10 pr-4 py-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-slate-600 transition-all duration-200 bg-white"
                placeholder="Describe brevemente tus síntomas o cualquier información adicional..."
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 bg-white border border-gray-400 hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !formData.doctor_id || !formData.appointment_date || !formData.appointment_time}
              className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Reservando...
                </div>
              ) : (
                'Reservar Cita'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
          <span className="mr-2">💡</span>
          Consejos para tu cita
        </h3>
        <ul className="text-sm text-blue-700 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Llega 15 minutos antes de tu cita</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Trae tu identificación y tarjeta de seguro</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Anota tus síntomas y medicamentos actuales</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Si necesitas cancelar, hazlo con al menos 24 horas de anticipación</span>
          </li>
        </ul>
      </div>
    </div>
  );
}