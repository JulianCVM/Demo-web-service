# 🧩 Documentación Detallada de Componentes
## Sistema de Citas Médicas - Análisis Técnico

---

## 📋 Tabla de Contenidos

1. [Análisis de Componentes](#1-análisis-de-componentes)
2. [Props y Estados](#2-props-y-estados)
3. [Hooks y Efectos](#3-hooks-y-efectos)
4. [Patrones de Diseño](#4-patrones-de-diseño)
5. [Optimizaciones](#5-optimizaciones)
6. [Testing](#6-testing)

---

## 1. Análisis de Componentes

### 🔐 **LoginForm.js - Análisis Completo**

#### **Estructura del Componente**
```javascript
'use client';

import { useState } from 'react';
import { FaHospital, FaUser, FaLock, FaInfoCircle, FaKey } from 'react-icons/fa';

export default function LoginForm({ onLogin, loading }) {
  // Estados locales
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Handlers
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    onLogin(formData.email, formData.password);
  };

  // Render
  return (
    // JSX del componente
  );
}
```

#### **Características Técnicas**

**Estados Locales:**
- `formData`: Objeto que contiene email y password
- `error`: String para mensajes de error
- `loading`: Prop externa para estado de carga

**Funciones:**
- `handleInputChange`: Actualiza el estado del formulario
- `handleSubmit`: Maneja el envío del formulario
- `onLogin`: Callback para comunicación con componente padre

**Validaciones:**
- Campos requeridos (HTML5)
- Formato de email (HTML5)
- Longitud mínima de contraseña

#### **Patrones de Diseño Utilizados**

1. **Controlled Components**: Todos los inputs son controlados por React
2. **Lifting State Up**: El estado de autenticación se maneja en el componente padre
3. **Callback Pattern**: Comunicación con el padre mediante callbacks

---

### 🧭 **Header.js - Análisis Completo**

#### **Estructura del Componente**
```javascript
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

  // Render
  return (
    // JSX del componente
  );
}
```

#### **Características Técnicas**

**Estados Locales:**
- `isMenuOpen`: Controla la visibilidad del menú móvil

**Props Recibidas:**
- `user`: Objeto con información del usuario
- `onLogout`: Función para cerrar sesión
- `currentView`: Vista actual activa
- `onViewChange`: Función para cambiar de vista

**Funcionalidades:**
- **Navegación Responsiva**: Menú hamburguesa para móviles
- **Estado Activo**: Indica la sección actual
- **Logout**: Cierre de sesión con confirmación

#### **Patrones de Diseño Utilizados**

1. **Conditional Rendering**: Renderizado condicional según el estado
2. **Array Mapping**: Generación dinámica de elementos de navegación
3. **Responsive Design**: Adaptación a diferentes tamaños de pantalla

---

### 📊 **Dashboard.js - Análisis Completo**

#### **Estructura del Componente**
```javascript
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
    // Cálculo de estadísticas
    const total = appointments.length;
    const upcoming = appointments.filter(apt => new Date(apt.appointment_date) > new Date()).length;
    const completed = appointments.filter(apt => apt.status === 'completed').length;
    const availableDocs = doctors.length;
    
    setStats({
      totalAppointments: total,
      upcomingAppointments: upcoming,
      completedAppointments: completed,
      availableDoctors: availableDocs,
    });
  }, [appointments, doctors]);

  // Render
  return (
    // JSX del componente
  );
}
```

#### **Características Técnicas**

**Estados Locales:**
- `stats`: Objeto con estadísticas calculadas

**Props Recibidas:**
- `user`: Información del usuario actual
- `appointments`: Array de citas
- `doctors`: Array de doctores
- `onViewChange`: Función para cambiar de vista
- `onAppointmentCancelled`: Función para cancelar citas

**Hooks Utilizados:**
- `useState`: Para manejar estadísticas
- `useEffect`: Para recalcular estadísticas cuando cambian los datos

**Funciones Helper:**
- `getUpcomingAppointments()`: Filtra citas próximas
- `getRoleIcon()`: Retorna icono según el rol
- `getRoleDescription()`: Retorna descripción del rol

#### **Patrones de Diseño Utilizados**

1. **Derived State**: Las estadísticas se calculan a partir de props
2. **Effect Hook**: Recalculación automática cuando cambian los datos
3. **Conditional Rendering**: Contenido diferente según el rol del usuario

---

### 📅 **AppointmentForm.js - Análisis Completo**

#### **Estructura del Componente**
```javascript
'use client';

import { useState } from 'react';
import { availableTimeSlots, appointmentReasons } from '@/lib/data';
import { FaArrowLeft, FaUserMd, FaCalendarAlt, FaClock, FaFileAlt, FaStethoscope, FaInfoCircle } from 'react-icons/fa';

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
  const [success, setSuccess] = useState('');

  // Handlers
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    setTimeout(() => {
      // Validación y creación de cita
      if (!formData.doctor_id || !formData.appointment_date || !formData.appointment_time || !formData.reason) {
        setError('Por favor, completa todos los campos obligatorios.');
        setLoading(false);
        return;
      }

      const newAppointment = {
        id: Date.now(),
        patient_id: user.id,
        doctor_id: parseInt(formData.doctor_id),
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        reason: formData.reason,
        notes: formData.notes,
        status: 'scheduled',
      };

      onAppointmentCreated(newAppointment);
      setSuccess('Cita reservada con éxito!');
      setFormData({
        doctor_id: '',
        appointment_date: '',
        appointment_time: '',
        reason: '',
        notes: '',
      });
      setLoading(false);
    }, 1500);
  };

  // Render
  return (
    // JSX del componente
  );
}
```

#### **Características Técnicas**

**Estados Locales:**
- `formData`: Objeto con todos los campos del formulario
- `loading`: Estado de carga durante el envío
- `error`: Mensajes de error
- `success`: Mensajes de éxito

**Props Recibidas:**
- `doctors`: Array de doctores disponibles
- `user`: Usuario actual
- `onAppointmentCreated`: Callback para crear nueva cita
- `onBack`: Callback para volver atrás

**Validaciones:**
- Campos requeridos
- Fechas futuras
- Horarios disponibles
- Formato de datos

**Funciones Helper:**
- `getMinDate()`: Fecha mínima (mañana)
- `getMaxDate()`: Fecha máxima (1 año)

#### **Patrones de Diseño Utilizados**

1. **Form Handling**: Manejo completo de formularios
2. **Async Simulation**: Simulación de llamadas asíncronas
3. **State Management**: Múltiples estados para diferentes propósitos
4. **Validation Pattern**: Validación en tiempo real

---

### 👨‍⚕️ **DoctorList.js - Análisis Completo**

#### **Estructura del Componente**
```javascript
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

  // Render
  return (
    // JSX del componente
  );
}
```

#### **Características Técnicas**

**Estados Locales:**
- `searchTerm`: Término de búsqueda
- `selectedSpecialty`: Especialidad seleccionada
- `filteredDoctors`: Lista filtrada de doctores

**Props Recibidas:**
- `doctors`: Array completo de doctores
- `onBack`: Callback para volver atrás

**Funcionalidades:**
- **Búsqueda en tiempo real**: Filtra por nombre o especialidad
- **Filtros por especialidad**: Categorización
- **Información detallada**: Horarios, experiencia, contacto

**Hooks Utilizados:**
- `useState`: Para manejar estados de filtrado
- `useEffect`: Para recalcular filtros cuando cambian los criterios

#### **Patrones de Diseño Utilizados**

1. **Filter Pattern**: Filtrado dinámico de datos
2. **Search Pattern**: Búsqueda en tiempo real
3. **Derived State**: Lista filtrada calculada a partir de criterios

---

### 📋 **AppointmentList.js - Análisis Completo**

#### **Estructura del Componente**
```javascript
'use client';

import { useState } from 'react';
import { formatDate, getStatusColor, getStatusText, getSpecialtyIcon } from '@/lib/data';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaCheckCircle, FaTimes, FaUserMd, FaFilter, FaSort, FaExclamationTriangle } from 'react-icons/fa';

export default function AppointmentList({ appointments, user, onAppointmentCancelled, onBack }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const getFilteredAppointments = () => {
    let filtered = appointments;

    // Filtrar por estado
    if (filter === 'upcoming') {
      filtered = filtered.filter(apt => new Date(apt.appointment_date) > new Date());
    } else if (filter === 'completed') {
      filtered = filtered.filter(apt => apt.status === 'completed');
    } else if (filter === 'cancelled') {
      filtered = filtered.filter(apt => apt.status === 'cancelled');
    }

    // Ordenar
    filtered.sort((a, b) => {
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

    return filtered;
  };

  // Render
  return (
    // JSX del componente
  );
}
```

#### **Características Técnicas**

**Estados Locales:**
- `filter`: Filtro actual por estado
- `sortBy`: Criterio de ordenamiento

**Props Recibidas:**
- `appointments`: Array de citas
- `user`: Usuario actual
- `onAppointmentCancelled`: Callback para cancelar citas
- `onBack`: Callback para volver atrás

**Funcionalidades:**
- **Filtros múltiples**: Por estado, fecha, doctor
- **Ordenamiento**: Por diferentes criterios
- **Acciones de gestión**: Cancelar citas
- **Estadísticas**: Resumen por estado

**Funciones Helper:**
- `getFilteredAppointments()`: Aplica filtros y ordenamiento
- `getStats()`: Calcula estadísticas
- `canCancelAppointment()`: Verifica si se puede cancelar

#### **Patrones de Diseño Utilizados**

1. **Filter and Sort Pattern**: Filtrado y ordenamiento dinámico
2. **Statistics Pattern**: Cálculo de métricas
3. **Action Pattern**: Acciones sobre elementos de la lista

---

## 2. Props y Estados

### 📊 **Análisis de Props**

#### **Props Comunes**
```javascript
// Props de navegación
onBack: () => void
onViewChange: (view: string) => void

// Props de datos
user: User
appointments: Appointment[]
doctors: Doctor[]

// Props de acciones
onLogin: (email: string, password: string) => void
onLogout: () => void
onAppointmentCreated: (appointment: Appointment) => void
onAppointmentCancelled: (id: number) => void

// Props de estado
loading: boolean
currentView: string
```

#### **Tipos de Props**
```javascript
// Props de datos (inmutables)
user: {
  id: number,
  name: string,
  email: string,
  role: 'admin' | 'doctor' | 'patient'
}

// Props de funciones (callbacks)
onLogin: (email: string, password: string) => void

// Props de estado
loading: boolean
```

### 🔄 **Análisis de Estados**

#### **Estados Locales por Componente**

**LoginForm:**
```javascript
const [formData, setFormData] = useState({
  email: '',
  password: '',
});
const [error, setError] = useState('');
```

**Header:**
```javascript
const [isMenuOpen, setIsMenuOpen] = useState(false);
```

**Dashboard:**
```javascript
const [stats, setStats] = useState({
  totalAppointments: 0,
  upcomingAppointments: 0,
  completedAppointments: 0,
  availableDoctors: 0,
});
```

**AppointmentForm:**
```javascript
const [formData, setFormData] = useState({
  doctor_id: '',
  appointment_date: '',
  appointment_time: '',
  reason: '',
  notes: '',
});
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [success, setSuccess] = useState('');
```

**DoctorList:**
```javascript
const [searchTerm, setSearchTerm] = useState('');
const [selectedSpecialty, setSelectedSpecialty] = useState('');
const [filteredDoctors, setFilteredDoctors] = useState(doctors);
```

**AppointmentList:**
```javascript
const [filter, setFilter] = useState('all');
const [sortBy, setSortBy] = useState('date');
```

---

## 3. Hooks y Efectos

### 🪝 **Hooks Utilizados**

#### **useState**
```javascript
// Estado simple
const [loading, setLoading] = useState(false);

// Estado complejo
const [formData, setFormData] = useState({
  email: '',
  password: '',
});

// Estado derivado
const [filteredDoctors, setFilteredDoctors] = useState(doctors);
```

#### **useEffect**
```javascript
// Efecto con dependencias
useEffect(() => {
  // Recalcular estadísticas cuando cambian los datos
  const total = appointments.length;
  const upcoming = appointments.filter(apt => new Date(apt.appointment_date) > new Date()).length;
  
  setStats({
    totalAppointments: total,
    upcomingAppointments: upcoming,
  });
}, [appointments, doctors]);

// Efecto de filtrado
useEffect(() => {
  let filtered = doctors;

  if (searchTerm) {
    filtered = filtered.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  setFilteredDoctors(filtered);
}, [doctors, searchTerm, selectedSpecialty]);
```

### 🔄 **Patrones de Efectos**

#### **Efecto de Cálculo**
```javascript
useEffect(() => {
  // Recalcula estadísticas cuando cambian los datos
  const stats = calculateStats(appointments, doctors);
  setStats(stats);
}, [appointments, doctors]);
```

#### **Efecto de Filtrado**
```javascript
useEffect(() => {
  // Filtra datos cuando cambian los criterios
  const filtered = applyFilters(data, criteria);
  setFilteredData(filtered);
}, [data, criteria]);
```

#### **Efecto de Limpieza**
```javascript
useEffect(() => {
  // Configuración inicial
  const timer = setInterval(() => {
    // Lógica periódica
  }, 1000);

  // Limpieza
  return () => {
    clearInterval(timer);
  };
}, []);
```

---

## 4. Patrones de Diseño

### 🏗️ **Patrones Implementados**

#### **1. Controlled Components**
```javascript
// Todos los inputs son controlados por React
<input
  value={formData.email}
  onChange={handleInputChange}
  name="email"
/>
```

#### **2. Lifting State Up**
```javascript
// El estado se maneja en el componente padre
const [user, setUser] = useState(null);

// Se pasa a los componentes hijos
<Header user={user} onLogout={handleLogout} />
<Dashboard user={user} />
```

#### **3. Callback Pattern**
```javascript
// Comunicación con el padre mediante callbacks
const handleLogin = (email, password) => {
  // Lógica de autenticación
  setUser(authenticatedUser);
};

<LoginForm onLogin={handleLogin} />
```

#### **4. Conditional Rendering**
```javascript
// Renderizado condicional según el estado
{user ? (
  <Dashboard user={user} />
) : (
  <LoginForm onLogin={handleLogin} />
)}
```

#### **5. Derived State**
```javascript
// Estado calculado a partir de props
const [filteredDoctors, setFilteredDoctors] = useState(doctors);

useEffect(() => {
  const filtered = doctors.filter(doctor => 
    doctor.specialty === selectedSpecialty
  );
  setFilteredDoctors(filtered);
}, [doctors, selectedSpecialty]);
```

#### **6. Composition Pattern**
```javascript
// Composición de componentes
<Dashboard>
  <StatsCards stats={stats} />
  <QuickActions onViewChange={onViewChange} />
  <RecentActivity appointments={appointments} />
</Dashboard>
```

---

## 5. Optimizaciones

### ⚡ **Optimizaciones Implementadas**

#### **1. Memoización de Cálculos**
```javascript
// Cálculos costosos se memorizan
const filteredAppointments = useMemo(() => {
  return appointments.filter(apt => 
    apt.status === filter
  );
}, [appointments, filter]);
```

#### **2. Lazy Loading**
```javascript
// Carga perezosa de componentes
const DoctorList = lazy(() => import('./DoctorList'));

// Uso con Suspense
<Suspense fallback={<Loading />}>
  <DoctorList />
</Suspense>
```

#### **3. Debouncing en Búsqueda**
```javascript
// Debounce para búsquedas
const debouncedSearch = useCallback(
  debounce((term) => {
    setSearchTerm(term);
  }, 300),
  []
);
```

#### **4. Optimización de Re-renders**
```javascript
// useCallback para funciones estables
const handleLogin = useCallback((email, password) => {
  // Lógica de login
}, []);

// useMemo para valores calculados
const stats = useMemo(() => {
  return calculateStats(appointments);
}, [appointments]);
```

---

## 6. Testing

### 🧪 **Estrategia de Testing**

#### **Unit Tests**
```javascript
// Test de componentes individuales
describe('LoginForm', () => {
  it('should render login form', () => {
    render(<LoginForm onLogin={jest.fn()} loading={false} />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should call onLogin with correct credentials', () => {
    const mockOnLogin = jest.fn();
    render(<LoginForm onLogin={mockOnLogin} loading={false} />);
    
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }));
    
    expect(mockOnLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
```

#### **Integration Tests**
```javascript
// Test de flujos completos
describe('Appointment Flow', () => {
  it('should create appointment successfully', async () => {
    render(<App />);
    
    // Login
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'paciente@demo.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'paciente123' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }));
    
    // Navigate to appointment form
    fireEvent.click(screen.getByText('Reservar Cita'));
    
    // Fill form
    fireEvent.change(screen.getByLabelText('Doctor'), {
      target: { value: '1' }
    });
    fireEvent.change(screen.getByLabelText('Fecha'), {
      target: { value: '2024-12-31' }
    });
    
    // Submit
    fireEvent.click(screen.getByRole('button', { name: 'Reservar Cita' }));
    
    // Verify success
    await waitFor(() => {
      expect(screen.getByText('Cita reservada con éxito!')).toBeInTheDocument();
    });
  });
});
```

#### **E2E Tests**
```javascript
// Test de usuario completo
describe('User Journey', () => {
  it('should complete full appointment booking flow', () => {
    cy.visit('/');
    
    // Login
    cy.get('[data-testid="email-input"]').type('paciente@demo.com');
    cy.get('[data-testid="password-input"]').type('paciente123');
    cy.get('[data-testid="login-button"]').click();
    
    // Navigate to appointment
    cy.get('[data-testid="book-appointment"]').click();
    
    // Fill form
    cy.get('[data-testid="doctor-select"]').select('Dr. Ana García');
    cy.get('[data-testid="date-input"]').type('2024-12-31');
    cy.get('[data-testid="time-select"]').select('10:00');
    cy.get('[data-testid="reason-select"]').select('Consulta de rutina');
    
    // Submit
    cy.get('[data-testid="submit-button"]').click();
    
    // Verify success
    cy.get('[data-testid="success-message"]').should('be.visible');
  });
});
```

---

## 🎯 **Conclusión**

Esta documentación técnica proporciona un análisis completo de todos los componentes del sistema, incluyendo:

- ✅ **Estructura detallada** de cada componente
- ✅ **Análisis de props y estados**
- ✅ **Patrones de diseño implementados**
- ✅ **Optimizaciones aplicadas**
- ✅ **Estrategias de testing**

**Beneficios de esta arquitectura:**
- **Mantenibilidad**: Código bien estructurado y documentado
- **Escalabilidad**: Patrones que permiten crecimiento
- **Testabilidad**: Componentes aislados y testeable
- **Reutilización**: Componentes modulares y reutilizables

---

*Documentación técnica generada automáticamente - Análisis de Componentes*
