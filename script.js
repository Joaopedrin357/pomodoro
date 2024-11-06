document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const resetButton = document.getElementById('reset');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const pomodoroTimeInput = document.getElementById('pomodoroTime'); // Novo input para o tempo

    let timer;
    let minutes = 25;
    let seconds = 0;

    function updateTimer() {
        secondsSpan.textContent = seconds < 60 ? `${seconds}` : seconds;
        minutesSpan.textContent = minutes;
    }

    function startTimer() {
        minutes = parseInt(pomodoroTimeInput.value); // Atualiza os minutos com base no input do usuário
        timer = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                    alert('Tempo acabou!');
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateTimer();
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timer);
        minutes = parseInt(pomodoroTimeInput.value); // Reinicia com o valor do input do usuário
        seconds = 0;
        updateTimer();
    }

    startButton.addEventListener('click', () => {
        startTimer();
    });

    resetButton.addEventListener('click', () => {
        resetTimer();
    });

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Concluir';
        completeButton.className = 'complete';
        completeButton.addEventListener('click', () => {
            taskItem.style.textDecoration = 'line-through';
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });

        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        taskInput.value = '';
    });
});