const loadFetch = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then((res) => res.json())
    .then((data) => {
        displayShow(data.pets);
        window.allPets = data.pets;
    })
    .catch((error) => console.log(error));
};
    
const displayShow =(pets) =>{

    const loadPetsDiv = document.getElementById("loadPetsDiv");
    loadPetsDiv.innerHTML="";
    pets.forEach((pet) => {
        const card = document.createElement("div");
        card.classList = 'col-md-4';
        let cardElements =`<div class="card" style="width:100%">
                                <img src="${pet.image}" class="card-img-top" alt="">
                                <div class="card-body">
                                    <h5 class="card-title " style="text-align: left;">${pet.pet_name}</h5>
                                    <div class="d-flex justify-content-start gap-2 align-items-center">
                                        <img src="./assets/img/grid-icon.png" alt="" srcset="">
                                        <p class="m-0">Breed: ${pet.breed}</p>
                                    </div>
                                    <div class="d-flex justify-content-start gap-2 align-items-center">
                                        <img src="./assets/img/cal-icon.png" alt="" srcset="">
                                        <p class="m-0">Birth: ${pet.date_of_birth}</p>
                                    </div>
                                    <div class="d-flex justify-content-start gap-2 align-items-center">
                                        <img src="./assets/img/gender-icon.png" alt="" srcset="">
                                        <p class="m-0">Gender: ${pet.gender}</p>
                                    </div>
                                    <div class="d-flex justify-content-start gap-2 align-items-center">
                                        <img src="./assets/img/dolar-icon.png" alt="" srcset="">
                                        <p class="m-0">Price : ${pet.price}$</p>
                                    </div>
                                </div>
    
                                <div class="card-body d-flex">
                                    <a class="card-link btn btn-light" onclick="likeImage('${pet.image}')" ><i class="fa-solid fa-thumbs-up"></i></a>
                                    <button class="card-link btn btn-light" id="adopt_${pet.petId}" onclick="adoptbutton('adopt_${pet.petId}')">Adopt</button>
                                    <a class="card-link btn btn-light" onclick="showDetails('${pet.petId}')">Details</a>
                                </div>
                            </div>`;
        card.innerHTML = cardElements;
        loadPetsDiv.append(card);
        
    });
   
}


function sortPetsByPrice(pets) {
    const sortedPets = window.allPets.sort((a, b) => b.price - a.price);
    displayShow(sortedPets);
}


function likeImage(imgurl) {
    let likedPetsDiv = document.getElementById('likedPetsDiv');
    
    const newdiv = document.createElement("div");
    newdiv.classList = 'col-sm-6 my-2';

    let img =`<img src="${imgurl}" alt="" class="img-fluid rounded">`;
    newdiv.innerHTML = img;
    likedPetsDiv.append(newdiv);
    
}


function showDetails(petId) {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) =>popUpDetails(data.petData))
    .catch((error) => console.log(error))
}


function popUpDetails(pet) {
    const modalBody = document.getElementById("modalBody");
    const detailsModalCenter = document.getElementById("detailsModalCenter");

    modalBody.innerHTML = "";

    const card = document.createElement("div");
    card.classList = 'col-md-12';

    let cardElements = `<div class="card" style="width:100%">
                                <img src="${pet.image}" class="card-img-top" alt="">
                                <div class="card-body">
                                    <h5 class="card-title bold" style="text-align: left;">${pet.pet_name}</h5>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="d-flex justify-content-start gap-2 align-items-center">
                                                <img src="./assets/img/grid-icon.png" alt="" srcset="">
                                                <p class="m-0">Breed: ${pet.breed}</p>
                                            </div>
                                            <div class="d-flex justify-content-start gap-2 align-items-center">
                                                <img src="./assets/img/gender-icon.png" alt="" srcset="">
                                                <p class="m-0">Gender: ${pet.gender}</p>
                                            </div>
                                            <div class="d-flex justify-content-start gap-2 align-items-center">
                                                <img src="./assets/img/dolar-icon.png" alt="" srcset="">
                                                <p class="m-0">Vaccinated status : ${pet.vaccinated_status}$</p>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="d-flex justify-content-start gap-2 align-items-center">
                                                <img src="./assets/img/cal-icon.png" alt="" srcset="">
                                                <p class="m-0">Birth: ${pet.date_of_birth}</p>
                                            </div>
                                        
                                            <div class="d-flex justify-content-start gap-2 align-items-center">
                                                <img src="./assets/img/dolar-icon.png" alt="" srcset="">
                                                <p class="m-0">Price : ${pet.price}$</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div class="mt-2">
                                        <h6>Details Information</h6>
                                        <hr/>
                                        <p>${pet.pet_details}</p>
                                    </div>
                                </div>
                            </div>`;
    
    card.innerHTML = cardElements;
    modalBody.append(card);
    new bootstrap.Modal(detailsModalCenter).show();
}


function adoptbutton(id) {
    const counterModalSm = new bootstrap.Modal(document.getElementById('counterModalSm')); // Bootstrap modal instance
    const counterText = document.getElementById('counterText');
    const adoptBtn = document.getElementById(id);
    
    let counter = 3;  // Start the countdown from 3
    counterText.innerHTML = counter; // Display the initial value
    counterModalSm.show(); // Show the modal

    const interval = setInterval(() => {
        counter--;  // Decrease the counter every second
        counterText.innerHTML = counter;

        if (counter === 0) {
            clearInterval(interval); // Stop the countdown
            counterModalSm.hide();   // Hide the modal after reaching 0
            adoptBtn.disabled=true;
        }
    }, 1000);
}


      
loadFetch();