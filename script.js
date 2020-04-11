document.addEventListener('DOMContentLoaded', (event) => {
	console.log('DOM fully loaded and parsed');
});

const outfitLink = document.getElementById('outfit-link');
//onst outfitFormLink = document.getElementById("add-outfit-link")
const allClothesLink = document.getElementById('all-clothes-link');
const clothesLink = document.getElementById('clothes-link');

const clothesForm = document.getElementsByClassName('add-clothes-form')[0];
const outfitForm = document.getElementsByClassName('add-outfit-form')[0];
const deleteButton = document.createElement('button');
const likeButton = document.createElement('button');
const main = document.getElementsByClassName('main-container')[0];
const clothingItemCard = document.createElement('div');
clothingItemCard.id = 'clothing-item-card';
const welcome = document.getElementById('welcome');

outfitLink.addEventListener('click', function () {
	getOutfitsOnPage();
});

clothesLink.addEventListener('click', function () {
	makeClothesFormAppear();
});

allClothesLink.addEventListener('click', function () {
	main.style.display = 'block';
	getClothingsOnPage();
	// const welcome = document.getElementById("welcome")
	// welcome.style.display = "none";
});

main.addEventListener('click', function (event) {
	//in this function i am adding an event listener on the main div, then i am retrieving the clothing id from the button's id because i added the clothing id to the button to make them matc. Once i get the event.target, if that matches delete-button. I turn the string into an array. I use length-1 in order to get my index. Once i get the index i plug that index into the array i created to get the id value.
	if (event.target.className === 'deletes-item') {
		let deleteIdArr = event.target.id.split('-');
		let lastIndex = event.target.id.split('-').length - 1;
		let clothesId = deleteIdArr[lastIndex];
		deleteClothingItemInOutfit(clothesId);
	
	}

});
function getOutfitsOnPage() {
	fetch('https://custom-outfit-backend.herokuapp.com/outfits')
		.then(function (resp) {
			return resp.json();
		})
		.then(function (outfits) {
			const main = document.getElementsByClassName('main-container')[0];
			main.innerHTML = '';

			outfits.forEach(function (outfit) {
				const clothingColumn = document.createElement('div');
				clothingColumn.id = 'clothes-column';

				const clothingItemCard = document.createElement('div');
				clothingItemCard.id = 'clothing-item-card';

				const outfitWithClothingContainer = document.createElement('div');
				outfitWithClothingContainer.id = 'oufit-container';

				const outfitInfoContainer = document.createElement('div');
				outfitInfoContainer.id = 'outfit-info-column';

				const outfitInfoHTML = `   
                <div> 
                <h1 id="outfit-name">${outfit.name}</h1> 
                <p id="outfit-season">Season: ${outfit.season}</p>
                <p id="outfit-occasion">Occasion:${outfit.occasion}</p>
                <p id="outfit-is-new">Outfit Status: ${outfit.is_new}</p>
                </div>
                `;
				outfitInfoContainer.innerHTML += outfitInfoHTML;
				clothingItemCard.appendChild(outfitInfoContainer);

				outfit.clothings.forEach(function (clothing) {

					const clothesInfoHTML = `
                <div id="Clothing-stuff-${clothing.id}">
                <h3 id="clothes-name">${clothing.name}</h3>
                <img id="clothing-image" src = ${clothing.photo_url}/>
                <p id="clothes-color:>Color: ${clothing.color}</p>
                <p id="clothes-clothing-type:>Type: ${clothing.clothing_type}</p>
                <p id="clothes-material:>Material: ${clothing.material}</p>
                <p id="clothes-brand:>Brand: ${clothing.brand}</p>
                <p id="clothes-size:>Size: ${clothing.size}</p>
                </div>
                `;
					const likeButton = document.createElement('button');
					const deleteButton = document.createElement('button');
					const likeCount = document.createElement('div');
					deleteButton.id = 'delete-item-button-' + clothing.id;
					deleteButton.className = 'deletes-item';
					deleteButton.innerText = 'Click to delete this clothing item from this outfit';

					clothingItemCard.innerHTML += clothesInfoHTML;

					likeButton.id = 'like-item-button-' + clothing.id;
					likeButton.className = 'likes-item';
					likeButton.innerText = 'Likes';

					likeCount.innerText = 0;

					likeButton.appendChild(likeCount);

					clothingItemCard.appendChild(likeButton);

					clothingItemCard.appendChild(deleteButton);
				});

				clothingColumn.appendChild(clothingItemCard);

				clothingColumn.appendChild(clothingItemCard);
				main.appendChild(clothingColumn);
			});
		});
}

