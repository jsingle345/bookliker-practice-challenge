// VARIABLES //

const booksURL = "http://localhost:3000/books"
const usersURL = "http://localhost:3000/users"

const listPanel = document.querySelector('#list-panel')

const showPanel = document.querySelector('#show-panel')
const listItem = document.querySelectorAll('.list-item')


//METHOD//

const fetchList = () => {
    fetch(booksURL)
    .then(resp => resp.json())
    .then(books => showTitles(books))
}

const showTitles = (books) => {
        listPanel.innerHTML = ``
    books.forEach(book => {
        listPanel.innerHTML += (`<li data-id="${book.id}" class='list-item'>${book.title}</li>`)
    })
}



const showBook = (book) => {

    id = book.dataset.id
  
    fetch(booksURL + '/' + `${id}`)
    .then(resp => resp.json())
    .then(data => displayBook(data))
}

const displayBook = (book) => {
    showPanel.innerHTML = ``
    showPanel.innerHTML += (`<img src=${book.img_url} />
                            <h1 id="${book.id}">${book.title}</h1>
                            <h2>${book.subtitle}</h2>
                            <p>${book.description}</p>
                            <h3>By: ${book.author}</h3>`)
                   
    const h4 = document.createElement('h4')
    h4.innerText = "Users:"
    const ul = document.createElement('ul')
    book.users.forEach(user => {
        const li = document.createElement('li')
        li.setAttribute('id', `${user.id}`)
        li.innerText += user.username
        ul.append(li)
    } )
    const likeBtn = document.createElement('button')
    likeBtn.setAttribute('id', `1`)
    likeBtn.setAttribute('class', 'like-btn')
    likeBtn.innerText = "Like"
    showPanel.append(h4, ul, likeBtn)

}

const addLike = (target) => {
    bookId = target.parentElement.children[1].id
    userId = target.id
    
    fetch(booksURL, {
        method: "POST", 
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }, 
        body: JSON.stringify({
            book_id : bookId,
            users_id : userId
        })
    })
    .then(resp => resp.json())
    .then(response => displayBook(response))
}

// FETCH //

fetchList()

//EVENT LISTENER//

document.addEventListener('click', event => {
    if(event.target.className === 'list-item'){
        showBook(event.target)
    }
    if(event.target.className === 'like-btn'){
        addLike(event.target)
    }
})

