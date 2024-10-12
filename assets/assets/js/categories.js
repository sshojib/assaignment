const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then((res) => res.json())
        .then((data) => displayCategory(data.categories))
        .catch((error) => console.log(error))
}


function fetchPetsByCategory(id) {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            petsByCategory(data.data);
            window.allPets = data.data;
        })
        .catch((error) => console.log(error))

}


const displayCategory = (categories) => {
    const loadCategoriesDiv = document.getElementById("categoriesShow");
    categories.forEach((category) => {
        const anchor = document.createElement("span");

        let img = `<a class="btn btn-light btn-lg px-4 me-sm-3 d-flex gap-2 justify-content-center align-items-center" onclick="fetchPetsByCategory('${category.category.toLowerCase()}')"><img src="${category.category_icon}" height="30" width="30" alt="" srcset=""><p class="m-0">${category.category}</p></a>`;
        anchor.innerHTML = img;
        let categoryId = category.category.toLowerCase();
        loadCategoriesDiv.append(anchor);
    });

}

loadCategories();




function petsByCategory(pets) {
    const loadPetsDiv = document.getElementById("loadPetsDiv");
  
    loadPetsDiv.innerHTML = "";
    if (pets.length > 0) {

        pets.forEach((pet) => {
            const petName = pet.pet_name ?? "Not Applicable";
            const breed = pet.breed ?? "Not Applicable";
            const dateOfBirth = pet.date_of_birth ?? "Not Applicable";
            const gender = pet.gender ?? "Not Applicable";
            const price = pet.price != null ? `$${pet.price}` : "Not Applicable";
            
            const card = document.createElement("div");
            card.classList = 'col-md-4';

            let cardElements = `<div class="card" style="width:100%">
                                    <img src="${pet.image}" class="card-img-top" alt="">
                                    <div class="card-body">
                                        <h5 class="card-title " style="text-align: left;">${petName}</h5>
                                        <div class="d-flex justify-content-start gap-2 align-items-center">
                                            <img src="./assets/img/grid-icon.png" alt="" srcset="">
                                            <p class="m-0">Breed: ${breed}</p>
                                        </div>
                                        <div class="d-flex justify-content-start gap-2 align-items-center">
                                            <img src="./assets/img/cal-icon.png" alt="" srcset="">
                                            <p class="m-0">Birth: ${dateOfBirth}</p>
                                        </div>
                                        <div class="d-flex justify-content-start gap-2 align-items-center">
                                            <img src="./assets/img/gender-icon.png" alt="" srcset="">
                                            <p class="m-0">Gender: ${gender}</p>
                                        </div>
                                        <div class="d-flex justify-content-start gap-2 align-items-center">
                                            <img src="./assets/img/dolar-icon.png" alt="" srcset="">
                                            <p class="m-0">Price : ${price}$</p>
                                        </div>
                                    </div>
        
                                    <div class="card-body d-flex">
                                        <a class="card-link btn btn-light" onclick="likeImage('${pet.image}')" ><i class="fa-solid fa-thumbs-up"></i></a>
                                        <a href="#" class="card-link btn btn-light">Adopt</a>
                                        <a class="card-link btn btn-light" onclick="showDetails('${pet.petId}')">Details</a>
                                    </div>
                                </div>`;
            card.innerHTML = cardElements;
            loadPetsDiv.append(card);

        });
    } else {
        const card = document.createElement("div");
        card.classList = 'col-md-12 bg-gray';

        let cardElements = `<div class="card" style="width:100%; text-align:center">
                                    <img src="./assets/img/error.webp" class="card-img-top" alt="" style="max-width:250px; margin: 0 auto;">
                                    <div class="card-body">
                                        <h5 class="card-title fw-bold" >No Information Available</h5>
                                        <div class="d-flex justify-content-start gap-2 align-items-center">
                                           
                                            <p class="m-0">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
                                        </div>
                                    </div>
        
                                </div>`;
        card.innerHTML = cardElements;
        loadPetsDiv.append(card);
    }

}