function getClothingsOnPage() {
	const clothingItemCard = document.createElement('div');
	const clothingColumn = document.createElement('div');
	clothingColumn.id = 'clothes-column';
	clothingItemCard.id = 'clothing-item-card';
	const main = document.getElementsByClassName('main-container')[0];

	fetch('https://custom-outfit-backend.herokuapp.com/clothings')
		.then(function (resp) {
			return resp.json();
		})
		.then(function (clothings) {
	
			clothings.forEach(function (clothing) {
				const clothesInfoHTML = `
                
                <h3 id="clothes-name">${clothing.name}</h3>
                <img id="clothing-image" src = ${clothing.photo_url}/>
                <div class="tags" id="clothes-color">Color: ${clothing.color}</div>
                <div class="tags" id="clothes-clothing-type"> ${clothing.clothing_type}</div>
                <div class="tags" id="clothes-material">Material: ${clothing.material}</div>
                <div class="tags" id="clothes-brand">${clothing.brand}</div>
                <div class="tags" id="clothes-size">Size: ${clothing.size}</div>

                `;

				const deleteButton = document.createElement('button');
				deleteButton.id = 'delete-item-button-' + clothing.id;
				deleteButton.className = 'deletes-item';
				deleteButton.innerText = 'Click to delete this clothing item ';

				const clothingStuff = document.createElement('div');
				clothingStuff.className = 'clothing-items';
				clothingStuff.innerHTML += clothesInfoHTML;
				//clothingItemCard.innerHTML += clothesInfoHTML
				clothingStuff.appendChild(deleteButton);

				const likeButton = document.createElement('button');
				likeButton.id = 'like-item-button-' + clothing.id;
				likeButton.className = 'likes-item';
				likeButton.innerText = 'Likes';
				const likeCount = document.createElement('div');
				likeCount.innerText = 0;

				likeButton.appendChild(likeCount);

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

	fetch('https://custom-outfit-backend.herokuapp.com/outfits', {
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

clothesForm.addEventListener('submit', function (event) {
	event.preventDefault();
	console.log('this submit button works');
	addClothesToClothesPagePost();
});

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

	fetch('https://custom-outfit-backend.herokuapp.com/clothings', {
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

function makeFormAppearOnPage() {
	
	const form = document.getElementsByClassName('outfit-container')[0];
	const otherForm = document.getElementsByClassName('form-container')[0];
	
	otherForm.style.display = 'none';
	form.style.display = 'block';

	let outfitName = document.getElementById('outfit-name');
	let outfitSeason = document.getElementById('outfit-season');
	let outfitOccasion = document.getElementById('outfit-occasion');
	let outfitStatus = document.getElementById('outfit-status');
}

function makeClothesFormAppear() {
	
	const otherForm = document.getElementsByClassName("outfit-container")[0];
	otherForm.style.display = "grid";
	const outFitForm = document.getElementsByClassName("add-outfit-form")[0]
	outFitForm.style.display = "none";

	const form = document.getElementsByClassName('form-container')[0]; //here i 
  
	form.style.display = 'grid';
	welcome.innerHTML = "";
   // welcome.style.display = "none";


}

function deleteClothingItemInOutfit(clothesId) {
	console.log(clothesId);
	fetch(`https://custom-outfit-backend.herokuapp.com/${clothesId}`, {
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

// function updateLikesOnClothings(clothesId) {

//     let likesCount = document.createElement("div")
//     likesCount.innerText = 0
//     let newLikesCount = parseInt(likesCount) + 1
//     const clothingItemCard = document.createElement("div")

//     fetch(`http://localhost:3000/clothings/${clothesId}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//             likes: newLikesCount
//         })
//     }).then(function(resp){
//         return resp.json();
//     }).then(function(data){
//         console.log(data)
//         likesCount += newLikesCount.innerText
//         clothingItemCard.appendChild(likesCount)

//     })
//     debugger
//     //we need to grab the id of the item
//     //and use that for the patch request

// }
