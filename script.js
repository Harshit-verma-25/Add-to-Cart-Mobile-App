import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// ref = reference module of FireBase

const appSetting = {
    databaseURL: "https://add-to-cart-a1f58-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const shoppingListinDB = ref(database, "ShoppingList")

const inputBtn = document.getElementById("input-btn")
const addBtn = document.getElementById("add-btn")
const shoppingList = document.getElementById("shopping-list")

addBtn.addEventListener("click", function(){
    let inputValue = inputBtn.value
    push(shoppingListinDB, inputValue)

    clearInput()
})

onValue(shoppingListinDB, function(snapshot){

    if(snapshot.exists()){
        let itemArray = Object.entries(snapshot.val())
    
        clearShoppingList()
        for(let i = 0; i < itemArray.length; i++){
            let currentItem = itemArray[i]
            addItemToShoppingList(currentItem)
        }
    }
    else{
        shoppingList.innerText = "No Item Here.... yet"
    }
})

function clearShoppingList(){
    shoppingList.innerHTML = ""
}

function clearInput(){
    inputBtn.value = ""
}

function addItemToShoppingList(ListItem){
    let itemID = ListItem[0]
    let itemValue = ListItem[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){
        let exactLocationInDB = ref(database, `ShoppingList/${itemID}`)
        remove(exactLocationInDB)
    })
    shoppingList.append(newEl)
}