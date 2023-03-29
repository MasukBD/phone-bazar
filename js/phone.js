// load all data from server 
const loadData = async (searchText, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data, datalimit);
}

// display data function 
const displayData = (phones, datalimit) => {
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAll = document.getElementById('show-all');
    if (datalimit && phones.length > 12) {
        // show first 12 phone 
        phones = phones.slice(0, 12);
        showAll.classList.remove('d-none');

    }

    else {
        showAll.classList.add('d-none');
    }
    // show error message 
    const warning = document.getElementById('warning-Message');
    if (phones.length === 0) {
        warning.classList.remove('d-none');
    }
    else {
        warning.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        console.log(phone);
        phoneDiv.innerHTML = `
                    <div class="card">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                                to additional content. This content is a little bit longer.</p>
                            <button id="show-phone-details" data-bs-toggle="modal" data-bs-target="#phone-Modal" class="btn btn-primary" onclick="loadPhoneDetails('${phone.slug}')">Show Details</button>
                        </div>
                    </div>

        `;
        phoneContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
}

// show toggle spinner for loading data 
const toggleSpinner = isloading => {
    const spinner = document.getElementById('toggle-spiner');
    if (isloading === true) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

// common function for search by input text 
const processData = datalimit => {
    toggleSpinner(true);
    const inputValue = document.getElementById('search-input').value;
    loadData(inputValue, datalimit);
}
// search by search button 
document.getElementById('search-btn').addEventListener('click', function () {
    processData(true);
    // document.getElementById('search-input').value = '';
})

// search by enter key option 
document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processData(true);
    }
});

// show all button event handler 
document.getElementById('show-btn').addEventListener('click', function () {
    processData();
})

// load single phone details by specific id 
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails = details => {
    console.log(details);
    const phoneName = document.getElementById('phone-detailsModalLabel');
    phoneName.innerText = details.name;
    const phoneDetails = document.getElementById('modalBody');
    phoneDetails.innerHTML = `
    <h2>Brand: ${details.brand}</h2>
    <img class="w-100" src= "${details.image}">
    <h6 class="my-3">Release Date: ${details.releaseDate}</h6>
    <p><b>Storage:</b> ${details.mainFeatures.storage}</p>
    <p><b>Display Size:</b> ${details.mainFeatures.displaySize}</p>
    <p><b>Memory:</b> ${details.mainFeatures.memory}</p>
    <p><b>Sensors:</b> ${details.mainFeatures.sensors[0]} , ${details.mainFeatures.sensors[1]} , ${details.mainFeatures.sensors[2]}</p>
    <p><b>Chip Set: </b> ${details.mainFeatures.chipSet}</p>
    <p><b>WLan: </b> ${details?.others.WLAN}</p>
    <p><b>Blutooth: </b> ${details?.others.Bluetooth}</p>
    <p><b>GPS: </b> ${details.others.GPS}</p>
    <p><b>Radio: </b> ${details.others.Radio}</p>
    <p><b>USB: </b> ${details.others.USB}</p>
    `;

}

