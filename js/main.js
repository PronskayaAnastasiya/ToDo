//Находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector("#emptyList");

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

    //Формируем разметку для новой задачи
    const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
					<span class="task-title">${taskText}</span>
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

    //Очищаем поля ввода и возвращаемна него фокус
    taskInput.value = '';
    taskInput.focus();

    if (tasksList.children.length > 1) {
        emptyList.classList.add("none");
    }

}

function deleteTask(event) {
    //Проверяем чтоклик был НЕ по кнопке "удалить задачу"
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('li');
    parentNode.remove();

    //Проверка.Если в списке задач 1-ин элемент показываем блок "список пуст"
    if (tasksList.children.length === 1) {
        emptyList.classList.remove("none");
    }

}

function doneTask(event) {
    //Проверяем чтоклик был по кнопке "задача выполнена"
    if (event.target.dataset.action == 'done') {
        const parentNode = event.target.closest('li');
        const taskTitle = parentNode.querySelector(".task-title");
        taskTitle.classList.toggle("task-title--done");
    }

}

