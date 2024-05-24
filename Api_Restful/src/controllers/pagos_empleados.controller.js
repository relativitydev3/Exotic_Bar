import { db } from "../db/db.js";
import { v4 as uuidv4 } from 'uuid';

//lista

// enlista doros
export const Get = async (req, res) => {
  try {
    const [rows] = await db.query(`
  SELECT * FROM pagos_empleado
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
      ` SELECT * FROM pagos_empleado
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
    SELECT * FROM pagos_empleado
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
    const { ID_Usuario, id_Rol, Dia_trabajados } = req.body;
    const [rows] = await db.query(
      ` INSERT INTO pagos_empleado  (ID,  ID_Usuario, id_Rol, Dia_trabajados ) VALUES (?,?,?,?)`,
      [uuidv4(),ID_Usuario, id_Rol, Dia_trabajados]
    );

    res.json({
      ID: rows.insertId,
      ID_Usuario,
      id_Rol,
      Dia_trabajados,
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
    const { ID_Usuario, id_Rol, Dia_trabajados } = req.body;
    const [resul] = await db.query(
      `
    update pagos_empleado set   ID_Usuario=IFNULL(?,ID_Usuario), id_Rol=IFNULL(?,id_Rol), Dia_trabajados=IFNULL(?,Dia_trabajados)
    where ID=?`,
      [ID_Usuario, id_Rol, Dia_trabajados, id]
    );

    if (resul.affectedRows <= 0) {
      return res.status(404).json({ result: "error 505 no se econtro" });
    }

    const [rows] = await db.query(
      `
  SELECT * FROM pagos_empleado
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
  DELETE FROM pagos_empleado
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
