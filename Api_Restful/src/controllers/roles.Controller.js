import { db } from "../db/db.js";
import { v4 as uuidv4 } from 'uuid';
//lista

// trae todos lod roles
export const Get = async (req, res) => {
  try {
    const rows = await db.query(`
    SELECT * FROM roles;
    `);
    if (rows.length <= 0) {
      res.status(404).json({ error: `Error 404 no se econtro registros` });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({
      error: "error",
    });
  }
};

// busca por id
export const GetId = async (req, res) => {
  try {
    const rows = await db.query(
      `
    SELECT * FROM roles
    WHERE ID = ?`,
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

// trae un rango por id
export const GetIdRango = async (req, res) => {
  try {
    const { id, idDos } = req.params;
    const rows = await db.query(
      `
    SELECT * FROM roles
    WHERE ID BETWEEN ? AND ?`,
      [id, idDos]
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

// crear registro
export const Post = async (req, res) => {
  try {
    const { Nombre, Descripcion } = req.body;
    const [rows] = await db.query(
      `
    INSERT INTO roles (ID,Nombre,Descripcion) VALUES (?,?,?) `,
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
    const [resul] = await db.query(
      `
    update roles  set Nombre=IFNULL(?,Nombre),Descripcion=IFNULL(?,Descripcion) 
    where ID=?`,
      [Nombre, Descripcion, id]
    );

    const [rows] = await db.query(
      `
    SELECT * FROM roles 
    WHERE ID=? `,
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
    DELETE FROM roles 
    WHERE ID=?`,
      [id]
    );

    if (rows.affectedRows <= 0) {
      res.status(505).json({ resul: "No se econtro ese registro." });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      error: "Error",
    });
  }
};

