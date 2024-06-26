import { db } from "../db/db.js";
import { v4 as uuidv4 } from 'uuid';

//  lista

// enlista doros
export const Get = async (req, res) => {
  try {
    const rows = await db.query(`
  SELECT * FROM exotic_bar.permisos;
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
    const [rows] = await db.query(
      `
    SELECT * FROM exotic_bar.permisos
    where ID= ? `,
      [req.params.id]
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
    const [rows] = await db.query(
      `
    SELECT * FROM exotic_bar.permisos
    WHERE ID BETWEEN ? AND ?;
    `,
      [req.params.id, req.params.idDos]
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
      "INSERT INTO permisos (ID,Nombre,Descripcion) VALUES  (?,?,?)",
      [uuidv4(),Nombre, Descripcion]
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
    console.log(id, Nombre, Descripcion);

    const [resul] = await db.query(
      `
    update permisos  set Nombre=IFNULL(?,Nombre) , Descripcion=IFNULL(?,Descripcion) 
    where ID=?`,
      [Nombre, Descripcion, id]
    );

    const [rows] = await db.query(
      `
      SELECT * FROM exotic_bar.permisos
      where ID= ? `,
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
    const [rows] = await db.query(
      `
      DELETE FROM exotic_bar.permisos
      where ID= ? `,
      [req.params.id]
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

