import { db } from "../db/db.js";
//lista



// trae todos lod roles
export const Get= async (req,res)=>{
    const rows= await db.query(`
    SELECT * FROM roles;
    `)
    if (rows.length <= 0) {
        res.status(404).json({ error: `Error 404 no se econtro registros` });
      } else {
        res.json(rows[0]);
      }
}


// busca por id
export const GetId= async (req,res)=>{
    const rows= await db.query(`
    SELECT * FROM roles
    WHERE ID = ?`,[req.params.id])
    if (rows.length <= 0) {
        res.status(404).json({ error: `Error 404 no se econtro registros` });
      } else {
        res.json(rows[0]);
      }
}


// trae un rango por id
export const GetIdRango= async (req,res)=>{
    const {id,idDos}=req.params;
    const rows= await db.query(`
    SELECT * FROM roles
    WHERE ID BETWEEN ? AND ?`,[id,idDos])
    if (rows.length <= 0) {
        res.status(404).json({ error: `Error 404 no se econtro registros` });
      } else {
        res.json(rows[0]);
      }
}



// crear registro
export const  Post= async (req,res)=>{
    const {Nombre,Descripcion}=req.body;
    const [rows]= await db.query(`
    INSERT INTO roles (Nombre,Descripcion) VALUES (?,?) `,[Nombre,Descripcion]);
    res.json(  {
        ID:rows.insertId,
        Nombre,
        Descripcion

     })
}


// edita un registro
export const Patch= async  (req,res)=>{
    const {id}=req.params;
    const {Nombre, Descripcion}=req.body;
    const [resul]=await db.query(`
    update roles  set Nombre=IFNULL(?,Nombre),Descripcion=IFNULL(?,Descripcion) 
    where ID=?`,[Nombre,Descripcion,id])

    

    const [rows]= await db.query(`
    SELECT * FROM roles 
    WHERE ID=? `,[id])
    res.json(rows[0])
}

// elimina un registro
export const Delete= async (req,res)=>{
    const {id}=req.params;
    const [rows]= await db.query(`
    DELETE FROM roles 
    WHERE ID=?`,[id]);

    if (rows.affectedRows<=0) {
        res.status(505).json({resul:"No se econtro ese registro."})
    }
    res.sendStatus(204)

}

// elimina un registro por rango
export const DeleteRango= async (req,res)=>{
    const {id,idDos}=req.params;
    const [rows]= await db.query(`
    DELETE FROM roles 
    WHERE ID BETWEEN ? AND ? `,[id,idDos]);

    if (rows.affectedRows<=0) {
        res.status(505).json({resul:"No se econtro ese registro."})
    }
    res.sendStatus(204)

}