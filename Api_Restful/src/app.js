import express from "express";
import  permisos  from "./routes/permisos.route.js";
import  roles  from "./routes/roles.route.js";
import  usuarios  from "./routes/usuario.route.js";
import  proveedores  from "./routes/proveedores.router.js";
import insumos from "./routes/insumos.router.js";
import mesa from "./routes/mesa.router.js";
import estado from "./routes/estado.router.js";
import categoria from "./routes/categorias.router.js";
import productos from "./routes/productos.router.js";
import pedidos from "./routes/pedidos.router.js";
import paga_empleado from "./routes/paga_empleado.router.js";
import pedidos_historial from "./routes/pedidos_historial.router.js";
import historial_pagos from "./routes/historial_pagos.router.js";
const app=express();


app.use(express.json());
app.use(usuarios);
app.use(permisos);
app.use(roles);
app.use(proveedores);
app.use(insumos);
app.use(mesa);
app.use(estado);
app.use(categoria);
app.use(productos);
app.use(pedidos);
app.use(paga_empleado);
app.use(pedidos_historial);
app.use(historial_pagos);


// Manejador de errores para la conexión
app.on('error', (err) => {
    console.error('Error de conexión:', err);
  });

// lo enseña por consola...
app.listen(3000, () => {
    console.log('Aplicación corriendo en el puerto:3000 en la url: http://localhost:3000/index ');
  });
