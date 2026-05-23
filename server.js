const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = require("./firebase-config.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// OBTENER LIBROS
app.get("/books", async (req, res) => {

    const snapshot = await db.collection("books").get();

    const books = [];

    snapshot.forEach(doc => {

        books.push({
            id: doc.id,
            ...doc.data()
        });
    });

    res.json(books);
});


// AGREGAR LIBRO
app.post("/books", async (req, res) => {

    const book = req.body;

    await db.collection("books").add(book);

    console.log("🔥 GUARDADO EN FIREBASE");

    res.json({
        message: "Libro agregado"
    });
});


// ELIMINAR LIBRO
app.delete("/books/:id", async (req, res) => {

    const id = req.params.id;

    await db.collection("books").doc(id).delete();

    res.json({
        message: "Libro eliminado"
    });
});


app.listen(3000, () => {
    console.log("🚀 Servidor corriendo en puerto 3000");
});