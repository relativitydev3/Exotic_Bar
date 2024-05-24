import { db } from "../db/db.js";
import { v4 as uuidv4 } from 'uuid';

//lista

// enlista doros
export const Get = async (req, res) => {
  try {
    const [rows] = await db.query(`
  SELECT * FROM productos
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
      ` SELECT * FROM productos
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
    SELECT * FROM productos
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
    const { ID_Paga, Nombre, Descripcion, ID_Estado, ID_Categoria } = req.body;
    const [rows] = await db.query(
      ` INSERT INTO productos  (ID, ID_Paga,Nombre,Descripcion,ID_Estado,ID_Categoria) VALUES (?,?,?,?,?,?)`,
      [uuidv4(),ID_Paga, Nombre, Descripcion, ID_Estado, ID_Categoria]
    );

    res.json({
      ID: rows.insertId,
      ID_Paga,
      Nombre,
      Descripcion,
      ID_Estado,
      ID_Categoria,
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
    const { ID_Paga, Nombre, Descripcion, ID_Estado, ID_Categoria } = req.body;
    const [resul] = await db.query(
      `
    update productos set ID_Paga=IFNULL(?,ID_Paga), Nombre=IFNULL(?,Nombre), Descripcion=IFNULL(?,Descripcion), ID_Estado=IFNULL(?,ID_Estado), ID_Categoria=IFNULL(?,ID_Categoria)
    where ID=?`,
      [ID_Paga, Nombre, Descripcion, ID_Estado, ID_Categoria, id]
    );

    if (resul.affectedRows <= 0) {
      return res.status(404).json({ result: "error 505 no se econtro" });
    }

    const [rows] = await db.query(
      `
  SELECT * FROM productos
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
  DELETE FROM productos
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

