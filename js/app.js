const userSection = document.querySelector('.userSection');
const searchField = document.querySelector('#searchField');
const modalSection = document.querySelector('.modal');
const modalContent = document.querySelector('.modalContent');
const url = 'https://randomuser.me/api/?results=12&inc=name,location,email,dob,phone,picture&nat=US'
let empData = [];
let cards = []
let indexTest = 0

fetch(url)
    .then(response => response.json())
    .then(data => data.results)
    .then(insertData)


function insertData(data) {
    empData = data;

    empData.forEach((emp, index) => {
        const empCard = document.createElement('DIV');
        userSection.appendChild(empCard)
        empCard.innerHTML = `
            <div class="empPicture">
                <img src="${emp.picture.large}" alt="${emp.name.last}">
            </div>
            <div class="empInfo" index="${index}">
            <h3 class="name">${emp.name.first + " " + emp.name.last}</h3>
            <p class="mail">${emp.email}</p>
            <p class="city">${emp.location.city}</p>
        </div>
        `
        empCard.classList.add('empCard');
        cards.push(index); 
    })
}

searchField.addEventListener('keyup', event => {
    let names = document.querySelectorAll('.name');
    let cards = document.querySelectorAll('.empCard');
    let filter = event.target.value.toUpperCase();

    for (var i = 0; i < names.length; i++) {
        let name = names[i].textContent.toUpperCase();

        if (name.indexOf(filter) > -1) {
            cards[i].style.display = '';
        } else {
            cards[i].style.display = 'none';
        }
    }
});

employeeCard = document.querySelectorAll('.empCard');

function showModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = empData[index];
    let dobDate = new Date(dob.date);

    const modalHtml = `
        <p class="arrowLeft">&#8249;</p>
        <p class="arrowRight">&#8250;</p>
        <div class="upper-section" index="${index}">
            <img src="${picture.large}" class="modalImg">
            <h3 class="modalName">${name.first} ${name.last}</h3>
            <p class="modalMail">${email}</p>
            <p class="modalCity">${city}</p>
        </div>
        <div class="lower-section">
            <p class="modalPhone">${phone}</p>
            <p class="modalAdress">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p class="modalDob">Birthday: ${dobDate.getMonth() + 1}/${dobDate.getDate()}/${dobDate.getFullYear()}</p>
        </div>
    `
    modalContent.innerHTML = modalHtml;
    modalSection.style.display = 'block';
    let indexString = index;
    indexInt = parseInt(indexString);
    console.log(indexInt)
    

    
modalSection.addEventListener('click', event => {
    const arrowLeft = document.querySelector('.arrowLeft');
    const arrowRight = document.querySelector('.arrowRight'); 

    if (event.target === arrowLeft) {
        if (indexInt > 0) {
            indexInt = indexInt - 1
            showModal(indexInt);
        }
      } 
    
    if (event.target === arrowRight) {
        if (indexInt < 11) {
            indexInt += 1
            showModal(indexInt);
        }
    }

})

}

userSection.addEventListener('click', event => {
    const card = event.target.closest('.empCard');
    if (event.target = card) {
        let employeeIndex = card.querySelector('.empInfo').getAttribute('index');
        showModal(employeeIndex);
    }
})

const closeButton = document.querySelector('.modalClose');

closeButton.addEventListener('click', () => {
    modalSection.style.display = 'none'
});





