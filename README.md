# 🚀 TFM Backend - Rojo

Backend para una plataforma de perfiles de desarrolladores y búsqueda de empleo.

## 📌 Índice

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Modelos de Datos](#modelos-de-datos)
5. [Cómo Configurar el Proyecto](#cómo-configurar-el-proyecto)
6. [Gestión de Ramas](#gestión-de-ramas)
7. [Enlaces Útiles](#enlaces-útiles)
8. [Contribuciones](#contribuciones)
9. [Licencia](#licencia)

## 📖 Descripción del Proyecto

Este backend alimenta una plataforma diseñada para conectar desarrolladores con oportunidades laborales. Los desarrolladores pueden crear y gestionar sus portfolios profesionales, mientras que los reclutadores pueden publicar ofertas de empleo y buscar candidatos que se ajusten a sus necesidades.

**Características principales:**
- Sistema de autenticación JWT
- Perfiles de desarrollador personalizables
- Gestión de ofertas de empleo
- Sistema de matching entre candidatos y ofertas
- Acceso basado en roles (desarrolladores, reclutadores, administradores)

**Versión:** 1.0.0

## 💻 Tecnologías Utilizadas

* **Node.js** - Entorno de ejecución para JavaScript.
* **Express** (v5.1.0) - Framework minimalista para construir APIs RESTful.
* **MongoDB** - Base de datos NoSQL para almacenar perfiles, ofertas y otros datos.
* **Mongoose** (v8.13.2) - ODM para interactuar con MongoDB.
* **JWT** - Autenticación basada en tokens.
* **Cors** (v2.8.5) - Middleware para manejar solicitudes entre dominios.
* **Dotenv** (v16.4.7) - Gestión de variables de entorno.
* **Nodemon** (v3.1.9) - Reinicio automático del servidor durante el desarrollo.

## 📂 Estructura del Proyecto

```
tfm-backend-rojo/
├── controllers/  # Lógica de negocio para endpoints
├── models/       # Esquemas de Mongoose para la base de datos
├── routes/       # Rutas de la API RESTful
├── middlewares/  # Middlewares personalizados (autenticación, validaciones, etc.)
├── config/       # Configuración de la aplicación (ej: conexión a MongoDB)
├── utils/        # Funciones de utilidad
├── .env          # Variables de entorno (no subir al repositorio)
├── package.json  # Dependencias y scripts del proyecto
├── README.md     # Documentación del proyecto
└── index.js      # Punto de entrada de la aplicación
```

## 💾 Modelos de Datos

La aplicación utiliza MongoDB como base de datos NoSQL, implementando los siguientes modelos a través de Mongoose:

### 👤 User Model (userModel.js)

Modelo central que gestiona tanto usuarios desarrolladores como reclutadores.

**Campos Base:**
- `email`: String (único, requerido)
- `password`: String (requerido)
- `name`: String (requerido)
- `surname`: String (requerido)
- `birthDate`: Date (requerido)
- `phone`: String
- `avatar`: String
- `description`: String

**Roles Específicos:**

1. **Developer:**
   - `professionalPosition`: String
   - `languages`: Array de objetos { language, languageLevel }
   - `skills`: Array de tecnologías
   - `experience`: Array de objetos
     - `company`: String
     - `position`: String
     - `startDate`: Date
     - `endDate`: Date
   - `projects`: Referencias a Project
   - `studies`: Array de objetos con información académica
   - `registeredOffers`: Array de ofertas aplicadas

2. **Recruiter:**
   - `companyName`: String
   - `logo`: String
   - `description`: String
   - `location`: String
   - `sector`: String
   - `website`: String
   - `contact`: Array de información de contacto
   - `createdOffers`: Referencias a Offer

### 💼 Offer Model (offerModel.js)

Modelo para gestionar ofertas de trabajo.

**Campos Principales:**
- `position`: String (requerido)
- `role`: String
- `location`: String
- `contractType`: Array de String
- `company`: String (requerido)
- `salary`: Number
- `skills`: Array de String
- `description`: String
- `language`: String
- `status`: String (enum: ['active', 'closed', 'draft'])

**Relaciones:**
- `owner`: Referencia al User (recruiter) que creó la oferta
- `applicants`: Array de objetos
  - `user`: Referencia al User (developer)
  - `appliedDate`: Date
  - `status`: String (enum: ['pending', 'reviewed', 'interviewed', 'rejected', 'accepted'])

### 🔨 Project Model (projectModel.js)

Modelo para gestionar proyectos de desarrolladores.

**Campos:**
- `name`: String
- `description`: String
- `urls`: Array
- `technologiesUsed`: Array de String
- `duration`: String
- `type`: Array de String
- `date`: Date
- `multimedia`: String

**Relaciones:**
- `owner`: Referencia al User (developer) que creó el proyecto

Todos los modelos incluyen timestamps automáticos (`createdAt` y `updatedAt`) para seguimiento temporal.

## ⚙️ Cómo Configurar el Proyecto

### Prerrequisitos

* **Node.js** instalado (v16 o superior).
* **npm** instalado (viene incluido con Node.js).
* Una instancia de **MongoDB** (local o en la nube).

### Pasos para Configurar

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/FSDSTR0225/TFM-backend-rojo.git
   cd tfm-backend-rojo
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   * Crea un archivo `.env` en la raíz del proyecto.
   * Añade las siguientes variables:
   ```env
   PORT=3000
   MONGODB_URI=<TU_URI_DE_MONGODB>
   JWT_SECRET=<TU_CLAVE_SECRETA_JWT>
   ```

4. **Inicia el servidor:**
   * Modo desarrollo (con Nodemon):
   ```bash
   npx nodemon index.js
   ```
   * Modo producción:
   ```bash
   node index.js
   ```

5. **Accede a la API:**
   * La API estará disponible en `http://localhost:3000`.

## 🌿 Gestión de Ramas

Al ser un equipo de 4 personas sin roles definidos, seguiremos una estrategia de ramificación (branching) simplificada pero efectiva para colaborar en el proyecto.

### Ramas Principales

- **`main`**: Rama de producción. Contiene el código estable y listo para desplegar.
- **`develop`**: Rama de desarrollo principal. Todas las funcionalidades se integran aquí antes de pasar a `main`.

### Ramas de Trabajo

Para el desarrollo de nuevas funcionalidades, corrección de errores o mejoras, seguiremos la siguiente convención:

- **`feature/nombre-funcionalidad`**: Para nuevas funcionalidades (ej: `feature/auth-system`, `feature/job-matching`).
- **`fix/nombre-error`**: Para corrección de errores (ej: `fix/login-validation`).
- **`refactor/nombre-componente`**: Para mejoras de código existente (ej: `refactor/user-controller`).

### Flujo de Trabajo

1. **Crear una rama de trabajo**:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/mi-nueva-funcionalidad
   ```

2. **Realizar commits frecuentes y descriptivos**:
   ```bash
   git commit -m "Añade validación de campos en formulario de registro"
   ```

3. **Mantener la rama actualizada**:
   ```bash
   git pull origin develop
   ```

4. **Subir cambios a GitHub**:
   ```bash
   git push origin feature/mi-nueva-funcionalidad
   ```

5. **Crear Pull Request**:
   - Desde la rama de trabajo hacia `develop`
   - Asignar al menos un revisor del equipo
   - Incluir descripción clara de los cambios

6. **Integración a main**:
   - Periódicamente, cuando `develop` tenga funcionalidades estables, se creará un PR desde `develop` a `main`
   - Este PR debe ser revisado y aprobado por al menos 2 miembros del equipo

### Convenciones de Commits

Para mantener el historial organizado, utilizaremos la siguiente estructura para los mensajes de commit:

```
[tipo]: descripción corta

Descripción detallada si es necesaria
```

Donde `tipo` puede ser:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios que no afectan el significado del código (espacios, formato, etc.)
- `refactor`: Código que no corrige bugs ni añade funcionalidades
- `test`: Añadir o corregir tests
- `chore`: Cambios en el proceso de build o herramientas auxiliares

Ejemplo:
```
feat: implementa sistema de autenticación JWT

- Añade generación de tokens
- Configura middleware de verificación
- Implementa expiración de tokens
```

## 🔗 Enlaces Útiles

* **Notion:** [Documentación del Proyecto](https://www.notion.so/1ce4f680cf84804ebde5e064376d2da1?v=1ce4f680cf8480ac9ae7000c147e9a86&pvs=4)
* **Trello:** [Tablero de Tareas](https://trello.com/b/SMoorg1M/tfm-fsdstr0225-rojo)
* **GitHub Backend:** [Repositorio Backend](https://github.com/FSDSTR0225/TFM-backend-rojo)
* **GitHub Frontend:** [Repositorio Frontend](https://github.com/FSDSTR0225/TFM-frontend-rojo)

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nombre-de-la-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m "Añadir funcionalidad"`).
4. Sube tus cambios (`git push origin feature/nombre-de-la-funcionalidad`).
5. Abre un pull request describiendo tus cambios.

## 📜 Licencia

Este proyecto está bajo la licencia **ISC**. Consulta el archivo LICENSE para más detalles.

## 👥 Autores

Desarrollado por **red-team-0225**

---

🎉 ¡Gracias por visitar este repositorio! Si tienes preguntas o sugerencias, no dudes en [abrir un issue](https://github.com/FSDSTR0225/TFM-backend-rojo/issues).
