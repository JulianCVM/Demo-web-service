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
3. Observa el **Panel de Debug** en la parte inferior - aquí verás todas las llamadas API

---

## 🎯 **FLUJO COMPLETO DE CASO DE USO**
### *Sigue este paso a paso para probar toda la API*

### **📋 Escenario: "María quiere agendar una cita médica"**

---

### **PASO 1: 👤 Registrar un Nuevo Paciente**
**Objetivo**: Crear un nuevo paciente en el sistema

1. **Ve a la pestaña "Registrar Paciente"**
2. **Completa el formulario con estos datos:**
   - **Nombre Completo**: `María González`
   - **Correo Electrónico**: `maria.gonzalez@email.com`
   - **Identificación**: `98765432`
3. **Haz clic en "Registrar Paciente"**
4. **Observa los resultados:**
   - ✅ Verás el mensaje de éxito
   - 📡 En el panel de debug verás: `POST /api/pacientes`
   - 💾 **Anota el ID del paciente** (ej: P004) - lo necesitarás después

**🔍 ¿Qué está pasando?**
- El frontend envía una petición POST al endpoint `/api/pacientes`
- El backend valida que no exista un paciente con esa identificación o email
- Se crea un nuevo paciente con un ID único
- Se devuelve la respuesta en formato JSON

---

### **PASO 2: 📅 Consultar Disponibilidad de Médicos**
**Objetivo**: Ver qué horarios están disponibles para un médico específico

1. **Ve a la pestaña "Consultar Disponibilidad"**
2. **Selecciona:**
   - **Médico**: `Dr. García - Cardiología`
   - **Fecha**: `2024-01-20` (o cualquier fecha futura)
3. **Haz clic en "Consultar Disponibilidad"**
4. **Observa los resultados:**
   - ✅ Verás los horarios disponibles (ej: 09:00, 10:00, 14:00)
   - 📡 En el panel de debug verás: `GET /api/medicos/dr-garcia/disponibilidad?fecha=2024-01-20`

**🔍 ¿Qué está pasando?**
- El frontend hace una petición GET al endpoint `/api/medicos/{id}/disponibilidad`
- El backend consulta la base de datos de horarios disponibles
- Se devuelven solo los horarios que están libres para ese médico y fecha

---

### **PASO 3: 📝 Reservar una Cita Médica**
**Objetivo**: Agendar una cita usando el paciente recién creado

1. **Ve a la pestaña "Reservar Cita"**
2. **Completa el formulario:**
   - **ID del Paciente**: `P004` (el ID que obtuviste en el Paso 1)
   - **Médico**: `Dr. García - Cardiología`
   - **Fecha**: `2024-01-20` (la misma fecha del Paso 2)
   - **Hora**: `09:00` (uno de los horarios disponibles del Paso 2)
3. **Haz clic en "Reservar Cita"**
4. **Observa los resultados:**
   - ✅ Verás el mensaje de éxito con todos los detalles de la cita
   - 📡 En el panel de debug verás: `POST /api/citas`
   - 💾 **Anota el ID de la cita** (ej: A004) - lo necesitarás después

**🔍 ¿Qué está pasando?**
- El frontend envía una petición POST al endpoint `/api/citas`
- El backend valida que el paciente y médico existan
- Verifica que el horario esté disponible
- Crea la cita y marca el horario como ocupado
- Devuelve toda la información de la cita creada

---

### **PASO 4: 📋 Consultar Historial del Paciente**
**Objetivo**: Ver todas las citas que tiene el paciente

1. **Ve a la pestaña "Historial de Citas"**
2. **Ingresa el ID del Paciente**: `P004`
3. **Haz clic en "Consultar Historial"**
4. **Observa los resultados:**
   - ✅ Verás la información del paciente
   - 📅 Verás la cita que acabas de crear
   - 📡 En el panel de debug verás: `GET /api/citas/paciente/P004`

**🔍 ¿Qué está pasando?**
- El frontend hace una petición GET al endpoint `/api/citas/paciente/{id}`
- El backend busca todas las citas asociadas a ese paciente
- Se devuelven las citas ordenadas por fecha (más recientes primero)

---

### **PASO 5: ❌ Cancelar la Cita (Opcional)**
**Objetivo**: Cancelar la cita recién creada

