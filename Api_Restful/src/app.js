import express from "express";
import  permisos  from "./routes/permisos.route.js";
import  roles  from "./routes/roles.route.js";
import  usuarios  from "./routes/usuario.route.js";
const app=express();


app.use(express.json());
app.use(usuarios);
app.use(permisos);
app.use(roles);


// Manejador de errores para la conexión
app.on('error', (err) => {
    console.error('Error de conexión:', err);
  });

// lo enseña por consola...
app.listen(3000, () => {
    console.log('Aplicación corriendo en el puerto:3000 en la url: http://localhost:3000/index ');
  });
