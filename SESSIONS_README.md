# Sistema de Sesiones con Timer - Implementación Frontend

## 📋 **Descripción**

Este documento describe la implementación del sistema de sesiones con timer en el frontend de Studify, siguiendo la documentación de la API proporcionada.

## 🏗️ **Arquitectura Implementada**

### **Componentes Principales**

1. **`SessionTimer`** - Componente principal del timer
2. **`SessionHistory`** - Historial de sesiones
3. **`StreakStats`** - Estadísticas de racha
4. **`SessionResults`** - Modal de resultados

### **Servicios y Hooks**

1. **`sessionService`** - Servicio singleton para manejar sesiones
2. **`useSession`** - Hook personalizado para el estado de sesiones

## 📁 **Estructura de Archivos**

```
src/
├── components/
│   ├── SessionTimer.tsx          # Timer principal
│   ├── SessionHistory.tsx        # Historial de sesiones
│   ├── StreakStats.tsx           # Estadísticas de racha
│   └── SessionResults.tsx        # Modal de resultados
├── services/
│   └── sessionService.ts         # Servicio de sesiones
├── hooks/
│   └── useSession.ts             # Hook de sesiones
├── types/
│   └── index.ts                  # Tipos de sesiones
└── icons/
    └── index.ts                  # Exportación de iconos
```

## 🔧 **Configuración**

### **Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://tu-backend.onrender.com/api
```

### **Configuración de la API**

La configuración se encuentra en `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'https://tu-backend.onrender.com/api',
  TIMEOUT: 10000,
  WITH_CREDENTIALS: true,
};
```

## 🚀 **Uso del Sistema**

### **1. Iniciar una Sesión**

```typescript
import { useSession } from '../hooks/useSession';

const { startSession } = useSession();

// Iniciar sesión de focus (25 minutos)
await startSession('focus');

// Iniciar descanso corto (5 minutos)
await startSession('short_break');

// Iniciar descanso largo (15 minutos)
await startSession('long_break');
```

### **2. Controles de Sesión**

```typescript
const {
  pauseSession,
  resumeSession,
  endSession,
  cancelSession
} = useSession();

// Pausar sesión actual
pauseSession();

// Reanudar sesión pausada
resumeSession();

// Finalizar sesión
await endSession();

// Cancelar sesión
await cancelSession();
```

### **3. Estado de la Sesión**

```typescript
const {
  currentSession,
  isActive,
  isPaused,
  timeRemaining,
  progress
} = useSession();

// Verificar si hay sesión activa
if (currentSession) {
  console.log('Sesión activa:', currentSession.sessionType);
}

// Obtener tiempo restante formateado
const formattedTime = formatTime(timeRemaining); // "25:00"
```

## 🎨 **Componentes UI**

### **SessionTimer**

Componente principal que muestra:
- Timer visual con formato MM:SS
- Barra de progreso
- Selector de tipo de sesión
- Controles (Iniciar, Pausar, Reanudar, Completar, Cancelar)

```tsx
<SessionTimer className="mb-8" />
```

### **SessionHistory**

Muestra el historial de sesiones con:
- Lista paginada de sesiones
- Filtros por tipo y estado
- Información detallada de cada sesión

```tsx
<SessionHistory />
```

### **StreakStats**

Estadísticas de racha del usuario:
- Racha actual
- Racha más larga
- Progreso hacia metas
- Consejos motivacionales

```tsx
<StreakStats />
```

### **SessionResults**

Modal que se muestra al completar una sesión:
- Resumen de la sesión
- Información de racha actualizada
- Nuevos logros desbloqueados
- Mensajes motivacionales

## 🔄 **Flujo de Trabajo**

### **1. Inicio de Sesión**
1. Usuario selecciona tipo de sesión
2. Hace clic en "Iniciar Sesión"
3. Se crea sesión en el backend
4. Se inicia timer local
5. UI se actualiza para mostrar controles de sesión

### **2. Durante la Sesión**
1. Timer se actualiza cada segundo
2. Barra de progreso se actualiza
3. Usuario puede pausar/reanudar
4. Usuario puede completar o cancelar

### **3. Finalización**
1. Sesión se completa automáticamente o manualmente
2. Se envía tiempo completado al backend
3. Se muestra modal de resultados
4. Se actualizan estadísticas de racha

## 🎯 **Tipos de Sesión**

| Tipo | Duración | Descripción |
|------|----------|-------------|
| `focus` | 25 minutos | Sesión de estudio enfocado |
| `short_break` | 5 minutos | Descanso corto |
| `long_break` | 15 minutos | Descanso largo |

## 📊 **Estados de Sesión**

- **`isActive: true`** - Sesión en progreso
- **`isPaused: true`** - Sesión pausada
- **`isCompleted: true`** - Sesión completada
- **`isCancelled: true`** - Sesión cancelada

## 🔧 **Personalización**

### **Configurar Duraciones**

Edita `src/types/index.ts`:

```typescript
export const SESSION_CONFIG: Record<SessionType, SessionConfig> = {
  focus: {
    duration: 1500, // 25 minutos
    label: "Focus Session"
  },
  short_break: {
    duration: 300, // 5 minutos
    label: "Short Break"
  },
  long_break: {
    duration: 900, // 15 minutos
    label: "Long Break"
  }
};
```

### **Personalizar Colores**

Los colores se pueden personalizar en los componentes:

```typescript
const getSessionTypeColor = (sessionType: SessionType) => {
  switch (sessionType) {
    case 'focus':
      return 'text-blue-600 bg-blue-100 border-blue-300';
    case 'short_break':
      return 'text-green-600 bg-green-100 border-green-300';
    case 'long_break':
      return 'text-purple-600 bg-purple-100 border-purple-300';
  }
};
```

## 🐛 **Troubleshooting**

### **Problemas Comunes**

1. **Timer no sincroniza**
   - Verificar conexión a internet
   - Revisar logs de la consola
   - Verificar token de autenticación

2. **Sesión no inicia**
   - Verificar que el usuario esté autenticado
   - Revisar logs de error en la consola
   - Verificar configuración de la API

3. **Errores de red**
   - Verificar URL del backend
   - Revisar configuración CORS
   - Verificar timeout de la API

### **Logs de Debug**

El sistema incluye logs detallados para debugging:

```typescript
// En sessionService.ts
console.log('Error starting session:', error);
console.log('Session completed:', results);
```

## 📱 **Responsive Design**

El sistema está optimizado para:
- **Desktop**: Timer completo con estadísticas y historial
- **Mobile**: Timer simplificado con controles esenciales

## 🔒 **Autenticación**

El sistema requiere autenticación JWT:
- Token se envía automáticamente en headers
- Manejo automático de errores 401
- Redirección a login si es necesario

## 🚀 **Próximas Mejoras**

1. **Notificaciones push** al completar sesiones
2. **Sonidos** para alertas de timer
3. **Temas personalizables** para el timer
4. **Exportación** de estadísticas
5. **Gamificación** avanzada con badges
6. **Sincronización offline** con cola de operaciones

---

**¿Necesitas ayuda con alguna implementación específica o tienes preguntas sobre el sistema?** 