// Este módulo permite crear procesos workers.
import cluster from "cluster";

// El worker mismo se va a encargar de verificar
// si es un proceso worker o el master.
import "./worker.js";

// cluster.isPrimary === true
// significa que este proceso es el MASTER
if (cluster.isPrimary) {
  console.log("MASTER iniciado");

  // Cantidad de workers que queremos crear
  const cantidadWorkers = 2;

  // Creamos los workers
  for (let i = 0; i < cantidadWorkers; i++) {
    // fork() crea un nuevo proceso hijo
    cluster.fork();
  }

  // Evento que se ejecuta cuando un worker muere
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} murió. Creando otro...`);

    // Creamos un nuevo worker para reemplazarlo
    cluster.fork();
  });
}
