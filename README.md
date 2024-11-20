# Y2K Revival Shop

**Y2K Revival Shop** es una aplicación web que combina un frontend estilizado con un backend robusto, diseñada para brindar una experiencia de compra en línea con una estética inspirada en los años 2000.

## Configuración y Ejecución

Sigue los pasos a continuación para configurar y ejecutar la aplicación correctamente:

---

### **Paso 1: Clonar el Repositorio**

1. Abre tu terminal y clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/tuusuario/y2k-revival-shop.git
   cd y2k-revival-shop
   ```

2. **Nota importante**: Para ejecutar correctamente el código, asegúrate de **estar siempre ubicado en la carpeta `server`**.

---

### **Paso 2: Configurar el Backend**

#### 1. Instalar Dependencias

Desde el directorio raíz, navega al directorio del servidor e instala las dependencias necesarias:
   ```bash
   cd server
   npm install
   ```

#### 2. Configurar la Base de Datos

Edita el archivo `src/config/sequelize.js` para configurar las credenciales de tu base de datos PostgreSQL. Este archivo debe contener algo similar a lo siguiente:

```javascript
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('y2k_shop', 'tu_usuario', 'tu_contraseña', {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
        decimalNumbers: true, // Devuelve DECIMAL como número
    },
});

export default sequelize;
```

#### 3. Crear la Base de Datos

Crea una base de datos PostgreSQL con el nombre configurado (`y2k_shop` por defecto). Ejecuta este comando en tu cliente de PostgreSQL:
   ```sql
   CREATE DATABASE y2k_shop;
   ```

---

### **Paso 3: Sincronizar los Modelos**

Sincroniza las tablas necesarias en tu base de datos ejecutando el siguiente comando desde el directorio `server`:

```bash
node src/app.js
```

Esto generará automáticamente las tablas basadas en los modelos definidos.

---

### **Paso 4: Iniciar el Servidor**

Para iniciar el servidor, asegúrate de estar en el directorio `server` y ejecuta:

```bash
node src/app.js
```

El servidor estará disponible en: [http://localhost:5000](http://localhost:5000).

---

## **Contribuciones**
Si deseas contribuir a este proyecto, por favor sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una rama con tu nueva funcionalidad:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Descripción de los cambios"
   ```
4. Envía tus cambios al repositorio remoto:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Crea un pull request en GitHub.

---

## **Licencia**

Este proyecto está bajo la [Licencia MIT](LICENSE), lo que significa que puedes usar, modificar y distribuir libremente el código mientras atribuyas al autor original.

---

¡Gracias por apoyar el proyecto Y2K Revival Shop! 🎉
