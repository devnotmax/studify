# Configuración de Variables de Entorno

## Variables de Entorno para Vite

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

### Desarrollo Local
```env
# .env
VITE_API_URL=http://localhost:3000/api
```

### Producción
```env
# .env.production
VITE_API_URL=https://tu-backend.onrender.com/api
```

## Configuración por Entorno

### Desarrollo
- **Archivo**: `.env.development`
- **URL**: `http://localhost:3000/api`
- **Uso**: Para desarrollo local

### Producción
- **Archivo**: `.env.production`
- **URL**: `https://tu-backend.onrender.com/api`
- **Uso**: Para despliegue en producción

## Verificación de Configuración

La aplicación mostrará en la consola la configuración actual:

```
🔧 Configuración API: {
  BASE_URL: "http://localhost:3000/api",
  ENVIRONMENT: "development",
  WITH_CREDENTIALS: true
}
```

## Troubleshooting

### Si no se conecta al backend:

1. **Verifica que el backend esté corriendo**:
   ```bash
   # En el directorio del backend
   npm start
   ```

2. **Prueba el endpoint de test**:
   ```bash
   curl http://localhost:3000/api/test
   ```

3. **Verifica CORS en el backend**:
   - Asegúrate de que el frontend esté en un puerto permitido
   - Verifica que `withCredentials: true` esté configurado

4. **Revisa los logs en la consola del navegador**:
   - Busca errores de CORS
   - Verifica que las peticiones se estén enviando correctamente

### Comandos útiles:

```bash
# Verificar si el puerto 3000 está en uso
netstat -an | grep 3000

# Matar proceso en puerto 3000 (si es necesario)
npx kill-port 3000
``` 