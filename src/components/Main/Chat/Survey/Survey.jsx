const handleTypeButtonClick = (addMessage, isSell) => {
  addMessage({ text: `${isSell ? 'Продажа' : 'Аренда'}` }, true);
  addMessage({
    text: 'У вас есть ссылка на квартиру?',
    buttons: [
      { label: "Да", action: () => handleYesButtonClick(addMessage, isSell) },
      { label: "Нет", action: () => handleNoButtonClick(addMessage) }
    ],
    fromBot: true
  });
};

const handleYesButtonClick = (addMessage, isSell) => {
  addMessage({ text: 'Отлично! Пожалуйста, предоставьте ссылку на квартиру.' }, false);
  addMessage({ text: `${isSell ? 'Продажа' : 'Аренда'}` }, true);
  addMessage({ text: 'Введите адрес дома:' }, true);
  // Далее добавьте обработчики для ввода адреса и продолжайте опрос
};

const handleNoButtonClick = (addMessage) => {
  addMessage({ text: 'Хорошо, тогда вам придётся пройти опрос!' }, false);
  addMessage({
    text: 'Выберите тип вашего дома :',
    buttons: [
      { label: "Монолитный", action: () => handleCountOfFloorsButtonClick(addMessage) },
      { label: "Кирпичный", action: () => handleCountOfFloorsButtonClick(addMessage) },
      { label: "Блочный", action: () => handleCountOfFloorsButtonClick(addMessage) },
      { label: "Панельный", action: () => handleCountOfFloorsButtonClick(addMessage) },
      { label: "Монолитно-кирпичный", action: () => handleCountOfFloorsButtonClick(addMessage) },
      { label: "Сталинский", action: () => handleCountOfFloorsButtonClick(addMessage) },
      { label: "Газосиликатный", action: () => handleCountOfFloorsButtonClick(addMessage) },
      { label: "Старый", action: () => handleCountOfFloorsButtonClick(addMessage) }
    ],
    fromBot: true
  });
};

const handleCountOfFloorsButtonClick = (addMessage) => {
  addMessage({
    text: 'Сколько этажей в вашем доме?',
    buttons: [
      { label: "1", action: () => handleNearestMetroButtonClick(addMessage) },
      { label: "2", action: () => handleNearestMetroButtonClick(addMessage) },
      // Добавьте кнопки для всех возможных этажей
    ],
    fromBot: true
  });
};

const handleNearestMetroButtonClick = (addMessage) => {
  addMessage({
    text: 'Укажите ближайшую станцию метро:',
    input: true,
    inputType: 'autocomplete',
    inputOptions: {
      source: availableMetroStations, // availableMetroStations - ваш массив станций метро
      minLength: 1, // Минимальное количество символов для запуска автозаполнения
      select: function(event, ui) {
        // Функция, которая вызывается при выборе опции из автозаполнения
        const selectedMetroStation = ui.item.value;
        // Далее вы можете обработать выбранную станцию метро, например, добавить её в сообщение или выполнить другие действия
      }
    },
    fromBot: true
  });
};


export default handleTypeButtonClick;
