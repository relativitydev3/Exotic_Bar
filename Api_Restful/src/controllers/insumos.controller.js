import { db } from "../db/db.js";

//lista

// enlista todos
export const Get = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM insumos`);
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
      `SELECT * FROM insumos
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
      `SELECT * FROM insumos
    WHERE ID BETWEEN ? AND ?`,
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
    const {
      Nombre,
      Descripcion,
      IMG,
      Unidades,
      Precio_Unitario,
      Precio_total,
    } = req.body;
    const [rows] = await db.query(
      `
    INSERT INTO insumos  (Nombre, Descripcion , IMG, Unidades, Precio_Unitario,Precio_total) VALUES (?,?,?,?,?,?)`,
      [Nombre, Descripcion, IMG, Unidades, Precio_Unitario, Precio_total]
    );

    res.json({
      ID: rows.insertId,
      Nombre,
      Descripcion,
      IMG,
      Unidades,
      Precio_Unitario,
      Precio_total,
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
    const {
      Nombre,
      Descripcion,
      IMG,
      Unidades,
      Precio_Unitario,
      Precio_total,
    } = req.body;
    const [resul] = await db.query(
      `
  UPDATE  insumos SET  Nombre=IFNULL(?,Nombre), Descripcion=IFNULL(?,Descripcion), IMG=IFNULL(?,IMG), Unidades=IFNULL(?,Unidades), Precio_Unitario=IFNULL(?,Precio_Unitario),Precio_total=IFNULL(?,Precio_total)
  WHERE ID=?`,
      [Nombre, Descripcion, IMG, Unidades, Precio_Unitario, Precio_total, id]
    );

    if (resul.affectedRows <= 0) {
      return res.status(404).json({ result: "error 505 no se econtro" });
    }

    const [rows] = await db.query(
      `
  SELECT * FROM insumos
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
    DELETE FROM insumos
    where ID=? `,
      [id]
    );

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ result: "error 505 no se econtro" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      error: "Error",
    });
  }
};
// elista por rango
export const DeleteRango = async (req, res) => {
  try {
    const { id, idDos } = req.params;

    const [rows] = await db.query(
      `
      DELETE FROM insumos
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
