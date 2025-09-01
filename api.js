// 🏥 Servicio Web de Citas Médicas - API REST Simulada
// Este archivo simula un backend completo con datos ficticios

class MedicalAppointmentAPI {
    constructor() {
        // Base de datos simulada
        this.patients = [
            { id: "P001", name: "Juan Pérez", email: "juan.perez@email.com", idNumber: "12345678" },
            { id: "P002", name: "María García", email: "maria.garcia@email.com", idNumber: "87654321" },
            { id: "P003", name: "Carlos López", email: "carlos.lopez@email.com", idNumber: "11223344" }
        ];

        this.doctors = [
            { id: "dr-garcia", name: "Dr. García", specialty: "Cardiología" },
            { id: "dr-martinez", name: "Dr. Martínez", specialty: "Pediatría" },
            { id: "dr-rodriguez", name: "Dr. Rodríguez", specialty: "Medicina General" }
        ];

        this.appointments = [
            { 
                id: "A001", 
                patientId: "P001", 
                doctorId: "dr-garcia", 
                date: "2024-01-15", 
                time: "09:00", 
                status: "active" 
            },
            { 
                id: "A002", 
                patientId: "P002", 
                doctorId: "dr-martinez", 
                date: "2024-01-16", 
                time: "10:00", 
                status: "active" 
            },
            { 
                id: "A003", 
                patientId: "P001", 
                doctorId: "dr-rodriguez", 
                date: "2024-01-10", 
                time: "14:00", 
                status: "completed" 
            }
        ];

        this.availableSlots = [
            { doctorId: "dr-garcia", date: "2024-01-20", time: "09:00", available: true },
            { doctorId: "dr-garcia", date: "2024-01-20", time: "10:00", available: true },
            { doctorId: "dr-garcia", date: "2024-01-20", time: "11:00", available: false },
            { doctorId: "dr-garcia", date: "2024-01-20", time: "14:00", available: true },
            { doctorId: "dr-martinez", date: "2024-01-20", time: "09:00", available: true },
            { doctorId: "dr-martinez", date: "2024-01-20", time: "10:00", available: false },
            { doctorId: "dr-martinez", date: "2024-01-20", time: "11:00", available: true },
            { doctorId: "dr-rodriguez", date: "2024-01-20", time: "09:00", available: true },
            { doctorId: "dr-rodriguez", date: "2024-01-20", time: "15:00", available: true },
            { doctorId: "dr-rodriguez", date: "2024-01-20", time: "16:00", available: true }
        ];

        this.nextPatientId = 4;
        this.nextAppointmentId = 4;
    }

    // Simular delay de red
    async delay(ms = 500) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Registrar nuevo paciente
    async registerPatient(patientData) {
        await this.delay();
        
        const { name, email, idNumber } = patientData;
        
        // Validar que no exista el paciente
        const existingPatient = this.patients.find(p => 
            p.idNumber === idNumber || p.email === email
        );
        
        if (existingPatient) {
            return {
                success: false,
                error: "Ya existe un paciente con esta identificación o email",
                status: 400
            };
        }

        const newPatient = {
            id: `P${String(this.nextPatientId).padStart(3, '0')}`,
            name,
            email,
            idNumber
        };

        this.patients.push(newPatient);
        this.nextPatientId++;

        return {
            success: true,
            data: newPatient,
            message: "Paciente registrado exitosamente",
            status: 201
        };
    }

    // Consultar disponibilidad de médicos
    async getDoctorAvailability(doctorId, date) {
        await this.delay();
        
        const doctor = this.doctors.find(d => d.id === doctorId);
        if (!doctor) {
            return {
                success: false,
                error: "Médico no encontrado",
                status: 404
            };
        }

        const availableSlots = this.availableSlots.filter(slot => 
            slot.doctorId === doctorId && 
            slot.date === date && 
            slot.available
        );

        return {
            success: true,
            data: {
                doctor: doctor,
                date: date,
                availableSlots: availableSlots.map(slot => slot.time)
            },
            status: 200
        };
    }

    // Reservar una cita
    async bookAppointment(appointmentData) {
        await this.delay();
        
        const { patientId, doctorId, date, time } = appointmentData;
        
        // Validar que el paciente existe
        const patient = this.patients.find(p => p.id === patientId);
        if (!patient) {
            return {
                success: false,
                error: "Paciente no encontrado",
                status: 404
            };
        }

        // Validar que el médico existe
        const doctor = this.doctors.find(d => d.id === doctorId);
        if (!doctor) {
            return {
                success: false,
                error: "Médico no encontrado",
                status: 404
            };
        }

        // Validar disponibilidad
        const slot = this.availableSlots.find(s => 
            s.doctorId === doctorId && 
            s.date === date && 
            s.time === time
        );

        if (!slot || !slot.available) {
            return {
                success: false,
                error: "Horario no disponible",
                status: 400
            };
        }

        // Crear la cita
        const newAppointment = {
            id: `A${String(this.nextAppointmentId).padStart(3, '0')}`,
            patientId,
            doctorId,
            date,
            time,
            status: "active"
        };

        this.appointments.push(newAppointment);
        slot.available = false;
        this.nextAppointmentId++;

        return {
            success: true,
            data: {
                appointment: newAppointment,
                patient: patient,
                doctor: doctor
            },
            message: "Cita reservada exitosamente",
            status: 201
        };
    }

    // Obtener historial de citas de un paciente
    async getPatientHistory(patientId) {
        await this.delay();
        
        const patient = this.patients.find(p => p.id === patientId);
        if (!patient) {
            return {
                success: false,
                error: "Paciente no encontrado",
                status: 404
            };
        }

        const patientAppointments = this.appointments
            .filter(apt => apt.patientId === patientId)
            .map(apt => {
                const doctor = this.doctors.find(d => d.id === apt.doctorId);
                return {
                    ...apt,
                    doctor: doctor
                };
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        return {
            success: true,
            data: {
                patient: patient,
                appointments: patientAppointments
            },
            status: 200
        };
    }

    // Cancelar una cita
    async cancelAppointment(appointmentId) {
        await this.delay();
        
        const appointment = this.appointments.find(apt => apt.id === appointmentId);
        if (!appointment) {
            return {
                success: false,
                error: "Cita no encontrada",
                status: 404
            };
        }

        if (appointment.status === "cancelled") {
            return {
                success: false,
                error: "La cita ya está cancelada",
                status: 400
            };
        }

        if (appointment.status === "completed") {
            return {
                success: false,
                error: "No se puede cancelar una cita completada",
                status: 400
            };
        }

        // Cancelar la cita
        appointment.status = "cancelled";

        // Liberar el horario
        const slot = this.availableSlots.find(s => 
            s.doctorId === appointment.doctorId && 
            s.date === appointment.date && 
            s.time === appointment.time
        );
        if (slot) {
            slot.available = true;
        }

        const doctor = this.doctors.find(d => d.id === appointment.doctorId);
        const patient = this.patients.find(p => p.id === appointment.patientId);

        return {
            success: true,
            data: {
                appointment: appointment,
                doctor: doctor,
                patient: patient
            },
            message: "Cita cancelada exitosamente",
            status: 200
        };
    }

    // Obtener lista de médicos
    async getDoctors() {
        await this.delay(200);
        return {
            success: true,
            data: this.doctors,
            status: 200
        };
    }

    // Obtener lista de pacientes
    async getPatients() {
        await this.delay(200);
        return {
            success: true,
            data: this.patients,
            status: 200
        };
    }
}

// Crear instancia global de la API
window.medicalAPI = new MedicalAppointmentAPI();
