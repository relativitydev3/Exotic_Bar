import { db } from "../db/db.js";
//lista

// enlista doros
export const Get = async (req, res) => {
  try {
    const [rows] = await db.query(`
  SELECT * FROM estados
  `);
    if (rows.length <= 0) {
      res.status(404).json({ error: `Error 404 no se econtro registros` });
    } else {
      res.json(rows);
    }
  } catch (error) {
    res.status(500).json({
      error: "Error",
    });
  }
};

// elista por id
export const GetId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      ` SELECT * FROM estados
    WHERE ID=?`,
      [id]
    );
    if (rows.length <= 0) {
      res.status(404).json({ error: `Error 404 no se econtro registros` });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({
      error: "Error",
    });
  }
};

// elista por rango
export const GetIdRango = async (req, res) => {
  try {
    const { id, idDos } = req.params;
    const [rows] = await db.query(
      `
    SELECT * FROM estados
    WHERE ID BETWEEN ? AND ?;`,
      [id, idDos]
    );
    if (rows.length <= 0) {
      res.status(404).json({ error: `Error 404 no se econtro registros` });
    } else {
      res.json(rows);
    }
  } catch (error) {
    res.status(500).json({
      error: "Error",
    });
  }
};

// crear registro
export const Post = async (req, res) => {
  try {
    const { Nombre, Descripcion } = req.body;
    const [rows] = await db.query(
      ` INSERT INTO estados  (Nombre,Descripcion) VALUES (?,?)`,
      [Nombre, Descripcion]
    );

    res.json({
      ID: rows.insertId,
      Nombre,
      Descripcion,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error",
    });
  }
};

// edita un registro
export const Patch = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Descripcion } = req.body;
    const [resul] = await db.query(
      `
    update estados set  Nombre=IFNULL(?,Nombre),Descripcion=IFNULL(?,Descripcion)
    where ID=?`,
      [Nombre, Descripcion, id]
    );

    if (resul.affectedRows <= 0) {
      return res.status(404).json({ result: "error 505 no se econtro" });
    }

    const [rows] = await db.query(
      `
  SELECT * FROM estados
  where ID=?`,
      [id]
    );

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      error: "Error",
    });
  }
};

// elimina un registro
export const Delete = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      `
  DELETE FROM estados
  where ID=? `,
      [id]
    );

    if (rows.affectedRows <= 0) {
      res.status(404).json({ result: "error 505 no se econtro" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      error: "Error",
    });
  }
};

// elimina por rango
export const DeleteRango = async (req, res) => {
  try {
    const { id, idDos } = req.params;
    const [rows] = await db.query(
      `
    DELETE FROM estados
    WHERE ID BETWEEN ? AND ? `,
      [id, idDos]
    );

    if (rows.affectedRows <= 0) {
      res.status(404).json({ result: "error 505 no se econtro" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      error: "Error",
    });
  }
};
