import { db } from "../db/db.js";
//lista

// enlista doros
export const Get = async (req, res) => {
  const [rows] = await db.query(`
    SELECT * FROM mesas
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
    ` SELECT * FROM mesas
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
    SELECT * FROM mesas
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
  const {Numero_Mesa, Descripcion } = req.body;
  const [rows] = await db.query(
    ` INSERT INTO mesas  (Numero_Mesa, Descripcion) VALUES (?,?)`,
    [Numero_Mesa, Descripcion]
  );

  res.json({
    ID: rows.insertId,
    Numero_Mesa,
    Descripcion,
   
  });
};

// edita un registro
export const Patch = async (req, res) => {
  const { id } = req.params;
  const {Numero_Mesa, Descripcion } = req.body;
  const [resul] = await db.query(
    `
    update mesas set Numero_Mesa=IFNULL(?,Numero_Mesa) , Descripcion=IFNULL(?,Descripcion)
    where ID=?`,
    [Numero_Mesa, Descripcion, id]
  );

  if (resul.affectedRows <= 0) {
    return res.status(404).json({ result: "error 505 no se econtro" });
  }

  const [rows] = await db.query(
    `
  SELECT * FROM mesas
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
  DELETE FROM mesas
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
    DELETE FROM mesas
    WHERE ID BETWEEN ? AND ? `,
    [id, idDos]
  );

  if (rows.affectedRows <= 0) {
     res.status(404).json({ result: "error 505 no se econtro" });
  }
  res.sendStatus(204);
};
