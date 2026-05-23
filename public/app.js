async function loadBooks() {

    const response = await fetch("/books");

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


async function addBook() {

    const title = document.getElementById("title").value;

    await fetch("/books", {

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


async function deleteBook(id) {

    await fetch(`/books/${id}`, {
        method: "DELETE"
    });

    loadBooks();
}


loadBooks();