import { db } from "../db/db.js";


// enlista doros
export const GetPermisos = async (req, res) => {
  const get = await db.query(`
    SELECT * FROM exotic_bar.permisos;
    `);
  res.json(get);
};


// elista por id
export const GetPermisosID = async (req, res) => {
  const [rows] = await db.query(
    `
    SELECT * FROM exotic_bar.permisos
    where ID= ? `,
    [req.params.id]
  );

  if (rows.length <= 0) {
    res.status(404).json({ mensage: "error 404" });
  }
  res.json(rows);
};




// elista por rango
export const GetPermisosIDRango = async (req, res) => {
  const [rows] = await db.query(
    `
    SELECT * FROM exotic_bar.permisos
    WHERE ID BETWEEN ? AND ?;
    `,
    [req.params.id,req.params.idDos]
  );

  if (rows.length <= 0) {
    res.status(404).json({ mensage: "error 404" });
  }
  res.json(rows);
};






export const PostCreate = async (req, res) => {
  const { Nombre, Descripcion } = req.body;
  const [rows] = await db.query(
    "INSERT INTO permisos (Nombre,Descripcion) VALUES  (?,?)",
    [Nombre, Descripcion]
  );

  res.json({
    ID: rows.insertId,
    Nombre,
    Descripcion,
  });
};

export const DeletePermisosID = async (req, res) => {
  const [rows] = await db.query(
    `
    DELETE FROM exotic_bar.permisos
    where ID= ? `,
    [req.params.id]
  );

  if (rows.affectedRows <= 0) {
    return res.status(404).json({ result: "error 505 no se econtro" });
  }
  res.sendStatus(204);
};

export const PatchUdate = async (req, res) => {
  const { id } = req.params;
  const { Nombre, Descripcion } = req.body;
  console.log(id, Nombre, Descripcion);

 const [resul]= await db.query(`
    update permisos  set Nombre=IFNULL(?,Nombre) , Descripcion=IFNULL(?,Descripcion) 
    where ID=?`,[Nombre,Descripcion,id]
    );

    if (resul.affectedRows <= 0) {
      return res.status(404).json({ result: "error 505 no se econtro" });
    }

    const [rows] = await db.query( `
      SELECT * FROM exotic_bar.permisos
      where ID= ? `, [id]  );

  res.json(rows[0]);
};


// elimina por rango
export const DeletePermisosIDRango = async (req, res) => {
  const [rows] = await db.query(
    `
    DELETE FROM exotic_bar.permisos
    WHERE ID BETWEEN ? AND ? `,
    [req.params.id,req.params.iddos]
  );

  if (rows.affectedRows <= 0) {
    return res.status(404).json({ result: "error 505 no se econtro" });
  }
  res.sendStatus(204);
};

// WHERE ID BETWEEN ? AND ?;