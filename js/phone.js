const loadData = async (searchText, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data, datalimit);
}

const displayData = (phones, datalimit) => {
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAll = document.getElementById('show-all');
    if (datalimit && phones.length > 12) {
        phones = phones.slice(0, 12);
        showAll.classList.remove('d-none');

    }

    else {
        showAll.classList.add('d-none');
    }
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
                            <button class="btn btn-primary" onclick="loadPhoneDetails('${phone.slug}')">Show Details</button>
                        </div>
                    </div>

        `;
        phoneContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
}

const toggleSpinner = isloading => {
    const spinner = document.getElementById('toggle-spiner');
    if (isloading === true) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

document.getElementById('search-btn').addEventListener('click', function () {
    toggleSpinner(true);
    const inputValue = document.getElementById('search-input').value;
    loadData(inputValue, true);
    // document.getElementById('search-input').value = '';
})
document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        toggleSpinner(true);
        const inputValue = document.getElementById('search-input').value;
        loadData(inputValue, true);
    }
});

document.getElementById('show-btn').addEventListener('click', function () {
    toggleSpinner(true);
    const inputValue = document.getElementById('search-input').value;
    loadData(inputValue);
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails = details => {
    console.log(details);
}

