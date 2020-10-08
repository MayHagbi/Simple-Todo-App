function itemTemplate(item) {
    return`<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}

// Client Side Rendering:
// Initial Page Load Render
let itemsHTML = items.map(function(item) {
    return itemTemplate(item)
}).join("")

document.getElementById("item-list").insertAdjacentHTML("beforeend", itemsHTML)

// Create item
let createField = document.getElementById("create-field")

document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault()
    axios.post('/create-item', { text: createField.value }).then(function(res) {
        // Create the HTML for a new item
        document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(res.data))
        createField.value = ""
        createField.focus()
    }).catch(function() {
        console.log("Please try later.")
    })
})

document.addEventListener("click", function(e) {    
    // Update item
    if (e.target.classList.contains("edit-me")) {
        let newUserText = prompt("Edit your new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
        if (newUserText) {
            axios.post('/update-item', { text: newUserText, id: e.target.getAttribute("data-id") }).then(function() {
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = newUserText
            }).catch(function() {
                console.log("Please try later.")
            })
        }
    }

    // Delete item
    else if (e.target.classList.contains("delete-me")) {
        if (confirm("Are you sure?")) {
            axios.post('/delete-item', { id: e.target.getAttribute("data-id") }).then(function() {
                e.target.parentElement.parentElement.remove()
            }).catch(function() {
                console.log("Please try later.")
            })
        }
    }
})