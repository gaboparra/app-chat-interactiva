# TCP Chat

Este proyecto es un servidor de chat multiusuario basado en el protocolo TCP, desarrollado con Node.js. Permite la comunicación en tiempo real entre múltiples clientes conectados a un servidor central a través de sockets.

## Comandos del Chat
- `/nick <nombre>`: Cambia tu nombre de usuario actual (reemplaza espacios por guiones bajos).
- `/lista`: Muestra la lista de todos los usuarios actualmente conectados.
- `/salir`: Finaliza la conexión con el servidor de forma segura.

## Requisitos
- [Node.js](https://nodejs.org/) v18.0.0 o superior.

## Instalación y Configuración

1. **Clonar el repositorio:**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DE_LA_CARPETA>

   ```

2. **Instalar dependencias:**
   npm install

3. **Configurar variables de entorno:**
   Crea un archivo llamado .env en la raíz del proyecto (puedes basarte en el archivo .env.example) y define los siguientes valores:

PORT=8080
HOST=localhost

## Ejecución

1. **Iniciar el servidor:**
   En una terminal, ejecuta el siguiente comando para poner el servidor en escucha:

node src/server.js

2. **Iniciar un cliente:**
   En una nueva terminal, ejecuta el cliente para unirte al chat:

node src/client.js

Puedes abrir tantas terminales de cliente como desees para simular una conversación entre varios usuarios.
