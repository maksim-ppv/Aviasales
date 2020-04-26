// Получаем элементы со страницы
const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
    dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
    inputCitiesto = formSearch.querySelector('.input__cities-to'),
    dropdownCitiesto = formSearch.querySelector('.dropdown__cities-to'),
    inputDateDepart = formSearch.querySelector('.unput__date-depart')
    ;

// Данные

const citiesApi = 'http://api.travelpayouts.com/data/ru/cities.json',
    proxy = 'https://cors-anywhere.herokuapp.com/',
    API_KEY = '4a632f280766f3480ea78f1b5f31a558',
    calendar = 'http://min-prices.aviasales.ru/calendar_preload';


let city = [];

// Функции

const getData = (url, callback) => {
    const request = new XMLHttpRequest();

    request.open('GET', url);

    request.addEventListener('readystatechange', () =>{
        if(request.readyState !== 4) return;

        if(request.status === 200) {
            callback(request.response);
        }else {
            console.error(request.status);
        }
    });

    request.send();
};


const handlerCity = (event, dropdown, inputCiti) => {
        const target = event.target;
        if(target.tagName.toLowerCase() === 'li'){
            inputCiti.value = target.textContent;
            dropdown.textContent = '';
        }
    };
 

const showCity = (input, list) => {
    list.textContent = '';
    
    if(input.value == '' ) return;
    const filterCity = city.filter((item) => {
        console.log('item: ', item.name);

            const fixItem = item.name.toLowerCase();
            return fixItem.includes(input.value.toLowerCase());
    });
    filterCity.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('dropdown__city');
        li.textContent = item.name;
        list.append(li);
    })
};

// Обработчики событий

inputCitiesFrom.addEventListener('input', ()=> {
    showCity(inputCitiesFrom, dropdownCitiesFrom)
});

inputCitiesto.addEventListener('input', () => {
     showCity(inputCitiesto, dropdownCitiesto);
})


dropdownCitiesFrom.addEventListener('click', () => {
    handlerCity(event, dropdownCitiesFrom, inputCitiesFrom);

});
dropdownCitiesto.addEventListener('click', () => {
    handlerCity(event, dropdownCitiesto, inputCitiesto);
});

// Вызовы функций

getData(proxy + citiesApi, data => city = JSON.parse(data).filter(item => item.name));

