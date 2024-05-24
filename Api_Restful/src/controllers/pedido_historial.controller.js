import { db } from "../db/db.js";
import { v4 as uuidv4 } from 'uuid';

//lista

// enlista doros
export const Get = async (req, res) => {
  try {
    const [rows] = await db.query(`
  SELECT * FROM pedidos_historial
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
      ` SELECT * FROM pedidos_historial
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
    SELECT * FROM pedidos_historial
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
    const { ID_Pedido, ID_Productos, Cantidad, Precio_Producto, Descripcion } =
      req.body;
    const [rows] = await db.query(
      ` INSERT INTO pedidos_historial  (ID, ID_Pedido, ID_Productos, Cantidad, Precio_Producto, Descripcion ) VALUES (?,?,?,?,?,?)`,
      [uuidv4(),ID_Pedido, ID_Productos, Cantidad, Precio_Producto, Descripcion]
    );

    res.json({
      ID: rows.insertId,
      ID_Pedido,
      ID_Productos,
      Cantidad,
      Precio_Producto,
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
    const { ID_Pedido, ID_Productos, Cantidad, Precio_Producto, Descripcion } =
      req.body;
    const [resul] = await db.query(
      `
    update pedidos_historial set  ID_Pedido=IFNULL(?,ID_Pedido), ID_Productos=IFNULL(?,ID_Productos), Cantidad=IFNULL(?,Cantidad), Precio_Producto=IFNULL(?,Precio_Producto), Descripcion=IFNULL(?,Descripcion)
    where ID=?`,
      [ID_Pedido, ID_Productos, Cantidad, Precio_Producto, Descripcion, id]
    );

    if (resul.affectedRows <= 0) {
      return res.status(404).json({ result: "error 505 no se econtro" });
    }

    const [rows] = await db.query(
      `
  SELECT * FROM pedidos_historial
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
  DELETE FROM pedidos_historial
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
