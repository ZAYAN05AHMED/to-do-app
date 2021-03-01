var main = document.getElementById('mainList')
var inputValue = document.getElementById('inp')
firebase.database().ref('todos').on('child_added', function(data){
    
    
    var finalText = document.createTextNode(data.val().value)
    var list = document.createElement('p')
    list.setAttribute('class', 'list')
    list.appendChild(finalText)
    main.appendChild(list)


//========= Create delete Button
    

    var btnDiv = document.createElement('div')
    var btn = document.createElement('button')
    btn.setAttribute('class', 'btn')
    btn.setAttribute('id',data.val().key)
    btn.setAttribute('onClick', 'deleteTodo(this)')
    var btnText = 'Delete'
    var finalbtnText = document.createTextNode(btnText)
    btn.appendChild(finalbtnText)


//========= Create Edit Button


    var editBtn = document.createElement('button')
    editBtn.setAttribute('class', 'btn')
    editBtn.setAttribute('id',data.val().key)
    editBtn.setAttribute('onClick', 'edit(this)')
    var editbtnText = 'Edit'
    var finaleditbtnText = document.createTextNode(editbtnText)
    editBtn.appendChild(finaleditbtnText)
    inputValue.value = ''
    btnDiv.appendChild(btn)
    btnDiv.appendChild(editBtn)
    list.appendChild(btnDiv)

})
function add() {
    var database = firebase.database().ref('todos')
    var key = database.push().key
    var todo = {
        value : inputValue.value,
        key:key
    }
    database.child(key).set(todo)
    inputValue.value = ""
    
}

function deleteTodo(e) {
    var li = e.parentNode.parentNode
    li.remove()
    firebase.database().ref('todos').child(e.id).remove()
    // console.log(e.id)
}

function edit(e) {
    var li = e.parentNode.parentNode
    var editText = prompt('Enter Edit text')
    li.firstChild.nodeValue = editText
    edited = {
        value :editText,
        key : e.id
    }
    firebase.database().ref('todos').child(e.id).set(edited)
    // console.log(li)
}
function deleteAll() {
    firebase.database().ref('todos').remove()
    main.innerHTML = ''
}