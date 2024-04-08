// archivo server.js
import express from "express";
import permisos from "./routes/permisos.route.js";
import roles from "./routes/roles.route.js";
import usuarios from "./routes/usuario.route.js";
import proveedores from "./routes/proveedores.router.js";
import insumos from "./routes/insumos.router.js";
import mesa from "./routes/mesa.router.js";
import estado from "./routes/estado.router.js";
import categoria from "./routes/categorias.router.js";
import productos from "./routes/productos.router.js";
import pedidos from "./routes/pedidos.router.js";
import paga_empleado from "./routes/paga_empleado.router.js";
import pedidos_historial from "./routes/pedidos_historial.router.js";
import historial_pagos from "./routes/historial_pagos.router.js";
import { PORT } from "./config.js";

export default class Server {
  constructor() {
    this.app = express();
    this.PORT = PORT;
  }

  routes() {
    this.app.use(express.json());
    this.app.use(usuarios);
    this.app.use(permisos);
    this.app.use(roles);
    this.app.use(proveedores);
    this.app.use(insumos);
    this.app.use(mesa);
    this.app.use(estado);
    this.app.use(categoria);
    this.app.use(productos);
    this.app.use(pedidos);
    this.app.use(paga_empleado);
    this.app.use(pedidos_historial);
    this.app.use(historial_pagos);
  }

  middleware() {
    // Middleware de manejo de errores 404
    this.app.use("*", (req, res) => {
      res.status(404).json({ error: "Dirección no encontrada" });
    });
  }
  

  on() {
    // Manejador de errores para la conexión
    
    this.app.on("error", (err) => {
      console.error("Error de conexión:", err);
    });
  }

  listen() {
    
    this.app.listen(this.PORT, () => {
      console.log(`Aplicación corriendo en el puerto: http://localhost:${this.PORT}`);
    });
  }
}