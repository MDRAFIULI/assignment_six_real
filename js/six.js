// push search text in api dynamiclu.............................................
const searchField = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhone(searchFieldValue)
    searchField.value = '';
}
//get api & append results.......................................................
const loadPhone = (fieldText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${fieldText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}
const displayPhone = phones => {
    const resultContainer = document.getElementById('result-container');
    resultContainer.textContent = '';
    phones.forEach(phone => {
        // console.log(phone);
        const col = document.createElement('div');
        col.classList.add('col');
        col.innerHTML = `
    <div class="card">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">${phone.brand}</p>
                        <button onclick="loadMore('${phone.slug}')">More</button>
                    </div>
                </div>
    `;
        resultContainer.appendChild(col);
    })
}
const loadMore = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMore(data.data))
}
const displayMore = phone => {
    console.log(phone);
    const moreContainer = document.getElementById('more-container');
    moreContainer.textContent = '';
    const col = document.createElement('div');
    col.classList.add('col');
    col.innerHTML = `
    <div class="card w-25 mx-auto">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.releaseDate}</h5>
        <p class="card-text">chipSet: ${phone.mainFeatures.chipSet}</p>
        <p class="card-text">displaySize: ${phone.mainFeatures.displaySize}</p>
        <p class="card-text">memory: ${phone.mainFeatures.memory}</p>
        <p class="card-text">storage: ${phone.mainFeatures.storage}</p>
        <p>others: ${phone.others?.Bluetooth}
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
/* 

                        <p>others: ${phone.others.Bluetooth}
                        ${phone.others.GPS}
                        ${phone.others.NFC}
                        ${phone.others.Radio}
                        ${phone.others.USB}
                        ${phone.others.WLAN}
                        </p>
*/