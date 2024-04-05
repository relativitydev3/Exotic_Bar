import { db } from "../db/db.js";
//lista

// enlista doros
export const Get = async (req, res) => {
  const [rows] = await db.query(`
    SELECT * FROM usuarios
    `);
  if (rows.length <= 0) {
    res.status(404).json({ error: `Error 404 no se econtro registros` });
  } else {
    res.json(rows);
  }
};

// elista por id
export const GetId = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query(
    ` SELECT * FROM usuarios
    WHERE ID=?`,
    [id]
  );
  if (rows.length <= 0) {
    res.status(404).json({ error: `Error 404 no se econtro registros` });
  } else {
    res.json(rows[0]);
  }
};

// elista por rango
export const GetIdRango = async (req, res) => {
  const { id, idDos } = req.params;
  const [rows] = await db.query(
    `
    SELECT * FROM usuarios
    WHERE ID BETWEEN ? AND ?;`,
    [id, idDos]
  );
  if (rows.length <= 0) {
    res.status(404).json({ error: `Error 404 no se econtro registros` });
  } else {
    res.json(rows);
  }
};

// crear registro
export const Post = async (req, res) => {
  const { Nombre_Conpreto, Nombre_Usuario, CONTRASEÑA, IMG, id_Rol } = req.body;
  const [rows] = await db.query(
    ` INSERT INTO usuarios  (Nombre_Conpreto,Nombre_Usuario,CONTRASEÑA,IMG,id_Rol) VALUES (?,?,?,?,?)`,
    [Nombre_Conpreto, Nombre_Usuario, CONTRASEÑA, IMG, id_Rol]
  );

  res.json({
    ID: rows.insertId,
    Nombre_Conpreto,
    Nombre_Usuario,
    CONTRASEÑA,
    IMG,
    id_Rol,
  });
};

// edita un registro
export const  Patch= async (req, res) => {
  const { id } = req.params;
  const { Nombre_Conpreto, Nombre_Usuario, CONTRASEÑA, IMG, id_Rol } = req.body;
  const [resul] = await db.query(
    `
    update usuarios set Nombre_Conpreto=IFNULL(?,Nombre_Conpreto) , Nombre_Usuario=IFNULL(?,Nombre_Usuario),CONTRASEÑA=IFNULL(?,CONTRASEÑA),IMG=IFNULL(?,IMG), id_Rol=IFNULL(?,id_Rol)
    where ID=?`,
    [Nombre_Conpreto, Nombre_Usuario, CONTRASEÑA, IMG, id_Rol, id]
  );

  if (resul.affectedRows <= 0) {
    return res.status(404).json({ result: "error 505 no se econtro" });
  }

  const [rows] = await db.query(
    `
  SELECT * FROM usuarios
  where ID=?`,
    [id]
  );

  res.json(rows[0]);
};

// elimina un registro
export const Delete = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query(
    `
  DELETE FROM usuarios
  where ID=? `,
    [id]
  );

  if (rows.affectedRows <= 0) {
     res.status(404).json({ result: "error 505 no se econtro" });
  }
  res.sendStatus(204);
};

// elimina por rango
export const  DeleteRango= async (req, res) => {
  const {id,idDos}=req.params;
  const [rows] = await db.query(
    `
    DELETE FROM usuarios
    WHERE ID BETWEEN ? AND ? `,
    [id, idDos]
  );

  if (rows.affectedRows <= 0) {
     res.status(404).json({ result: "error 505 no se econtro" });
  }
  res.sendStatus(204);
};
