function makeRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data);
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  }
  
  function createPersonCard(person) {
    var cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
  
    var nameElement = document.createElement('h2');
    nameElement.textContent = 'Name: ' + person.name + ' ' + person.surname;
  
    var ageElement = document.createElement('p');
    ageElement.textContent = 'Age: ' + person.age;
  
    cardDiv.appendChild(nameElement);
    cardDiv.appendChild(ageElement);
  
    return cardDiv;
  }
  
  function displayPeopleCards(people) {
    var cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
  
    people.forEach(function(person) {
      var card = createPersonCard(person);
      cardsContainer.appendChild(card);
    });
  
    cardsContainer.style.display = 'block'; // Отображаем контейнер с карточками
  }
  
  // Выполняем запрос на JSON файл и выводим карточки людей на страницу
  makeRequest('people.json', function(data) {
    var nameList = document.getElementById('name-list');
  
    data.forEach(function(person, index) {
      // Создаем теги h2 с именами из JSON-файла
      var nameElement = document.createElement('h2');
      nameElement.textContent = person.name;
      nameList.appendChild(nameElement);
  
      // Добавляем обработчик события для каждого имени в списке слева
      nameElement.addEventListener('click', function() {
        var filteredPeople = data.filter(function(person) {
          return person.name === nameElement.textContent;
        });
        displayPeopleCards(filteredPeople);
        console.log(filteredPeople); // Показываем данные в консоли с дублированием
      });
    });
  });
  