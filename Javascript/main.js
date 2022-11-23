let link = "https://coronavirus-19-api.herokuapp.com/countries"
let template = renderElement(".template__card").content
let parent = renderElement(".parent__cards")
const form = renderElement("form")
let uzb = "Uzbekistan"
let allArray = []
let card ;
window.addEventListener("load", () => {
    let checkBox = renderElement(".check")
    let body = renderElement("body")
    const handleChange = () => {
        body.classList.toggle("chorni")
    }
    checkBox.addEventListener("change", handleChange)
})
const renders = (arr) => {
    parent.innerHTML = null
    for(let i = 0; i<arr.length; i++){
        let clone = template.cloneNode(true)
        let name = clone.querySelector(".card__title")
        card = clone.querySelector(".card")
        name.textContent = arr[i].country
        let kasallar = clone.querySelector(".kasallar__count")
        kasallar.textContent = arr[i].cases
        let tuzalganlar = clone.querySelector(".tuzalganlar__count")
        tuzalganlar.textContent = arr[i].active
        let ulganlar = clone.querySelector(".ulganlar__count")
        ulganlar.textContent = arr[i].deaths
        let test = clone.querySelector(".test__count")
        test.textContent = arr[i].totalTests
        parent.appendChild(clone)
    }
}

;(async function (){
    let jsons = await fetch(link + "/" + uzb).catch((error) => {
        if(error instanceof TypeError){
            let h1 = createTag("h1")
            h1.className = "h1__network"
            h1.appendChild(textNode("Not a Network"))
            parent.appendChild(h1)
        }
    })
    let response = await jsons.json()
    allArray = [...allArray, response]
    if(allArray.length > 1){
        allArray.splice(1, allArray.length-1)
    }
    
    renders(allArray)
}())
let input = document.querySelector("form input")
let error_text = renderElement(".error")
let formArray = []
const handleSub = (event) => {
    event.preventDefault()
    let inputValue = input.value
    fetch(link+"/"+inputValue)
    .then((response) => response.json())
    .then((data) =>  {
        formArray = [data]
        error_text.classList.add("none")
        renders(formArray)
    })
    .catch((error) => {
        if(error instanceof SyntaxError){
            Errors()
        }
    })
}
form.addEventListener("submit", handleSub)

function Errors(){   
    error_text.classList.add("block")
}