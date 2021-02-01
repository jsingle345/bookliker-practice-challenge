document.addEventListener("DOMContentLoaded", function() {});


// VARIABLES // 
const booksURL = 'http://localhost:3000/books' 
const bookListContainer = document.querySelector('#list-panel')
const bookList = document.querySelector('#list')
const bookShowContainer = document.querySelector('#show-panel')


// FETCHES

const showBookList = (books) => {
    
    books.forEach(book => {
        let listItem = document.createElement('li')
        listItem.innerText = book.title

        listItem.addEventListener('click', event => {

           fetch(`${booksURL}/${book.id}`)
           .then(resp => resp.json())
           .then(book => showBook(book))
        })

        bookList.append(listItem)
    })

    bookListContainer.append(bookList)

}

const showBook = (book) => {
    
    bookShowContainer.innerText = ``
    console.log(book)
    let bookPic = document.createElement('img')
        bookPic.src=`${book.img_url}`; bookPic.alt = 'Book Cover'

    let title = document.createElement('h1')
        title.innerText = book.title

    let subtitle = document.createElement('h3')
        subtitle.innerText = book.subtitle

    let author = document.createElement('h2')
        author.innerText = `By: ${book.author}`

    let description = document.createElement('p')
        description.innerText = book.description

    let likerList = document.createElement('ul')
        likerList.setAttribute('id', '#follewers')
            book.users.forEach(user => {
                let supporter = document.createElement('li')
                supporter.setAttribute('id', `${user.id}`)
                supporter.innerText = user.username
                likerList.append(supporter)
                })
            
    let likeButton = document.createElement('button')
        likeButton.innerText = "LIKE"
        likeButton.setAttribute('id', `${book.id}`)
        likeButton.addEventListener('click', event => {
            likeBook(book.id)
        })
    //image 
    //title - h1
    //subtitle - h3
    //author - h2
    //description - p 
    //followers - li
    //Like button - button
    bookShowContainer.append(bookPic, title, subtitle, author, description, likerList, likeButton )
}

const likeBook = (id) => {
    

    const currentUser = {
        id: '1',
        username: "pouros", 
    }
   

    const reqObj = {
        method: "PATCH", 
        header: {
            "Content-Type": 'application/json', 
            "Accept": 'application/json'
        }, 
        body: JSON.stringify({
            ...book, 
            users: {...users, currentUser}
        })
    }

    fetch(`${booksURL}/${id}`, reqObj)
    .then(resp => resp.json())
    .then(console.log)
}

const getBooks = () => {
    fetch(booksURL)
    .then(resp => resp.json())
    .then(books => showBookList(books))
}



getBooks()