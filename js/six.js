const notFoundText = (displayStyle) => {
    const notFound = document.getElementById('not-found');
    notFound.style.display = displayStyle;
}
// push search text in api dynamicly.............................................
const searchField = () => {
    const moreContainer = document.getElementById('more-container');
    moreContainer.textContent = '';
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    // notFoundText('block');
    loadPhone(searchFieldValue);
    // clean search field
    searchField.value = '';
}
//fetch api by name & get data.......................................................
const loadPhone = (fieldText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${fieldText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}
// display search result ........................................................
const displayPhone = phones => {
    console.log(phones.length);
    if (phones.length == 0) {
        notFoundText('block')
    }
    if (phones.length > 0) {
        notFoundText('none')
    }
    const resultContainer = document.getElementById('result-container');
    // clean previous search results
    resultContainer.textContent = '';
    // loop phone, create div & append in resultContainer
    phones.forEach(phone => {
        const col = document.createElement('div');
        col.classList.add('col');
        col.innerHTML = `
    <div class="card bg-success">
                    <img src="${phone.image}" class="card-img-top w-25 mx-auto" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">${phone.brand}</p>
                        <button class="text-success bg-white" onclick="loadMore('${phone.slug}')">More</button>
                    </div>
                </div>
    `;
        resultContainer.appendChild(col);
    })
    /* if (resultContainer.textContent = '') {
        notFoundText('block');
    } */
}
// fetch api by id & get data.......................................................
const loadMore = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMore(data.data))
}
// display more in top..............................................................
const displayMore = phone => {
    console.log(phone);
    const moreContainer = document.getElementById('more-container');
    // clean previous more
    moreContainer.textContent = '';
    // create div and add inner text and append in moreContainer
    const col = document.createElement('div');
    col.classList.add('col');
    col.innerHTML = `
    <div class="card w-25 mx-auto">
      <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
      <div class="card-body">
        <h5 class="card-title text-danger">${phone.releaseDate ? phone.releaseDate : 'Release date not found'}</h5>
        <h2>Features:</h2>
        <p class="card-text">chipSet: ${phone.mainFeatures.chipSet}</p>
        <p class="card-text">displaySize: ${phone.mainFeatures.displaySize}</p>
        <p class="card-text">memory: ${phone.mainFeatures.memory}</p>
        <p class="card-text">storage: ${phone.mainFeatures.storage}</p>
        <p><strong>Sensor:</strong>
        ${phone.mainFeatures?.sensors[0]}
        ${phone.mainFeatures?.sensors[1]}
        ${phone.mainFeatures?.sensors[2]}
        ${phone.mainFeatures?.sensors[3]}
        ${phone.mainFeatures?.sensors[4]}
        ${phone.mainFeatures?.sensors[5]}
        </p>
        <p>others:<strong>Others:</strong> ${phone.others?.Bluetooth}
                        ${phone.others?.GPS}
                        ${phone.others?.NFC}
                        ${phone.others?.Radio}
                        ${phone.others?.USB}
                        ${phone.others?.WLAN}
                        </p>
      </div>
    </div>
    `;
    moreContainer.appendChild(col);
}
/* const notFoundText = (displayStyle) => {
    const notFound = document.getElementById('not-found');
    notFound.style.display = displayStyle;
}
const displayNotFound = () => {
    const resultContainer = document.getElementById('result-container');
    if () {
        notFoundText('block')
    }
} */