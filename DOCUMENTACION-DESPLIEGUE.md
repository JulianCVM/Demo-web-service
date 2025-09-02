# 🚀 Documentación de Despliegue y Configuración
## Sistema de Citas Médicas - Guía Completa

---

## 📋 Tabla de Contenidos

1. [Configuración del Entorno](#1-configuración-del-entorno)
2. [Configuración de Vercel](#2-configuración-de-vercel)
3. [Configuración de Next.js](#3-configuración-de-nextjs)
4. [Configuración de Tailwind](#4-configuración-de-tailwind)
5. [Configuración de Git](#5-configuración-de-git)
6. [Proceso de Despliegue](#6-proceso-de-despliegue)
7. [Monitoreo y Mantenimiento](#7-monitoreo-y-mantenimiento)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Configuración del Entorno

### 🛠️ **Requisitos del Sistema**

#### **Node.js**
```bash
# Versión requerida
Node.js >= 16.0.0

# Verificar versión
node --version
npm --version
```

#### **Git**
```bash
# Verificar instalación
git --version

# Configurar usuario
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### 📦 **Instalación de Dependencias**

#### **Instalación Inicial**
```bash
# Clonar repositorio
git clone https://github.com/JulianCVM/Demo-web-service.git
cd Demo-web-service

# Instalar dependencias
npm install

# Verificar instalación
npm list
```

#### **Dependencias Principales**
```json
{
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "tailwindcss": "latest",
    "autoprefixer": "latest",
    "postcss": "latest",
    "react-icons": "^5.2.1"
  },
  "devDependencies": {
    "eslint": "latest",
    "eslint-config-next": "latest"
  }
}
```

### 🔧 **Scripts Disponibles**

```json
{
  "scripts": {
    "dev": "next dev",           // Servidor de desarrollo
    "build": "next build",       // Build de producción
    "start": "next start",       // Servidor de producción
    "lint": "next lint",         // Verificar código
    "export": "next build && next export"  // Export estático
  }
}
```

---

## 2. Configuración de Vercel

### ⚙️ **vercel.json**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "out"
      }
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 📝 **Explicación de la Configuración**

#### **Builds**
```json
{
  "src": "package.json",           // Archivo de entrada
  "use": "@vercel/static-build",   // Builder para sitios estáticos
  "config": {
    "distDir": "out"               // Directorio de salida
  }
}
```

#### **Routes**
```json
{
  "handle": "filesystem"           // Servir archivos estáticos primero
},
{
  "src": "/(.*)",                  // Todas las rutas
  "dest": "/index.html"            // Redirigir a index.html (SPA)
}
```

### 🌐 **Configuración de Dominio**

#### **Dominio Personalizado**
1. **En Vercel Dashboard:**
   - Ve a Project Settings
   - Selecciona "Domains"
   - Agrega tu dominio personalizado

2. **Configuración DNS:**
   ```
   Tipo: CNAME
   Nombre: www
   Valor: cname.vercel-dns.com
   
   Tipo: A
   Nombre: @
   Valor: 76.76.19.61
   ```

#### **Variables de Entorno**
```bash
# En Vercel Dashboard > Settings > Environment Variables
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://tu-dominio.com
```

---

## 3. Configuración de Next.js

### ⚙️ **next.config.js**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,           // Modo estricto de React
  swcMinify: true,                 // Minificación con SWC
  output: 'export',                // Generar sitio estático
  trailingSlash: true,             // Slash final para compatibilidad
  images: {
    unoptimized: true,             // Imágenes sin optimización
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  experimental: {
    esmExternals: false,           // Compatibilidad con módulos
  },
};

module.exports = nextConfig;
```

### 📝 **Explicación de Opciones**

#### **output: 'export'**
- Genera archivos estáticos en el directorio `out/`
- Compatible con hosting estático
- No requiere servidor Node.js

#### **trailingSlash: true**
- Agrega slash final a las URLs
- Mejora compatibilidad con servidores web
- Evita problemas de redirección

#### **images: { unoptimized: true }**
- Desactiva optimización de imágenes
- Necesario para export estático
- Las imágenes se sirven tal como están

#### **experimental: { esmExternals: false }**
- Desactiva módulos ES externos
- Mejora compatibilidad con bundlers
- Evita problemas de importación

### 🔧 **Configuraciones Adicionales**

#### **Headers de Seguridad**
```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
    },
  ];
}
```

#### **Redirects**
```javascript
async redirects() {
  return [
    {
      source: '/old-page',
      destination: '/new-page',
      permanent: true,
    },
  ];
}
```

---

## 4. Configuración de Tailwind

### ⚙️ **tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Source Sans Pro', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### 📝 **Explicación de la Configuración**

#### **content**
- Define dónde buscar clases de Tailwind
- Incluye todos los archivos de componentes
- Optimiza el bundle final

#### **theme.extend**
- Extiende el tema por defecto
- Agrega fuentes personalizadas
- Mantiene compatibilidad con Tailwind

### 🎨 **Configuraciones Personalizadas**

#### **Colores Personalizados**
```javascript
theme: {
  extend: {
    colors: {
      'medical-blue': '#2563eb',
      'medical-green': '#059669',
      'medical-red': '#dc2626',
    },
  },
}
```

#### **Espaciado Personalizado**
```javascript
theme: {
  extend: {
    spacing: {
      '18': '4.5rem',
      '88': '22rem',
    },
  },
}
```

#### **Breakpoints Personalizados**
```javascript
theme: {
  extend: {
    screens: {
      'xs': '475px',
      '3xl': '1600px',
    },
  },
}
```

---

## 5. Configuración de Git

### 📁 **.gitignore**

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Next.js
.next/
out/
.turbo/
.vercel/

# Environment variables
.env
.env.local
.env.development.local
.env.production.local
.env.test

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory
coverage/
*.lcov

# IDE and Editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Build outputs
dist/
build/
lib-cov/

# Temporary folders
tmp/
temp/

# Old project files
api.js
app.js
index.html
styles.css

# Documentation files
README-ADVANCED.md
README-DEMO.md
DEMO-COMPLETADA.md
CAMBIOS-COMPLETADOS.md
```

### 🔧 **Configuración de Git**

#### **Configuración Inicial**
```bash
# Inicializar repositorio
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit: Medical appointments demo"

# Agregar remote
git remote add origin https://github.com/JulianCVM/Demo-web-service.git

# Push inicial
git push -u origin main
```

#### **Workflow de Desarrollo**
```bash
# Crear rama de desarrollo
git checkout -b feature/nueva-funcionalidad

# Hacer cambios y commits
git add .
git commit -m "Add new feature"

# Push de la rama
git push origin feature/nueva-funcionalidad

# Merge a main
git checkout main
git merge feature/nueva-funcionalidad
git push origin main
```

---

## 6. Proceso de Despliegue

### 🚀 **Despliegue Automático con Vercel**

#### **Configuración Inicial**
1. **Conectar Repositorio:**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub
   - Selecciona el repositorio

2. **Configuración del Proyecto:**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `out`
   - Install Command: `npm install`

#### **Despliegue Automático**
```bash
# Cada push a main despliega automáticamente
git add .
git commit -m "Update demo"
git push origin main
```

### 🔧 **Despliegue Manual**

#### **Build Local**
```bash
# Instalar dependencias
npm install

# Build de producción
npm run build

# Verificar archivos generados
ls -la out/
```

#### **Despliegue a Vercel**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy de producción
vercel --prod
```

### 📊 **Verificación del Despliegue**

#### **Checklist de Verificación**
- [ ] Build exitoso sin errores
- [ ] Archivos estáticos generados en `out/`
- [ ] Aplicación accesible en la URL
- [ ] Todas las rutas funcionan correctamente
- [ ] Responsive design funciona
- [ ] Performance aceptable

#### **Herramientas de Verificación**
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Bundle analyzer
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

---

## 7. Monitoreo y Mantenimiento

### 📊 **Métricas de Performance**

#### **Core Web Vitals**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

#### **Métricas del Proyecto**
- **Bundle Size**: ~102 kB (First Load JS)
- **Build Time**: ~15 segundos
- **Page Load**: < 1 segundo

### 🔍 **Monitoreo con Vercel**

#### **Analytics**
- **Page Views**: Número de visitas
- **Unique Visitors**: Visitantes únicos
- **Bounce Rate**: Tasa de rebote
- **Session Duration**: Duración de sesión

#### **Performance**
- **Core Web Vitals**: Métricas de rendimiento
- **Real User Monitoring**: Datos reales de usuarios
- **Error Tracking**: Seguimiento de errores

### 🔄 **Mantenimiento Regular**

#### **Actualizaciones de Dependencias**
```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar dependencias
npm update

# Actualizar dependencias mayores
npm install package@latest
```

#### **Limpieza del Proyecto**
```bash
# Limpiar cache de npm
npm cache clean --force

# Limpiar node_modules
rm -rf node_modules
npm install

# Limpiar build
rm -rf .next out
npm run build
```

---

## 8. Troubleshooting

### 🐛 **Problemas Comunes**

#### **Error: "Module not found"**
```bash
# Problema: Dependencias no instaladas
# Solución:
npm install

# Verificar node_modules
ls node_modules/
```

#### **Error: "Build failed"**
```bash
# Problema: Errores de sintaxis
# Solución:
npm run lint

# Verificar errores específicos
npm run build 2>&1 | grep -i error
```

#### **Error: "Vercel deployment failed"**
```bash
# Problema: Configuración incorrecta
# Solución: Verificar vercel.json
cat vercel.json

# Verificar next.config.js
cat next.config.js
```

#### **Error: "Icons not showing"**
```bash
# Problema: React Icons no instalado
# Solución:
npm install react-icons

# Verificar importación
grep -r "react-icons" components/
```

### 🔧 **Comandos de Diagnóstico**

#### **Verificar Instalación**
```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar dependencias
npm list

# Verificar scripts
npm run
```

#### **Verificar Build**
```bash
# Build de desarrollo
npm run dev

# Build de producción
npm run build

# Verificar archivos generados
ls -la out/
```

#### **Verificar Linting**
```bash
# Ejecutar linter
npm run lint

# Linter con fix
npm run lint -- --fix
```

### 📋 **Logs y Debugging**

#### **Logs de Vercel**
```bash
# Ver logs de deployment
vercel logs

# Ver logs en tiempo real
vercel logs --follow
```

#### **Debug Local**
```bash
# Modo debug
DEBUG=* npm run dev

# Verificar variables de entorno
echo $NODE_ENV
```

#### **Herramientas de Debug**
```bash
# Bundle analyzer
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build

# Lighthouse
npm install -g lighthouse
lighthouse http://localhost:3000
```

---

## 🎯 **Conclusión**

Esta documentación proporciona una guía completa para:

- ✅ **Configurar el entorno** de desarrollo
- ✅ **Desplegar la aplicación** en Vercel
- ✅ **Configurar todas las herramientas** necesarias
- ✅ **Monitorear y mantener** el proyecto
- ✅ **Resolver problemas** comunes

**Beneficios de esta configuración:**
- **Despliegue automático** con cada push
- **Performance optimizada** para producción
- **Monitoreo completo** de la aplicación
- **Mantenimiento simplificado** del proyecto

---

*Documentación de despliegue generada automáticamente - Guía Completa*
