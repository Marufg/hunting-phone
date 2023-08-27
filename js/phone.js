const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones, isShowAll)

}
const displayPhone = (phones, isShowAll) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove("hidden")
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    if(!isShowAll){
    phones = phones.slice(0,12);

    }

    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
        phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">show details</button>
                      </div>
                    </div>
    `;
    phoneContainer.appendChild(phoneCard)
    });
    toggleLoadingSpinner(false)
}

const handleShowDetail = async (id) =>{
    // console.log('sadi', id)

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    

    const phone = data.data;
    showPhoneDetails(phone)

}

const showPhoneDetails = (phone) => {

    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-detail-container');
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p><span class="font-bold">storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold">display size:</span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold">chipSet:</span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-bold">memory:</span>${phone?.mainFeatures?.memory}</p>
    <p><span class="font-bold">slug:</span>${phone?.slug}</p>
    <p><span class="font-bold">releaseDate:</span>${phone?.releaseDate}</p>
    <p><span class="font-bold">brand:</span>${phone?.brand}</p>
    <p><span class="font-bold">GPS:</span>${phone?.others?.GPS}</p>
    `
    console.log(phone);
    show_details_modal.showModal()

}

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll)

}

// const handleSearch2 = () => {
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2')
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading){
    loadingSpinner.classList.remove('hidden')

    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

const handleShowAll = () => {
    handleSearch(true);

}

// loadPhone();