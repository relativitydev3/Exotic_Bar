import { db } from "../db/db.js";
//lista

// enlista doros
export const Get = async (req, res) => {
  try {
    const [rows] = await db.query(`
  SELECT * FROM pedidos
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
      ` SELECT * FROM pedidos
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
    SELECT * FROM pedidos
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
    const { ID_usuarios, ID_Mesa, Nombre, Descripcion, Fecha, Total } =
      req.body;
    const [rows] = await db.query(
      ` INSERT INTO pedidos  ( ID_usuarios, ID_Mesa, Nombre, Descripcion, Fecha,Total ) VALUES (?,?,?,?,?,?)`,
      [ID_usuarios, ID_Mesa, Nombre, Descripcion, Fecha, Total]
    );

    res.json({
      ID: rows.insertId,
      ID_usuarios,
      ID_Mesa,
      Nombre,
      Descripcion,
      Fecha,
      Total,
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
    const { ID_usuarios, ID_Mesa, Nombre, Descripcion, Fecha, Total } =
      req.body;
    const [resul] = await db.query(
      `
    update pedidos set  ID_usuarios=IFNULL(?,ID_usuarios), ID_Mesa=IFNULL(?,ID_Mesa), Nombre=IFNULL(?,Nombre), Descripcion=IFNULL(?,Descripcion), Fecha=IFNULL(?,Fecha),Total=IFNULL(?,Total)
    where ID=?`,
      [ID_usuarios, ID_Mesa, Nombre, Descripcion, Fecha, Total, id]
    );

    if (resul.affectedRows <= 0) {
      return res.status(404).json({ result: "error 505 no se econtro" });
    }

    const [rows] = await db.query(
      `
  SELECT * FROM pedidos
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
  DELETE FROM pedidos
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
    DELETE FROM pedidos
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
