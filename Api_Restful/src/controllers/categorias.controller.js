import { db } from "../db/db.js";
//lista

// enlista doros
export const Get = async (req, res) => {
  const [rows] = await db.query(`
    SELECT * FROM categoria
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
    ` SELECT * FROM categoria
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
    SELECT * FROM categoria
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
  const { Nombre,Descripcion } = req.body;
  const [rows] = await db.query(
    ` INSERT INTO categoria  (Nombre,Descripcion) VALUES (?,?)`,
    [Nombre,Descripcion]
  );

  res.json({
    ID: rows.insertId,
    Nombre,
    Descripcion,
  });
};

// edita un registro
export const Patch = async (req, res) => {
  const { id } = req.params;
  const { Nombre,Descripcion } = req.body;
  const [resul] = await db.query(
    `
    update categoria set  Nombre=IFNULL(?,Nombre),Descripcion=IFNULL(?,Descripcion)
    where ID=?`,
    [Nombre,Descripcion, id]
  );

  if (resul.affectedRows <= 0) {
    return res.status(404).json({ result: "error 505 no se econtro" });
  }

  const [rows] = await db.query(
    `
  SELECT * FROM categoria
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
  DELETE FROM categoria
  where ID=? `,
    [id]
  );

  if (rows.affectedRows <= 0) {
     res.status(404).json({ result: "error 505 no se econtro" });
  }
  res.sendStatus(204);
};

// elimina por rango
export const DeleteRango = async (req, res) => {
  const {id,idDos}=req.params;
  const [rows] = await db.query(
    `
    DELETE FROM categoria
    WHERE ID BETWEEN ? AND ? `,
    [id, idDos]
  );

  if (rows.affectedRows <= 0) {
     res.status(404).json({ result: "error 505 no se econtro" });
  }
  res.sendStatus(204);
};
