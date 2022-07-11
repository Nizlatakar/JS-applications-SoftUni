let loadBookButton = document.querySelector("#loadBooks");
let url = "http://localhost:3030/jsonstore/collections/books";
let tbodyElement = document.getElementsByTagName("tbody")[0];
let formElement = document.getElementsByTagName("form")[0];

loadBookButton.addEventListener("click", loadBooks);

formElement.addEventListener('submit',function(e){
    e.preventDefault()
    // 1 GET data from form 
    // 2 POST to add new book
})

async function loadBooks() {
  try {
    let response = await fetch(url);

    if (response.status != 200) {
      throw new Error("Problem loading data");
    }
    let data = await response.json();

    let entries = Object.entries(data);
    tbodyElement.innerHTML = "";

    for (let [key, { author, title }] of entries) {
      let trElement = document.createElement("tr");
      let titleTDElement = document.createElement("td");
      titleTDElement.textContent = title;
      let authorTDElement = document.createElement("td");
      authorTDElement.textContent = author;

      trElement.appendChild(titleTDElement);
      trElement.appendChild(authorTDElement);

      let newTDElement = document.createElement("td");
      let editButton = document.createElement("button");
      let deleteButton = document.createElement("button");
      editButton.textContent = "Edit";
      deleteButton.textContent = "Delete";
      editButton.addEventListener('click',edit)
      deleteButton.addEventListener('click',remove)
      newTDElement.appendChild(editButton);
      newTDElement.appendChild(deleteButton);

      trElement.appendChild(newTDElement);
      tbodyElement.appendChild(trElement);

      function edit(e){
        // todo PUT 
        e.preventDefault()
        fetch(`${url}/${key}`,{
            method:'PUT',
            headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                titleTDElement: title.value.trim(),
                authorTDElement: author.value.trim(),
              }),
        })
        
      }

      function remove(e){
        e.preventDefault()
        fetch(`${url}/${key}`,{
            method:'DELETE'
        })
        trElement.remove()
      }
    }
  } catch (error) {
    alert(err.message);
  }
}
