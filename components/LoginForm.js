'use client';

import { useState } from 'react';
import { FaHospital, FaUser, FaLock, FaInfoCircle, FaKey } from 'react-icons/fa';

export default function LoginForm({ onLogin, loading }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isRegister, setIsRegister] = useState(false);
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
    setError('');

    if (isRegister) {
      setError('En modo demo, usa las cuentas de prueba proporcionadas.');
      return;
    }

    onLogin(formData.email, formData.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <FaHospital className="text-5xl text-slate-700" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Sistema de Citas Médicas
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Plataforma de Gestión Hospitalaria
          </p>
          <div className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium">
            Modo Demostración
          </div>
        </div>

        <div className="bg-white shadow-sm p-8 border border-gray-300">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-slate-600 transition-all duration-200 bg-white"
                    placeholder="usuario@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-slate-600 transition-all duration-200 bg-white"
                    placeholder="Ingrese su contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 px-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Cuentas de Prueba */}
        <div className="bg-gray-50 border border-gray-300 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaKey className="mr-2 text-slate-600" />
            Cuentas de Prueba
          </h3>
          <div className="space-y-3">
            <div className="bg-white rounded-md p-3 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Administrador</div>
                  <div className="text-sm text-gray-600">admin@demo.com</div>
                </div>
                <div className="text-sm font-mono bg-slate-100 px-2 py-1 rounded text-slate-700">admin123</div>
              </div>
            </div>
            
            <div className="bg-white rounded-md p-3 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Doctor</div>
                  <div className="text-sm text-gray-600">doctor@demo.com</div>
                </div>
                <div className="text-sm font-mono bg-slate-100 px-2 py-1 rounded text-slate-700">doctor123</div>
              </div>
            </div>
            
            <div className="bg-white rounded-md p-3 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Paciente</div>
                  <div className="text-sm text-gray-600">paciente@demo.com</div>
                </div>
                <div className="text-sm font-mono bg-slate-100 px-2 py-1 rounded text-slate-700">paciente123</div>
              </div>
            </div>
          </div>
        </div>

        {/* Información de la Demo */}
        <div className="bg-slate-50 border border-slate-300 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
            <FaInfoCircle className="mr-2 text-slate-600" />
            Sobre esta Demo
          </h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li className="flex items-start">
              <span className="mr-2 text-slate-500">•</span>
              <span>Demostración de un servicio web de gestión de citas médicas</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-slate-500">•</span>
              <span>Datos simulados para fines educativos</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-slate-500">•</span>
              <span>Explora todas las funcionalidades del sistema</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-slate-500">•</span>
              <span>Desarrollado con Next.js, React y Tailwind CSS</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}