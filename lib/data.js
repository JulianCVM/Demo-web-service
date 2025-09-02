// Datos simulados para la demo del sistema de citas médicas

export const demoUsers = {
  admin: {
    id: 1,
    name: "Dr. María González",
    email: "admin@demo.com",
    role: "admin",
    avatar: "👩‍⚕️"
  },
  doctor: {
    id: 2,
    name: "Dr. Carlos Rodríguez",
    email: "doctor@demo.com",
    role: "doctor",
    specialty: "Cardiología",
    avatar: "👨‍⚕️"
  },
  patient: {
    id: 3,
    name: "Ana Martínez",
    email: "paciente@demo.com",
    role: "patient",
    avatar: "👤"
  }
};

export const demoDoctors = [
  {
    id: 1,
    name: "Dr. María González",
    specialty: "Medicina General",
    email: "maria.gonzalez@demo.com",
    phone: "+1 234-567-8901",
    consultation_room: "101",
    experience_years: 15,
    university: "Universidad Nacional",
    schedule: [
      { day_of_week: "lunes", start_time: "08:00", end_time: "17:00" },
      { day_of_week: "martes", start_time: "08:00", end_time: "17:00" },
      { day_of_week: "miércoles", start_time: "08:00", end_time: "17:00" },
      { day_of_week: "jueves", start_time: "08:00", end_time: "17:00" },
      { day_of_week: "viernes", start_time: "08:00", end_time: "15:00" }
    ]
  },
  {
    id: 2,
    name: "Dr. Carlos Rodríguez",
    specialty: "Cardiología",
    email: "carlos.rodriguez@demo.com",
    phone: "+1 234-567-8902",
    consultation_room: "102",
    experience_years: 12,
    university: "Universidad de Medicina",
    schedule: [
      { day_of_week: "lunes", start_time: "09:00", end_time: "18:00" },
      { day_of_week: "martes", start_time: "09:00", end_time: "18:00" },
      { day_of_week: "miércoles", start_time: "09:00", end_time: "18:00" },
      { day_of_week: "jueves", start_time: "09:00", end_time: "18:00" },
      { day_of_week: "viernes", start_time: "09:00", end_time: "16:00" }
    ]
  },
  {
    id: 3,
    name: "Dra. Laura Sánchez",
    specialty: "Pediatría",
    email: "laura.sanchez@demo.com",
    phone: "+1 234-567-8903",
    consultation_room: "103",
    experience_years: 8,
    university: "Instituto Pediátrico",
    schedule: [
      { day_of_week: "lunes", start_time: "08:30", end_time: "16:30" },
      { day_of_week: "martes", start_time: "08:30", end_time: "16:30" },
      { day_of_week: "miércoles", start_time: "08:30", end_time: "16:30" },
      { day_of_week: "jueves", start_time: "08:30", end_time: "16:30" },
      { day_of_week: "viernes", start_time: "08:30", end_time: "14:30" }
    ]
  },
  {
    id: 4,
    name: "Dr. Miguel Torres",
    specialty: "Dermatología",
    email: "miguel.torres@demo.com",
    phone: "+1 234-567-8904",
    consultation_room: "104",
    experience_years: 10,
    university: "Centro Dermatológico",
    schedule: [
      { day_of_week: "lunes", start_time: "10:00", end_time: "19:00" },
      { day_of_week: "martes", start_time: "10:00", end_time: "19:00" },
      { day_of_week: "miércoles", start_time: "10:00", end_time: "19:00" },
      { day_of_week: "jueves", start_time: "10:00", end_time: "19:00" },
      { day_of_week: "viernes", start_time: "10:00", end_time: "17:00" }
    ]
  },
  {
    id: 5,
    name: "Dra. Elena Vargas",
    specialty: "Ginecología",
    email: "elena.vargas@demo.com",
    phone: "+1 234-567-8905",
    consultation_room: "105",
    experience_years: 14,
    university: "Hospital de la Mujer",
    schedule: [
      { day_of_week: "lunes", start_time: "07:00", end_time: "16:00" },
      { day_of_week: "martes", start_time: "07:00", end_time: "16:00" },
      { day_of_week: "miércoles", start_time: "07:00", end_time: "16:00" },
      { day_of_week: "jueves", start_time: "07:00", end_time: "16:00" },
      { day_of_week: "viernes", start_time: "07:00", end_time: "15:00" }
    ]
  }
];

export const demoAppointments = [
  {
    id: 1,
    patient_name: "Ana Martínez",
    doctor_name: "Dr. María González",
    doctor_id: 1,
    specialty: "Medicina General",
    appointment_date: "2024-01-15T10:00:00",
    reason: "Consulta General",
    notes: "Revisión de rutina",
    status: "scheduled"
  },
  {
    id: 2,
    patient_name: "Ana Martínez",
    doctor_name: "Dr. Carlos Rodríguez",
    doctor_id: 2,
    specialty: "Cardiología",
    appointment_date: "2024-01-20T14:30:00",
    reason: "Síntomas Específicos",
    notes: "Dolor en el pecho",
    status: "scheduled"
  },
  {
    id: 3,
    patient_name: "Ana Martínez",
    doctor_name: "Dra. Laura Sánchez",
    doctor_id: 3,
    specialty: "Pediatría",
    appointment_date: "2024-01-10T09:00:00",
    reason: "Revisión",
    notes: "Consulta para el niño",
    status: "completed"
  },
  {
    id: 4,
    patient_name: "Ana Martínez",
    doctor_name: "Dr. Miguel Torres",
    doctor_id: 4,
    specialty: "Dermatología",
    appointment_date: "2024-01-25T11:00:00",
    reason: "Consulta General",
    notes: "Revisión de piel",
    status: "scheduled"
  }
];

export const availableTimeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00"
];

export const appointmentReasons = [
  "Consulta General",
  "Revisión",
  "Síntomas Específicos",
  "Seguimiento",
  "Emergencia"
];

// Funciones utilitarias para la demo
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status) => {
  const colors = {
    scheduled: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    in_progress: 'bg-blue-100 text-blue-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getStatusText = (status) => {
  const texts = {
    scheduled: 'Programada',
    completed: 'Completada',
    cancelled: 'Cancelada',
    in_progress: 'En Progreso',
  };
  return texts[status] || status;
};

export const getSpecialtyIcon = (specialty) => {
  // Esta función ahora retorna un string para compatibilidad
  // Los iconos reales se manejan en los componentes
  return specialty || 'General';
};

export const getRoleColor = (role) => {
  const colors = {
    admin: 'bg-slate-100 text-slate-800',
    doctor: 'bg-blue-100 text-blue-800',
    patient: 'bg-gray-100 text-gray-800',
  };
  return colors[role] || 'bg-gray-100 text-gray-800';
};
