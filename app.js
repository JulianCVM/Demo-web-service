// 🏥 Aplicación Frontend - Cliente del Servicio Web
// Este archivo maneja la interfaz de usuario y las llamadas a la API

class MedicalAppointmentApp {
    constructor() {
        this.api = window.medicalAPI;
        this.currentTab = 'register';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.logAPIInfo();
    }

    setupEventListeners() {
        // Formulario de registro de paciente
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.registerPatient();
        });

        // Formulario de consulta de disponibilidad
        document.getElementById('availabilityForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.checkAvailability();
        });

        // Formulario de reserva de cita
        document.getElementById('bookForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.bookAppointment();
        });

        // Formulario de historial
        document.getElementById('historyForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.getPatientHistory();
        });

        // Formulario de cancelación
        document.getElementById('cancelForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.cancelAppointment();
        });
    }

    // Mostrar información de la API al cargar
    logAPIInfo() {
        this.logAPICall('INFO', 'Sistema iniciado', 'Servicio Web de Citas Médicas cargado correctamente');
    }

    // Función para cambiar de pestaña
    showTab(tabName) {
        // Ocultar todas las pestañas
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        // Remover clase active de todos los botones
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Mostrar la pestaña seleccionada
        document.getElementById(tabName).classList.add('active');
        
        // Activar el botón correspondiente
        event.target.classList.add('active');
        
        this.currentTab = tabName;
    }

    // Registrar nuevo paciente
    async registerPatient() {
        const formData = {
            name: document.getElementById('patientName').value,
            email: document.getElementById('patientEmail').value,
            idNumber: document.getElementById('patientId').value
        };

        this.logAPICall('POST', '/api/pacientes', JSON.stringify(formData, null, 2));

        try {
            const response = await this.api.registerPatient(formData);
            
            if (response.success) {
                this.showResult('registerResult', 
                    `✅ Paciente registrado exitosamente!\n\n` +
                    `ID del Paciente: ${response.data.id}\n` +
                    `Nombre: ${response.data.name}\n` +
                    `Email: ${response.data.email}\n` +
                    `Identificación: ${response.data.idNumber}\n\n` +
                    `📡 Respuesta del API:\n${JSON.stringify(response, null, 2)}`, 
                    'success'
                );
                this.logAPICall('RESPONSE', 'POST /api/pacientes', JSON.stringify(response, null, 2));
            } else {
                this.showResult('registerResult', 
                    `❌ Error: ${response.error}\n\n` +
                    `📡 Respuesta del API:\n${JSON.stringify(response, null, 2)}`, 
                    'error'
                );
                this.logAPICall('ERROR', 'POST /api/pacientes', JSON.stringify(response, null, 2));
            }
        } catch (error) {
            this.showResult('registerResult', `❌ Error de conexión: ${error.message}`, 'error');
        }
    }

    // Consultar disponibilidad
    async checkAvailability() {
        const doctorId = document.getElementById('doctor').value;
        const date = document.getElementById('date').value;

        this.logAPICall('GET', `/api/medicos/${doctorId}/disponibilidad?fecha=${date}`, '');

        try {
            const response = await this.api.getDoctorAvailability(doctorId, date);
            
            if (response.success) {
                const slots = response.data.availableSlots;
                const slotsText = slots.length > 0 ? slots.join(', ') : 'No hay horarios disponibles';
                
                this.showResult('availabilityResult', 
                    `📅 Disponibilidad del ${response.data.doctor.name}\n` +
                    `Especialidad: ${response.data.doctor.specialty}\n` +
                    `Fecha: ${response.data.date}\n\n` +
                    `🕐 Horarios disponibles: ${slotsText}\n\n` +
                    `📡 Respuesta del API:\n${JSON.stringify(response, null, 2)}`, 
                    'success'
                );
                this.logAPICall('RESPONSE', `GET /api/medicos/${doctorId}/disponibilidad`, JSON.stringify(response, null, 2));
            } else {
                this.showResult('availabilityResult', 
                    `❌ Error: ${response.error}\n\n` +
                    `📡 Respuesta del API:\n${JSON.stringify(response, null, 2)}`, 
                    'error'
                );
                this.logAPICall('ERROR', `GET /api/medicos/${doctorId}/disponibilidad`, JSON.stringify(response, null, 2));
            }
        } catch (error) {
            this.showResult('availabilityResult', `❌ Error de conexión: ${error.message}`, 'error');
        }
    }

    // Reservar cita
    async bookAppointment() {
        const appointmentData = {
            patientId: document.getElementById('bookPatientId').value,
            doctorId: document.getElementById('bookDoctor').value,
            date: document.getElementById('bookDate').value,
            time: document.getElementById('bookTime').value
        };

        this.logAPICall('POST', '/api/citas', JSON.stringify(appointmentData, null, 2));

        try {
            const response = await this.api.bookAppointment(appointmentData);
            
            if (response.success) {
                this.showResult('bookResult', 
                    `✅ Cita reservada exitosamente!\n\n` +
                    `ID de la Cita: ${response.data.appointment.id}\n` +
                    `Paciente: ${response.data.patient.name}\n` +
                    `Médico: ${response.data.doctor.name}\n` +
                    `Fecha: ${response.data.appointment.date}\n` +
                    `Hora: ${response.data.appointment.time}\n` +
                    `Estado: ${response.data.appointment.status}\n\n` +
                    `📡 Respuesta del API:\n${JSON.stringify(response, null, 2)}`, 
                    'success'
                );
                this.logAPICall('RESPONSE', 'POST /api/citas', JSON.stringify(response, null, 2));
            } else {
                this.showResult('bookResult', 
                    `❌ Error: ${response.error}\n\n` +
                    `📡 Respuesta del API:\n${JSON.stringify(response, null, 2)}`, 
                    'error'
                );
                this.logAPICall('ERROR', 'POST /api/citas', JSON.stringify(response, null, 2));
            }
        } catch (error) {
            this.showResult('bookResult', `❌ Error de conexión: ${error.message}`, 'error');
        }
    }

    // Obtener historial de citas
    async getPatientHistory() {
        const patientId = document.getElementById('historyPatientId').value;

        this.logAPICall('GET', `/api/citas/paciente/${patientId}`, '');

        try {
            const response = await this.api.getPatientHistory(patientId);
            
            if (response.success) {
                let historyText = `📋 Historial de Citas\n\n` +
                    `Paciente: ${response.data.patient.name}\n` +
                    `Email: ${response.data.patient.email}\n` +
                    `ID: ${response.data.patient.id}\n\n`;

                if (response.data.appointments.length === 0) {
                    historyText += `No se encontraron citas registradas.\n\n`;
                } else {
                    historyText += `📅 Citas registradas:\n\n`;
                    response.data.appointments.forEach(apt => {
                        const statusEmoji = apt.status === 'active' ? '🟢' : 
                                           apt.status === 'completed' ? '✅' : '❌';
                        historyText += `${statusEmoji} Cita ${apt.id}\n` +
                                     `   Médico: ${apt.doctor.name} (${apt.doctor.specialty})\n` +
                                     `   Fecha: ${apt.date} a las ${apt.time}\n` +
                                     `   Estado: ${apt.status}\n\n`;
                    });
                }

                historyText += `📡 Respuesta del API:\n${JSON.stringify(response, null, 2)}`;

                this.showResult('historyResult', historyText, 'success');
                this.logAPICall('RESPONSE', `GET /api/citas/paciente/${patientId}`, JSON.stringify(response, null, 2));
            } else {
                this.showResult('historyResult', 
                    `❌ Error: ${response.error}\n\n` +
                    `📡 Respuesta del API:\n${JSON.stringify(response, null, 2)}`, 
                    'error'
                );
                this.logAPICall('ERROR', `GET /api/citas/paciente/${patientId}`, JSON.stringify(response, null, 2));
            }
        } catch (error) {
            this.showResult('historyResult', `❌ Error de conexión: ${error.message}`, 'error');
        }
    }

    // Cancelar cita
    async cancelAppointment() {
        const appointmentId = document.getElementById('cancelAppointmentId').value;

        this.logAPICall('DELETE', `/api/citas/${appointmentId}`, '');

        try {
            const response = await this.api.cancelAppointment(appointmentId);
            
            if (response.success) {
                this.showResult('cancelResult', 
                    `✅ Cita cancelada exitosamente!\n\n` +
                    `ID de la Cita: ${response.data.appointment.id}\n` +
                    `Paciente: ${response.data.patient.name}\n` +
                    `Médico: ${response.data.doctor.name}\n` +
                    `Fecha: ${response.data.appointment.date}\n` +
                    `Hora: ${response.data.appointment.time}\n` +
                    `Estado: ${response.data.appointment.status}\n\n` +
                    `📡 Respuesta del API:\n${JSON.stringify(response, null, 2)}`, 
                    'success'
                );
                this.logAPICall('RESPONSE', `DELETE /api/citas/${appointmentId}`, JSON.stringify(response, null, 2));
            } else {
                this.showResult('cancelResult', 
                    `❌ Error: ${response.error}\n\n` +
                    `📡 Respuesta del API:\n${JSON.stringify(response, null, 2)}`, 
                    'error'
                );
                this.logAPICall('ERROR', `DELETE /api/citas/${appointmentId}`, JSON.stringify(response, null, 2));
            }
        } catch (error) {
            this.showResult('cancelResult', `❌ Error de conexión: ${error.message}`, 'error');
        }
    }

    // Mostrar resultado en la interfaz
    showResult(elementId, message, type) {
        const element = document.getElementById(elementId);
        element.textContent = message;
        element.className = `result ${type}`;
    }

    // Registrar llamadas a la API para el panel de debug
    logAPICall(method, url, data) {
        const apiCallsContainer = document.getElementById('apiCalls');
        const callElement = document.createElement('div');
        callElement.className = 'api-call';
        
        const timestamp = new Date().toLocaleTimeString();
        const methodClass = method === 'ERROR' ? 'error' : method === 'RESPONSE' ? 'success' : 'info';
        
        callElement.innerHTML = `
            <div class="method">[${timestamp}] ${method}</div>
            <div class="url">${url}</div>
            ${data ? `<div class="response">${data}</div>` : ''}
        `;
        
        apiCallsContainer.insertBefore(callElement, apiCallsContainer.firstChild);
        
        // Mantener solo las últimas 10 llamadas
        while (apiCallsContainer.children.length > 10) {
            apiCallsContainer.removeChild(apiCallsContainer.lastChild);
        }
    }
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MedicalAppointmentApp();
});

// Función global para cambiar pestañas (llamada desde HTML)
function showTab(tabName) {
    window.app.showTab(tabName);
}
