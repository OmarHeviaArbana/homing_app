
# Homing - Frontend 

Este repositorio contiene el cliente web de la plataforma **Homing**, desarrollado con **Angular 18**. El frontend se comunica con una API construida en Laravel, que puedes encontrar [aquí](https://github.com/tu-usuario/homing-api).

---

## Tecnologías utilizadas

- Angular 15
- Angular Material
- NgRx Store (Redux para Angular)
- NgRx Effects
- Store Devtools
- RxJS
- SCSS

---

## 📂 Estructura del proyecto

El proyecto sigue una arquitectura modular escalable:

```

src/
├── app/
│   ├── Modules/            # Módulos de autenticación, usuarios, refugios y criaders
│ componentes
│   ├── Shared/             # Servicios y recursos compartidos
│   ├── app.module.ts       # Módulo principal
│   ├── app.reducers.ts     # Estado global con NgRx
│   └── app.routes.ts       # Enrutamiento principal
── assets/
│   ├── styles/             
  │     ├── -variables      # Estilos de colores, tamaños de fuente y responsive
  │     ├── _base.scss      # Estilos varios y de caracter global
  │     ├── _fonts.scss     # Estilos de fuente
  │     ├── theme.scss      # Reseteo de estilos Angular Material 
├── environments/           # Configuración de entorno
└── styles.scss             # Estilos globales
```

---

## Configuración

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/homing-front.git
cd homing-front
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura la URL de la API

Edita el archivo de entorno `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000/api'
};
```

### 4. Levanta el servidor Angular

```bash
ng serve
```

La aplicación estará disponible en:  
`http://localhost:4200`

---

## Conexión con la API

Este frontend está conectado con la API RESTful desarrollada en Laravel. Para su correcto funcionamiento, asegúrate de tener el backend en ejecución en `http://127.0.0.1:8000`.


```bash
git clone https://github.com/tu_usuario/homing-api.git
cd homing-api
```

## Autoria

Proyecto propiedad de **Omar Hevia Arbana**  y realizado como parte del **Trabajo Final del Master Universitario de Desarrollo de Aplicaciones y sitios web de la Universitat Oberta de Catalunya**.

---

## Contacto

Para cualquier duda o sugerencia, puedes escribir a `ohevia@uoc.edu`

---
