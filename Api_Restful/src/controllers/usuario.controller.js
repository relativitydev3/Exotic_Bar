import { db } from "../db/db.js";

export const GetUsuarios = async (req, res) => {
  const [rows] = await db.query(`
    SELECT * FROM usuarios
    `);
  res.json(rows);
};

export const GetUsuariosID = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query(
    ` SELECT * FROM usuarios
    WHERE ID=?`,
    [id] );
  res.json(rows);
};

export const GetUsuariosIDRango = async (req, res) => {
  const { id, idDos } = req.params;
  const [rows] = await db.query(
    `
    SELECT * FROM usuarios
    WHERE ID BETWEEN ? AND ?;`,
    [id, idDos]
  );
  res.json(rows);
};

export const PostCreate = async (req, res) => {
  const { Nombre_Conpreto, Nombre_Usuario, CONTRASEÑA, IMG, id_Rol } = req.body;
  const [rows] = await db
    .query(
      ` INSERT INTO usuarios  (Nombre_Conpreto,Nombre_Usuario,CONTRASEÑA,IMG,id_Rol) VALUES (?,?,?,?,?)`,
      [Nombre_Conpreto, Nombre_Usuario, CONTRASEÑA, IMG, id_Rol]
    )
    .then((result) => {
      res.json({ message: "Registro insertado exitosamente" });
    })
    .catch((error) => {
      if (error.code === "ER_DUP_ENTRY") {
        res.status(400).json({ error: "El registro ya existe" });
      } else {
        console.error("Error en la consulta a la base de datos:", error);
        res
          .status(500)
          .json({ error: "Error en la consulta a la base de datos" });
      }
    });

    
  res.json({
    ID: rows.insertId,
    Nombre_Conpreto,
    Nombre_Usuario,
    CONTRASEÑA,
    IMG,
    id_Rol,
    rows,
  });
};
