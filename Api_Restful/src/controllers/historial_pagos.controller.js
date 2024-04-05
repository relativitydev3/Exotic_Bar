import { db } from "../db/db.js";
//lista

// enlista doros
export const Get = async (req, res) => {
  const [rows] = await db.query(`
    SELECT * FROM historial_pagos
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
    ` SELECT * FROM historial_pagos
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
    SELECT * FROM historial_pagos
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
  const {
    ID_Pagos,
    Novedades,
    Firma_Trabajador,
    Fecha_pago,
    Dia_trabajados,
    Salario_Diario,
    Salario_Total,
    Total_Pagado,
  } = req.body;
  const [rows] = await db.query(
    ` INSERT INTO historial_pagos  ( ID_Pagos, Novedades, Firma_Trabajador,Fecha_pago,Dia_trabajados, Salario_Diario, Salario_Total,Total_Pagado ) VALUES (?,?,?,?,?,?,?,?)`,
    [
      ID_Pagos,
      Novedades,
      Firma_Trabajador,
      Fecha_pago,
      Dia_trabajados,
      Salario_Diario,
      Salario_Total,
      Total_Pagado,
    ]
  );

  res.json({
    ID: rows.insertId,
    ID_Pagos,
    Novedades,
    Firma_Trabajador,
    Fecha_pago,
    Dia_trabajados,
    Salario_Diario,
    Salario_Total,
    Total_Pagado,
  });
};

// edita un registro
export const Patch = async (req, res) => {
  const { id } = req.params;
  const {
    ID_Pagos,
    Novedades,
    Firma_Trabajador,
    Fecha_pago,
    Dia_trabajados,
    Salario_Diario,
    Salario_Total,
    Total_Pagado,
  } = req.body;
  const [resul] = await db.query(
    `
    update historial_pagos set  ID_Pagos=IFNULL(?,ID_Pagos), Novedades=IFNULL(?,Novedades), Firma_Trabajador=IFNULL(?,Firma_Trabajador),Fecha_pago=IFNULL(?,Fecha_pago),Dia_trabajados=IFNULL(?,Dia_trabajados), Salario_Diario=IFNULL(?,Salario_Diario), Salario_Total=IFNULL(?,Salario_Total),Total_Pagado=IFNULL(?,Total_Pagado)
    where ID=?`,
    [
      ID_Pagos,
    Novedades,
    Firma_Trabajador,
    Fecha_pago,
    Dia_trabajados,
    Salario_Diario,
    Salario_Total,
    Total_Pagado,
      id,
    ]
  );

  if (resul.affectedRows <= 0) {
    return res.status(404).json({ result: "error 505 no se econtro" });
  }

  const [rows] = await db.query(
    `
  SELECT * FROM historial_pagos
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
  DELETE FROM historial_pagos
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
  const { id, idDos } = req.params;
  const [rows] = await db.query(
    `
    DELETE FROM historial_pagos
    WHERE ID BETWEEN ? AND ? `,
    [id, idDos]
  );

  if (rows.affectedRows <= 0) {
    res.status(404).json({ result: "error 505 no se econtro" });
  }
  res.sendStatus(204);
};
