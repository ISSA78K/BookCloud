const API = "https://bookcloud-bvf1.onrender.com/books";


// CARGAR LIBROS
async function loadBooks() {

    const response = await fetch(API);

    const books = await response.json();

    const list = document.getElementById("bookList");

    list.innerHTML = "";

    books.forEach((book) => {

        list.innerHTML += `
            <li>
                ${book.title}

                <button onclick="deleteBook('${book.id}')">
                    Eliminar
                </button>
            </li>
        `;
    });
}


// AGREGAR LIBRO
async function addBook() {

    const title = document.getElementById("title").value;

    await fetch(API, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title
        })
    });

    document.getElementById("title").value = "";

    loadBooks();
}


// ELIMINAR LIBRO
async function deleteBook(id) {

    await fetch(`https://bookcloud-bvf1.onrender.com/books/${id}`, {

        method: "DELETE"

    });

    loadBooks();
}


loadBooks();