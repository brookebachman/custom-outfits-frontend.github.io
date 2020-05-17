document.addEventListener('DOMContentLoaded', (event) => {
	console.log('DOM fully loaded and parsed');
});

const outfitLink = document.getElementById('outfit-link');
//onst outfitFormLink = document.getElementById("add-outfit-link")
const allClothesLink = document.getElementById('all-clothes-link');
const clothesLink = document.getElementById('add-clothes-link');
const outfitForm = document.getElementsByClassName('add-outfit-form')[0];
const deleteButton = document.createElement('button');
const likeButton = document.createElement('button');
const main = document.getElementsByClassName('main-container')[0];
const welcome = document.getElementById('welcome');

outfitLink.addEventListener('click', function () {
	getOutfitsOnPage();
});

clothesLink.addEventListener('click', function () {
	makeClothesFormAppear();
});

allClothesLink.addEventListener('click', function () {
	getClothingsOnPage();
});

main.addEventListener('click', function (event) {
	console.log("you clicked a button")
	//in this function i am adding an event listener on the main div, then i am retrieving the clothing id from the button's id because i added the clothing id to the button to make them matc. Once i get the event.target, if that matches delete-button. I turn the string into an array. I use length-1 in order to get my index. Once i get the index i plug that index into the array i created to get the id value.
	if (event.target.className === 'deletes-item') {
		let deleteIdArr = event.target.id.split('-');
		let lastIndex = event.target.id.split('-').length - 1;
		let clothesId = deleteIdArr[lastIndex];
		deleteClothingItemInOutfit(clothesId);
	} else if (event.target.className === 'like-clothes'){
		let likeIdArr = event.target.id.split('-');
		let lastIndex = event.target.id.split('-').length - 1;
		let clothesId = likeIdArr[lastIndex];
		updateLikesOnClothings(clothesId);
	}

});
function getOutfitsOnPage() {
	main.innerText = '';
	main.style.display = 'grid';
	fetch('http://localhost:3000/outfits')
		.then(function (resp) {
			return resp.json();
		})
		.then(function (outfits) {
			const main = document.getElementsByClassName('main-container')[0];
			main.innerHTML = '';

			outfits.forEach(function (outfit) {
				const outfitColumn = document.createElement('div');
				outfitColumn.id = 'outfit-column';
				const outfitInfoHTML = `   
                <div> 
                <h1 id="outfit-name">${outfit.name}</h1> 
                <p id="outfit-season">Season: ${outfit.season}</p>
                <p id="outfit-occassion">Occasion:${outfit.occasion}</p>
                </div>
                `;

				outfitColumn.innerHTML += outfitInfoHTML;

				outfit.clothings.forEach(function (clothing) {
					const clothesInfoHTML = `
					<h3 id="clothes-name">${clothing.name}</h3>
					<img id="clothing-image" src = ${clothing.photo_url}/>
					<p id="clothes-material":>Material: ${clothing.material}</p>
					<p id="clothes-brand":> ${clothing.brand}</p>
					<p id="clothes-size":>Size: ${clothing.size}</p>
					<p id="like-count-clothes">Likes 0</p>
					<button id="like-button" data-id={clothing.id}> ♡
					</button>
					<button id="delete-button" data-id={clothing.id}> X </button>
					</div>
					`;
					clothesInfoHTML.id = clothing.id;
					outfitColumn.innerHTML += clothesInfoHTML;
				});

				//outfitColumn.appendChild(clothingItemCard);
				main.appendChild(outfitColumn);
			});
		});
}

function getClothingsOnPage() {
	const clothingItemCard = document.createElement('div');
	const clothingColumn = document.createElement('div');
	clothingColumn.id = 'clothes-column';
	clothingItemCard.id = 'clothing-item-card';
	const main = document.getElementsByClassName('main-container')[0];
	main.innerText = '';
	main.style.display = 'grid';

	fetch('http://localhost:3000/clothings')
		.then(function (resp) {
			return resp.json();
		})
		.then(function (clothings) {
			clothings.forEach(function (clothing) {
				const clothesInfoHTML = `
                
                <h3 id="clothes-name-item">${clothing.name}</h3>
                <img id="clothing-image" src = ${clothing.photo_url}/>
                <div class="tags" id="clothes-material">Material: ${clothing.material}</div>
                <div class="tags" id="clothes-brand">${clothing.brand}</div>
				<div class="tags" id="clothes-size">Size: ${clothing.size}</div>
				<div class="tags"id="like-count-clothes">Likes 0</p>
                `;

				const deleteButton = document.createElement('button');
				deleteButton.id = 'delete-item-button-' + clothing.id;
				deleteButton.className = 'deletes-item';
				deleteButton.innerText = '🗑';

				const likeButton = document.createElement('button');
				likeButton.id = 'add-item-button-' + clothing.id;
				likeButton.className = 'like-clothes';
				likeButton.innerText = '♡';

				const clothingStuff = document.createElement('div');
				clothingStuff.className = 'clothing-items';
				clothingStuff.innerHTML += clothesInfoHTML;
				//clothingItemCard.innerHTML += clothesInfoHTML
				clothingStuff.appendChild(likeButton)
				clothingStuff.appendChild(deleteButton);
				main.appendChild(clothingStuff);
			});

			clothingColumn.appendChild(clothingItemCard);
			main.appendChild(clothingColumn);
		});
}