1. **Ve a la pestaña "Cancelar Cita"**
2. **Ingresa el ID de la Cita**: `A004` (el ID que obtuviste en el Paso 3)
3. **Haz clic en "Cancelar Cita"**
4. **Observa los resultados:**
   - ✅ Verás el mensaje de confirmación de cancelación
   - 📡 En el panel de debug verás: `DELETE /api/citas/A004`

**🔍 ¿Qué está pasando?**
- El frontend envía una petición DELETE al endpoint `/api/citas/{id}`
- El backend cambia el estado de la cita a "cancelled"
- Libera el horario para que otros pacientes puedan usarlo

---

### **PASO 6: 🔄 Verificar el Historial Actualizado**
**Objetivo**: Confirmar que la cita fue cancelada

1. **Regresa a la pestaña "Historial de Citas"**
2. **Ingresa nuevamente el ID del Paciente**: `P004`
3. **Haz clic en "Consultar Historial"**
4. **Observa los resultados:**
   - ✅ Verás que la cita ahora aparece como "cancelled"
   - 📡 Se registra otra llamada GET al mismo endpoint

---

## 🧪 **PRUEBAS ADICIONALES RECOMENDADAS**

### **Prueba de Validaciones de Error:**

#### **Error 1: Paciente Duplicado**
1. Ve a "Registrar Paciente"
2. Intenta registrar un paciente con email `juan.perez@email.com` (ya existe)
3. ✅ Deberías ver un error: "Ya existe un paciente con esta identificación o email"

#### **Error 2: Horario No Disponible**
1. Ve a "Reservar Cita"
2. Intenta reservar con:
   - Paciente: `P001`
   - Médico: `Dr. García`
   - Fecha: `2024-01-20`
   - Hora: `11:00` (este horario está ocupado)
3. ✅ Deberías ver un error: "Horario no disponible"

#### **Error 3: Paciente No Encontrado**
1. Ve a "Reservar Cita"
2. Intenta reservar con ID de paciente: `P999` (no existe)
3. ✅ Deberías ver un error: "Paciente no encontrado"

#### **Error 4: Cita Ya Cancelada**
1. Ve a "Cancelar Cita"
2. Intenta cancelar la cita `A004` nuevamente
3. ✅ Deberías ver un error: "La cita ya está cancelada"

---

## 📊 **DATOS DE PRUEBA DISPONIBLES**

### **Pacientes Predefinidos (para pruebas rápidas):**
- **P001**: Juan Pérez (juan.perez@email.com) - ID: 12345678
- **P002**: María García (maria.garcia@email.com) - ID: 87654321  
- **P003**: Carlos López (carlos.lopez@email.com) - ID: 11223344

### **Médicos Disponibles:**
- **Dr. García**: Cardiología
- **Dr. Martínez**: Pediatría
- **Dr. Rodríguez**: Medicina General

### **Citas de Ejemplo:**
- **A001**: Juan Pérez con Dr. García (15/01/2024, 09:00) - Activa
- **A002**: María García con Dr. Martínez (16/01/2024, 10:00) - Activa
- **A003**: Juan Pérez con Dr. Rodríguez (10/01/2024, 14:00) - Completada

### **Horarios Disponibles (2024-01-20):**
- **Dr. García**: 09:00, 10:00, 14:00 (11:00 ocupado)
- **Dr. Martínez**: 09:00, 11:00 (10:00 ocupado)
- **Dr. Rodríguez**: 09:00, 15:00, 16:00

## 🔍 Panel de Debug - Llamadas API

En la parte inferior de la aplicación encontrarás un **panel de debug** que muestra:
- ✅ Todas las llamadas HTTP realizadas
- ✅ Métodos (GET, POST, DELETE)
- ✅ URLs de los endpoints
- ✅ Datos enviados y respuestas recibidas
- ✅ Timestamps de cada operación

## 🎓 **GUÍA DE PRESENTACIÓN EN CLASE**

### **📝 Script Sugerido para el Profesor:**

#### **1. Introducción (3 minutos)**
*"Hoy vamos a ver un ejemplo práctico de un servicio web. Imaginen que trabajamos en un hospital y necesitamos un sistema para que los pacientes puedan agendar citas médicas online. Esto es exactamente lo que vamos a demostrar."*

