import net from "node:net";
import logger from "./utils/logger.js";
import "dotenv/config";

const PORT = process.env.PORT;
let clients = [];

// Crear Servidor TCP
const server = net.createServer((socket) => {
  const clientId = `${socket.remoteAddress}:${socket.remotePort}`;
  clients.push(socket);

  logger.info({ event: "CLIENT_CONNECTED", id: clientId });

  socket.write("Conectado al servidor de chat TCP.\n");

  // Manejar mensajes entrantes
  socket.on("data", (data) => {
    const message = data.toString().trim();
    if (!message) return;

    // Broadcast
    clients.forEach((client) => {
      if (client !== socket && !client.destroyed) {
        client.write(`[${clientId}]: ${message}\n`);
      }
    });

    logger.info({
      event: "MESSAGE_SENT",
      from: clientId,
      text: message,
    });
  });

  // Remover cliente de la lista y loguear la desconexión
  const removeClient = (reason) => {
    if (clients.includes(socket)) {
      clients = clients.filter((c) => c !== socket);
      logger.info({ event: "CLIENT_DISCONNECTED", id: clientId, reason });
    }
  };

  // Cerrar conexión de forma segura
  socket.on("end", () => removeClient("Normal closure"));

  // Cerrar conexión por error
  socket.on("error", (err) => {
    logger.error({
      event: "SOCKET_ERROR",
      id: clientId,
      message: err.message,
    });
    removeClient("Error closure");
  });
});

server.listen(PORT, () => {
  console.log(`>>> Servidor TCP activo en puerto ${PORT}`);
});
