// Importamos cluster para saber
// si somos master o worker
import cluster from "cluster";

// Importamos http para crear el servidor
import http from "http";

// Solo los workers crean el servidor.
// El master NO debe escuchar peticiones.
if (!cluster.isPrimary) {
  // Creamos servidor HTTP
  const server = http.createServer((req, res) => {
    // Ruta principal
    if (req.url === "/") {
      res.end(`Hola desde worker ${process.pid}`);
    }

    // Ruta del ejercicio
    else if (req.url === "/escribir-evidencia") {
      console.log(`Worker ${process.pid}: iniciando escritura...`);

      // Simulamos una escritura lenta en disco.
      // Espera 10 segundos antes de responder.
      setTimeout(() => {
        console.log(`Worker ${process.pid}: escritura finalizada`);

        // 50% de probabilidad de crash
        const hayCrash = Math.random() < 0.5;

        // Si hay crash...
        if (hayCrash) {
          console.log(`Worker ${process.pid}: CRASH`);

          // Mata el proceso con error
          process.exit(1);
        }

        // Si NO crasheó, responde normalmente
        res.end(`Evidencia guardada por ${process.pid}`);
      }, 10000);
    }

    // Si la ruta no existe
    else {
      res.statusCode = 404;
      res.end("Ruta no encontrada");
    }
  });

  server.listen(3000, () => {
    console.log(`Worker ${process.pid} escuchando en puerto 3000`);
  });
}
