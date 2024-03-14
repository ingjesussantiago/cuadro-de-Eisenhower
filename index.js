import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js"
import { ordenarFecha } from "./utils.js";


import managerActividad from "./managerActividad.js";
console.log(__dirname);
const app = express()

let puerto = 8080

const ManagerActividad = new managerActividad("./actividades.json")


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/src/publics"))

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/src/views")
app.set("view engine", "handlebars")


app.get("/producto", async (req, res) => {
    // const { tarea, urgencia, id } = req.body;
    const actividad = req.body;

    const productos = await ManagerActividad.getProduct()

    const urgentesEimportantes = productos.filter(item => item.urgencia === "Urgente e Importante");
   
    const tareasOrdenada1=ordenarFecha(urgentesEimportantes)
 
    const UrgentePeroNoImportante = productos.filter(item => item.urgencia === "Urgente pero no Importante");
 
    const tareasOrdenadas2=ordenarFecha(UrgentePeroNoImportante)
  
    const ImportantePeroNoUrgente = productos.filter(item => item.urgencia === "Importante pero no Urgente");

    const NiUrgenteNiImportante = productos.filter(item => item.urgencia === "Ni Urgente ni Importante");
    // console.log(NiUrgenteNiImportante);
  

    // res.render("home", { urgentesEimportantes })
    //  res.json({ productos,urgentesEimportantes})

 res.render("actividades", { productos,urgentesEimportantes,UrgentePeroNoImportante,ImportantePeroNoUrgente,NiUrgenteNiImportante })


})

app.post("/producto", async (req, res) => {
    const producto = req.body
    const nuevoProducto = await ManagerActividad.addProduct(producto)
    // res.json({ message: "Prodcuto creado", producto: nuevoProducto })
    res.redirect("/producto")
})

app.get("/producto/:id",async(req, res)=>{
    const { id } = req.params
    console.log(id);
    const ElementoBorrar = await ManagerActividad.delateProductById(+id)
    res.redirect("/producto")
})


app.listen(puerto, () => {

    console.log("escuchando al puerto", puerto);
})