#### **2. Explicación del Concepto (2 minutos)**
*"Un servicio web es como un 'mesero digital' que toma pedidos (peticiones) de diferentes clientes (aplicaciones) y los lleva a la cocina (servidor) para procesarlos. En nuestro caso, el 'mesero' es la API REST que maneja las citas médicas."*

#### **3. Demo en Vivo (15 minutos)**
*"Vamos a seguir el flujo completo que un paciente real seguiría:"*

1. **Registrar paciente** - *"Primero necesitamos que María se registre en el sistema"*
2. **Consultar disponibilidad** - *"María quiere ver qué horarios tiene el Dr. García"*
3. **Reservar cita** - *"María selecciona un horario y confirma su cita"*
4. **Ver historial** - *"María puede ver todas sus citas"*
5. **Cancelar cita** - *"Si necesita cancelar, puede hacerlo fácilmente"*

**🔍 Durante la demo, destacar:**
- El **Panel de Debug** muestra todas las llamadas API en tiempo real
- Cada acción genera una petición HTTP específica
- Las respuestas vienen en formato JSON
- Los errores se manejan apropiadamente

#### **4. Explicación Técnica (8 minutos)**
*"Ahora veamos qué está pasando por detrás:"*

- **Mostrar el código del backend** (`api.js`)
- **Explicar los endpoints REST**:
  - `POST /api/pacientes` - Crear
  - `GET /api/medicos/{id}/disponibilidad` - Consultar
  - `POST /api/citas` - Crear
  - `GET /api/citas/paciente/{id}` - Consultar
  - `DELETE /api/citas/{id}` - Eliminar
- **Mostrar ejemplos de JSON** de peticiones y respuestas
- **Explicar códigos de estado HTTP** (200, 201, 400, 404)

#### **5. Interacción con Estudiantes (7 minutos)**
*"Ahora ustedes van a probar el sistema:"*

- **Permitir que los estudiantes usen la demo**
- **Sugerir que prueben los casos de error**
- **Responder preguntas técnicas**
- **Explicar casos de uso adicionales**

---

## 🎯 **PUNTOS CLAVE PARA DESTACAR**

### **1. Arquitectura Cliente-Servidor**
- **Frontend** (HTML/JS) = Interfaz de usuario
- **Backend** (API) = Lógica de negocio y datos
- **Comunicación** = HTTP/JSON

### **2. API REST**
- **Endpoints** bien definidos y semánticos
- **Métodos HTTP** con significado (GET, POST, DELETE)
- **Respuestas** consistentes en formato JSON
- **Códigos de estado** apropiados

### **3. Casos de Uso Reales**
- **Sistema médico** comprensible y relevante
- **Flujo completo** de negocio
- **Validaciones** y manejo de errores
- **Experiencia de usuario** intuitiva

### **4. Transparencia Técnica**
- **Panel de debug** muestra todo lo que pasa
- **Código visible** y comentado
- **Datos de prueba** incluidos
- **Fácil de entender** y modificar

## 🚀 **RESUMEN EJECUTIVO**

### **¿Qué es este proyecto?**
Una **demo completa y funcional** de un servicio web para gestión de citas médicas que simula tanto el frontend como el backend, diseñada específicamente para **presentaciones educativas**.

### **¿Por qué es útil?**
- ✅ **Demuestra conceptos reales** de servicios web
- ✅ **Interfaz intuitiva** que cualquiera puede usar
- ✅ **Código transparente** que se puede examinar
- ✅ **Casos de uso prácticos** del mundo real
- ✅ **Panel de debug** que muestra las llamadas API en tiempo real

### **¿Cómo usarlo?**
1. **Abrir** `index.html` en cualquier navegador
2. **Seguir** el flujo completo de caso de uso (6 pasos)
3. **Observar** el panel de debug para ver las llamadas API
4. **Probar** casos de error para entender las validaciones
5. **Presentar** en clase siguiendo la guía incluida

### **¿Qué aprenderán los estudiantes?**
- 🎯 **Qué es un servicio web** y cómo funciona
- 🎯 **Cómo se comunican** frontend y backend
- 🎯 **Qué es una API REST** y sus endpoints
- 🎯 **Formato JSON** para intercambio de datos
- 🎯 **Códigos de estado HTTP** y manejo de errores
- 🎯 **Arquitectura cliente-servidor** en la práctica

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
