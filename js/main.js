//Находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector("#emptyList");

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => {
        renderTask(task);
    });
}

checkEmtyList();

//Добавление задачи
form.addEventListener('submit', addTAsk);

//Удаление задачи
tasksList.addEventListener('click', deleteTask)

//Отмечаем задачу зовершенной
tasksList.addEventListener('click', doneTask)

//Функции 
function addTAsk(event) {
    //Отменяем отправку формы
    event.preventDefault();

    //Достаем текст задачииз поля ввода
    const taskText = taskInput.value;

    //Описываем задачу в виде объекта
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    renderTask(newTask);

    //Добавляем задачу в массив с задачами
    tasks.push(newTask);
    saveToLocaleStorage();

    //Очищаем поля ввода и возвращаемна него фокус
    taskInput.value = '';
    taskInput.focus();

    checkEmtyList();
    /*
    if (tasksList.children.length > 1) {
        emptyList.classList.add("none");
    }
    */

}

function deleteTask(event) {
    //Проверяем чтоклик был НЕ по кнопке "удалить задачу"
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('li');
    const id = Number(parentNode.id);

    //Находим индекс задачи в массиве
    //const index = tasks.findIndex((task) => task.id === id);
    const index = tasks.findIndex((task) => {
        if (task.id == id) {
            return true;
        }
        //return task.id===id;
    });

    //Удалить элемент из массива
    tasks.splice(index, 1);
    saveToLocaleStorage()

    //удалить задачу из разметки
    parentNode.remove();


    checkEmtyList();
    /*
    //Проверка.Если в списке задач 1-ин элемент показываем блок "список пуст"
    if (tasksList.children.length === 1) {
        emptyList.classList.remove("none");
    }
    */

}

function doneTask(event) {
    //Проверяем чтоклик был по кнопке "задача выполнена"
    if (event.target.dataset.action == 'done') {
        const parentNode = event.target.closest('li');

        //Определяем ID задачи
        const id = Number(parentNode.id);
        const task = tasks.find((task) => task.id === id);
        task.done = !task.done;
        saveToLocaleStorage();

        const taskTitle = parentNode.querySelector(".task-title");
        taskTitle.classList.toggle("task-title--done");
    }

}

function checkEmtyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				    </li>`
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    } else {
        const emptyListEl = document.querySelector("#emptyList");
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocaleStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(element) {
    const cssClass = (element.done) ? "task-title task-title--done" : "task-title";

    //Формируем разметку для новой задачи
    const taskHTML = `<li id="${element.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${element.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;

    //Добавляем задачуна страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}
