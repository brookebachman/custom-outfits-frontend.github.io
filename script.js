document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: peach')

//getClothingsOnPage();

    var outfitLink = document.getElementById("outfit-link")

    addClothesToClothesPage();



    outfitLink.addEventListener("click",function(){

    getOutfitsOnPage();

})

function getOutfitsOnPage(){

    fetch("http://localhost:3000/outfits")
    .then((function(resp){
    return resp.json();
    })).then(function(outfits){
        console.log(outfits)
        const main = document.getElementsByTagName("main")[0]
        main.innerHTML = ""
        outfits.forEach(function(outfit){
            
            const clothingColumn = document.createElement("div")
            clothingColumn.id = "clothes-column"

            const clothingItemCard = document.createElement("div")
            clothingItemCard.id = "clothing-item-card"

            const outfitWithClothingContainer = document.createElement("div")
            outfitWithClothingContainer.id = "oufit-container"

            const outfitInfoContainer = document.createElement("div")
            outfitInfoContainer.id = "outfit-info-column"

            const outfitInfoHTML = `    
            <h1 id="outfit-name">${outfit.name}</h1> 
            <p id="outfit-season">Season: ${outfit.season}</p>
            <p id="outfit-occasion">Occasion:${outfit.occasion}</p>
            <p id="outfit-is-new">Outfit Status: ${outfit.is_new}</p>
            `
            outfitInfoContainer.innerHTML += outfitInfoHTML
            outfitWithClothingContainer.appendChild(outfitInfoContainer)


            outfit.clothings.forEach(function(clothing){
                console.log(clothing)

                const clothesInfoHTML = `
                <h3 id="clothes-name">${clothing.name}</h3>
                <img id="clothing-image" src = ${clothing.photo_url}/>
                <p id="clothes-color:>Color: ${clothing.color}</p>
                <p id="clothes-clothing-type:>Type: ${clothing.clothing_type}</p>
                <p id="clothes-material:>Material: ${clothing.material}</p>
                <p id="clothes-brand:>Brand: ${clothing.brand}</p>
                <p id="clothes-size:>Size: ${clothing.size}</p>
                `

                clothingItemCard.innerHTML += clothesInfoHTML
                
                console.log(clothingColumn)

            })

            clothingColumn.appendChild(clothingItemCard)


        main.appendChild(outfitWithClothingContainer)
        outfitWithClothingContainer.appendChild(clothingColumn)
        
        })

    })
}})

function addClothesToClothesPage(){

    const clothesLink = document.getElementById("clothes-link")
    
    clothesLink.addEventListener("click", function(){
        console.log("you clicked clothes")
        

        const clothesFormInputs = `

            <form>
                <h3>Add Clothing Item!</h3>
                <input
                    type="text"
                    name="name"
                    value=""
                    placeholder="Enter Clothing name..."
                    class="input-text"
                />
                <br />
                <input
                    type="text"
                    name="image"
                    value=""
                    placeholder="Clothing image URL..."
                    class="input-text"
                />
                <br />
                <br />
                <input
                    type="text"
                    name="color"
                    value=""
                    placeholder="Clothing's color..."
                    class="input-text"
                />
                <br />
                <br />
                <input
                    type="text"
                    name="clothing-type"
                    value=""
                    placeholder="Clothing Type"
                    class="input-text"
                />
                <br />
                <br />
                <input
                    type="text"
                    name="brand"
                    value=""
                    placeholder="Brand"
                    class="input-text"
                />
                <br />
                <br />
                <input
                    type="text"
                    name="material"
                    value=""
                    placeholder="Material type"
                    class="input-text"
                />
                <br />
                <br />
                <input
                    type="text"
                    name="size"
                    value=""
                    placeholder="Size"
                    class="input-text"
                />
                <br />
                <input id="submit-button"
                type="submit"
                name="submit"
                value="Add Clothes"
                class="submit"
            />

              
            </form> 
       
        `
        const clothesForm = document.getElementsByClassName("add-clothes-form")[0]
        clothesForm.innerHTML = clothesFormInputs
       // const submitButton = document.getElementById("submit-button")

        clothesForm.addEventListener("submit", function(event){
            debugger
            event.preventDefault();

            fetch("http://localhost:3000/clothings",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
             body: JSON.stringify(
                 {
                     name:  event.target.name.value,
                     image: event.target.image.value,
                     color: event.target.color.value,
                     clothing-type: event.target.clothing-type.value,
                     brand: event.target.brand.value,
                     material: event.target.material.value,
                     size: event.target.size.value,

             
                
            })
                

        })



            // if someone clicks submit i want to add their inputs to the backend with a post
            //then i want to update the front end to display what they added

        })
    })
   

   
}




// function getClothingsOnPage(){
//     const clothingImage = document.getElementById("clothing-image")
//     fetch("http://localhost:3000/clothings")
//     .then((function(resp){
//       return resp.json();
//     })).then(function(data){
//         console.log(data)
//         clothingImage.src = data.clothings[0].photo_url
//     })
// }