function addOutfitToOutfitsPost() {
	let data = {
		outfit: {
			name: event.target[0].name.value,
			season: event.target[0].season.value,
			is_new: event.target[0].is_new.value,
			occasion: event.target[0].occasion.value,
			id: event.target[0].dataset.id,
		},
	};

	fetch('http://localhost:3000/outfits', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (outfitData) {
			console.log(outfitData);
		});
}

function addClothesToClothesPagePost() {
	let data = {
		clothing: {
			name: event.target.name.value,
			photo_url: event.target.photo_url.value,
			color: event.target.color.value,
			clothing_type: event.target.clothing_type.value,
			brand: event.target.brand.value,
			material: event.target.material.value,
			size: event.target.size.value,
			id: event.target.dataset.id,
		},
	};
	console.log('About to post');

	fetch('http://localhost:3000/clothings', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then(function (response) {
			console.log(response.json());
		})
		.then(function (clothingData) {
			console.log(clothingData);
			return 'Your Clothes Were Added';
		});
}

function makeClothesFormAppear() {
	console.log("you clicked this form to appear")
	main.style.display = "block"
	main.innerText = '';
	

	const form = `   
	<form id="add-clothes-form">
              
                    
	<h3 id="form-title">Add Clothing Item! </h3>

	<input
		type="text"
		name="name"
		value=""
		placeholder="Enter a Clothing name..."
		class="input-text"
		id="name"
		
	/>
	<br>
	<input
		type="text"
		name="photo_url"
		value=""
		placeholder="Clothing image URL..."
		class="input-text"
		id="photo_url"
	  

	/>
	<br>
	<br>
	<input
		type="text"
		name="color"
		value=""
		placeholder="Item's color..."
		class="input-text"
		id="color"
		
	/>
	<br>
	<br>
	<input
		type="text"
		name="clothing_type"
		value=""
		placeholder="Clothing Type"
		class="input-text"
		id="clothing_type"
		
	/>
	<br>
	<br>
	<input
		type="text"
		name="brand"
		value=""
		placeholder="Brand"
		class="input-text"
		id="brand"
	/>
	<br>
	<br>
	<input
		type="text"
		name="material"
		value=""
		placeholder="Material"
		class="input-text"
		id="material"
	/>
	<br>
	<br>
	<input
		type="text"
		name="size"
		value=""
		placeholder="Size"
		class="input-text"
		id="size"
	/>
	<br>

	<input id="submit-button"
		type="submit"
		name="submit"
		value="Add Clothes"
		class="submit"
	/>

	</form> `

		main.innerHTML += form;
		document.getElementById("add-clothes-form").addEventListener('submit', function (event) {
	
			event.preventDefault();
			console.log('this submit button works');
			let h3 = document.getElementById('form-title');
			let h1 = document.createElement('h1');
			h1.id = "form-message"
			h1.innerText = 'Your Clothes Were Added Check the Clothes Link!';
			h3.appendChild(h1);
			addClothesToClothesPagePost();
			document.getElementById('add-clothes-form').reset();
		});

}

function deleteClothingItemInOutfit(clothesId) {
	console.log(clothesId);
	fetch(`http://localhost:3000/${clothesId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
		.then(function (resp) {
			return resp.json();
		})
		.then(function (data) {
			let el = document.querySelector(`#delete-item-button-${clothesId}`);

			el.parentElement.remove();
		});
	//get all clothings, and delete the item you do not want
}

function updateLikesOnClothings(clothesId) {
	console.log(clothesId)
	
	let likesCount = document.getElementById("like-count-clothes")
	console.log(likesCount)
    let numLikes = parseInt(likesCount.innerText)
	let newLikesCount = numLikes + 1
	likesCount.innerText = newLikesCount

    fetch(`http://localhost:3000/clothings/${clothesId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            likes: newLikesCount
        })
    }).then(function(resp){
        return resp.json();
    }).then(function(data){
        console.log(data)
       

    })
 
    //we need to grab the id of the item
    //and use that for the patch request

}
