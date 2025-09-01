# 🏥 Demo - Servicio Web de Citas Médicas

## 📋 Descripción del Proyecto

Este es un **demo completo y funcional** de un servicio web para la gestión de citas médicas online. La aplicación simula tanto el **frontend** (interfaz web) como el **backend** (API REST) para demostrar cómo funcionan los servicios web en la práctica.

## 🎯 Objetivo Educativo

Este demo está diseñado para presentar en clase y mostrar:
- ✅ Qué es un servicio web
- ✅ Cómo funciona una API REST
- ✅ Comunicación cliente-servidor
- ✅ Formato JSON para intercambio de datos
- ✅ Casos de uso reales de servicios web

## 🚀 Funcionalidades Implementadas

### 1. **Registrar Pacientes**
- Endpoint: `POST /api/pacientes`
- Permite registrar nuevos pacientes con nombre, email e identificación
- Validación de datos duplicados

### 2. **Consultar Disponibilidad**
- Endpoint: `GET /api/medicos/{id}/disponibilidad?fecha={fecha}`
- Muestra horarios disponibles de médicos por fecha
- Simula disponibilidad real con horarios predefinidos

### 3. **Reservar Citas**
- Endpoint: `POST /api/citas`
- Permite reservar citas médicas
- Valida disponibilidad y existencia de paciente/médico

### 4. **Consultar Historial**
- Endpoint: `GET /api/citas/paciente/{id}`
- Muestra todas las citas de un paciente
- Incluye estado de las citas (activa, completada, cancelada)

### 5. **Cancelar Citas**
- Endpoint: `DELETE /api/citas/{id}`
- Permite cancelar citas activas
- Libera el horario para otros pacientes

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend Simulado**: JavaScript (API REST simulada)
- **Formato de Datos**: JSON
- **Estilo**: CSS moderno con gradientes y animaciones

## 📁 Estructura del Proyecto

```
Demo-web-service/
├── index.html          # Página principal con interfaz de usuario
├── styles.css          # Estilos CSS para la interfaz
├── api.js             # Backend simulado (API REST)
├── app.js             # Frontend (cliente del servicio web)
└── README.md          # Documentación del proyecto
```

## 🎮 Cómo Usar la Demo

### Paso 1: Abrir la Aplicación
1. Abre el archivo `index.html` en cualquier navegador web
2. La aplicación se cargará automáticamente

### Paso 2: Probar las Funcionalidades

#### 👤 Registrar un Paciente
1. Ve a la pestaña "Registrar Paciente"
2. Completa el formulario con datos ficticios
3. Haz clic en "Registrar Paciente"
4. Observa la respuesta del API en formato JSON

#### 📅 Consultar Disponibilidad
1. Ve a la pestaña "Consultar Disponibilidad"
2. Selecciona un médico y una fecha
3. Haz clic en "Consultar Disponibilidad"
4. Ve los horarios disponibles

#### 📝 Reservar una Cita
1. Ve a la pestaña "Reservar Cita"
2. Usa un ID de paciente existente (P001, P002, P003)
3. Selecciona médico, fecha y hora
4. Haz clic en "Reservar Cita"

#### 📋 Ver Historial
1. Ve a la pestaña "Historial de Citas"
2. Ingresa un ID de paciente (P001, P002, P003)
3. Haz clic en "Consultar Historial"

#### ❌ Cancelar Cita
1. Ve a la pestaña "Cancelar Cita"
2. Ingresa un ID de cita (A001, A002, A003)
3. Haz clic en "Cancelar Cita"

## 🔍 Panel de Debug - Llamadas API

En la parte inferior de la aplicación encontrarás un **panel de debug** que muestra:
- ✅ Todas las llamadas HTTP realizadas
- ✅ Métodos (GET, POST, DELETE)
- ✅ URLs de los endpoints
- ✅ Datos enviados y respuestas recibidas
- ✅ Timestamps de cada operación

## 📊 Datos de Prueba Incluidos

### Pacientes Predefinidos:
- **P001**: Juan Pérez (juan.perez@email.com)
- **P002**: María García (maria.garcia@email.com)
- **P003**: Carlos López (carlos.lopez@email.com)

### Médicos Disponibles:
- **Dr. García**: Cardiología
- **Dr. Martínez**: Pediatría
- **Dr. Rodríguez**: Medicina General

### Citas de Ejemplo:
- **A001**: Juan Pérez con Dr. García (15/01/2024, 09:00)
- **A002**: María García con Dr. Martínez (16/01/2024, 10:00)
- **A003**: Juan Pérez con Dr. Rodríguez (10/01/2024, 14:00) - Completada

## 🎓 Puntos Clave para la Presentación

### 1. **Arquitectura Cliente-Servidor**
- El frontend (HTML/JS) consume el backend (API)
- Separación clara de responsabilidades
- Comunicación mediante HTTP/JSON

### 2. **API REST**
- Endpoints bien definidos
- Métodos HTTP semánticos (GET, POST, DELETE)
- Respuestas en formato JSON
- Códigos de estado HTTP apropiados

### 3. **Casos de Uso Reales**
- Sistema médico real y comprensible
- Flujo completo de negocio
- Validaciones y manejo de errores

### 4. **Interfaz Intuitiva**
- Diseño moderno y responsive
- Pestañas organizadas por funcionalidad
- Feedback visual inmediato
- Panel de debug para transparencia técnica

## 🚀 Cómo Presentar en Clase

### 1. **Introducción (5 min)**
- Explicar qué es un servicio web
- Mostrar la interfaz de la aplicación
- Explicar el contexto: sistema de citas médicas

### 2. **Demo en Vivo (15 min)**
- Registrar un nuevo paciente
- Consultar disponibilidad de médicos
- Reservar una cita
- Mostrar el historial
- Cancelar una cita
- **Destacar el panel de debug** para mostrar las llamadas API

### 3. **Explicación Técnica (10 min)**
- Mostrar el código del backend (api.js)
- Explicar los endpoints REST
- Mostrar el formato JSON
- Explicar la comunicación cliente-servidor

### 4. **Preguntas y Respuestas (5 min)**
- Permitir que los estudiantes prueben la demo
- Responder preguntas técnicas
- Explicar casos de uso adicionales

## 💡 Extensiones Posibles

Para futuras versiones, se podrían agregar:
- 🔐 Autenticación de usuarios
- 📧 Notificaciones por email
- 📱 Versión móvil
- 🗄️ Base de datos real
- 📊 Reportes y estadísticas
- 🔄 Sincronización en tiempo real

## 🎯 Conclusión

Este demo proporciona una **experiencia práctica completa** de cómo funcionan los servicios web, permitiendo a los estudiantes:
- Ver la teoría aplicada en un caso real
- Interactuar con una API REST
- Entender el flujo de datos JSON
- Comprender la arquitectura cliente-servidor

¡Perfecto para una presentación educativa efectiva! 🚀
