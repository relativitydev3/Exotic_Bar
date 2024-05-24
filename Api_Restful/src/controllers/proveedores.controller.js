import { db } from "../db/db.js";
import { v4 as uuidv4 } from 'uuid';

//lista

// enlista toros
export const Get = async (req, res) => {
  try {
    const rows = await db.query(`
  SELECT * FROM exotic_bar.provedores;`);
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

// elista por id
export const GetId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      `
    SELECT * FROM exotic_bar.provedores
    where ID=?`,
      [id]
    );
    if (rows.length <= 0) {
      res.status(404).json({ message: "Error 404 - Proveedor no encontrado" });
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
      `SELECT * FROM exotic_bar.provedores
        WHERE ID BETWEEN ? AND ?`,
      [id, idDos]
    );
    if (rows.length <= 0) {
      res.status(404).json({
        message: `Error 404 - Proveedor no encontrado ${id} -  ${idDos}`,
      });
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
    const { Nombre, Descripcion, Direcion, Dato_Contancto, Precio } = req.body;
    const [rows] = await db.query(
      ` INSERT INTO provedores (ID,Nombre, Descripcion, Direcion, Dato_Contancto, Precio) VALUES (?,?,?,?,?,?)`,
      [uuidv4(),Nombre, Descripcion, Direcion, Dato_Contancto, Precio]
    );

    res.json({
      ID: rows.insertId,
      Nombre,
      Descripcion,
      Direcion,
      Dato_Contancto,
      Precio,
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
    const { Nombre, Descripcion, Direcion, Dato_Contancto, Precio } = req.body;
    const { id } = req.params;
    const [resul] = await db.query(
      `
  UPDATE provedores SET Nombre=IFNULL(?,Nombre), Descripcion=IFNULL(?,Descripcion), Direcion=IFNULL(?,Direcion), Dato_Contancto=IFNULL(?,Dato_Contancto), Precio=IFNULL(?,Precio)
  WHERE ID=?`,
      [Nombre, Descripcion, Direcion, Dato_Contancto, Precio, id]
    );

    const [rows] = await db.query(
      `
    SELECT * FROM provedores
    WHERE ID=?`,
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
  DELETE FROM provedores
  WHERE ID=?`,
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
// elista por rango
