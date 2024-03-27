import { db } from "../db/db.js";



// trae todos lod roles
export const GetRoles= async (req,res)=>{
    const GetRoles= await db.query(`
    SELECT * FROM roles;
    `)
    res.json(GetRoles)
}


// busca por id
export const GetRolesID= async (req,res)=>{
    const GetRolesID= await db.query(`
    SELECT * FROM roles
    WHERE ID = ?`,[req.params.id])
    res.json(GetRolesID)
}


// trae un rango por id
export const GetRolesRango= async (req,res)=>{
    const {id,idDos}=req.params;
    const GetRolesID= await db.query(`
    SELECT * FROM roles
    WHERE ID BETWEEN ? AND ?`,[id,idDos])
    res.json(GetRolesID)
}


export const  PostCreate= async (req,res)=>{
    const {Nombre,Descripcion}=req.body;
    const [rows]= await db.query(`
    INSERT INTO roles (Nombre,Descripcion) VALUES (?,?) `,[Nombre,Descripcion]);
    res.json(  {
        ID:rows.insertId,
        Nombre,
        Descripcion

     })
}


export const PatchEditat= async  (req,res)=>{
    const {id}=req.params;
    const {Nombre, Descripcion}=req.body;
    const [resul]=await db.query(`
    update roles  set Nombre=IFNULL(?,Nombre),Descripcion=IFNULL(?,Descripcion) 
    where ID=?`,[Nombre,Descripcion,id])

    if(resul.affectedRows<=0){
        req.status(505).json({resul:"No se econtro al que quiere  modificar"})
    }

    const [rows]= await db.query(`
    SELECT * FROM roles 
    WHERE ID=? `,[id])
    res.json(rows[0])
}


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