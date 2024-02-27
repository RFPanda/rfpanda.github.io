const BLACKLISTED_KEY_CODES = [38,40,37,39,18,20,17,16,9,27,144];
//List of commands
const COMMANDS = {
    "Help":
        'Страница, которую вы хотите посетить, не существует, возможно, она была удалена, или был введен неправильный адрес. Чтобы просмотреть команды, введите слово <span class=\"yellow\"> Commands</span>',
    "Exit":
        "",
    "Report":
        "<span class='red'>Репорт об этой странице был успешно отправлен в службу поддержки Айнура, но лучше написать ему в </span> <u><a href=\"https://rfpanda.t.me\" target=\"_blank\"><span class=\"blue\">telegram</span></a></u>",
    "Commands":
        "Список команд: <span class=\"green\"> Help</span>, <span class=\"orange\"> Report</span>,<span class=\"rose\"> Surprise</span>, <span class=\"red\"> Exit</span><br><br>",
	"Surprise":
         "Перейди на сайт <u><a href=\"https://mcpromo.ru\" target=\"_blank\"><span class=\"grray\">mcpromo.ru</span></a></u> и введи код доступа: <span class=\"green\">1C-179A6-8B789-D53A8<span>, где A - первая цифра моего дня рождения + 3, B - первая цифра твоего дня рождения + 4, C - крайняя цифра моего дня рождения, D - крайняя цифра твоего дня рождения + 9<br><img src=\"./Terminal/assets/qr.png\"><br>Если всё прошло успешно то введи команду <span class=\"green\">Done</span>",	
	    //"Перейди на сайт <u><a href=\"https://mcpromo.ru\" target=\"_blank\"><span class=\"grray\">mcpromo.ru</span></a></u> и введи код доступа: \n <p id=\"textToCopy\"><span class=\"green\">11-17956-86789-95358</div><span></p></br></br><img src=\"./assets/qr.png\"> \n",	
	"Done":
         "C праздником 8 марта!</br><img src=\"./Terminal/assets/heart (1).png\">",	
	    
	"cls":
        ""
};

let userInput
let terminalOutputf
let Terminal
let Keyboard
const app = () => {
    userInput = document.getElementById("userInput");
    terminalOutput = document.getElementById("code");
    Terminal = document.getElementById("Terminal");
    Keyboard = document.getElementById("Keyboard");
    Keyboard.focus();
    if (screen.width < 991){
        Keyboard.addEventListener("keyup", key);
    }
    else{
        document.addEventListener('keypress', key);
    }
    document.addEventListener("keydown", backSpace);
};

//When the user click the 'Enter' key
const execute = function executeCommand(input) {
    let output;

    if (input.length === 0) {
        return;
    }
    //If what the user entered is not in the command list
    if (!COMMANDS.hasOwnProperty(input)) {
        output = `<p><span class=\"red\">Введена неверная команда<span></p>`;
    }
    //If user enter the word cls
    else if (input === "cls") {
        terminalOutput.innerHTML = "";
        return;
    }
    //If the user enters one of the words 'exit' and 'close'
    else if (input === "close" || input === "exit") {
        document.location.href = "../../index.html" // The link that the user enters after sending the exit
        return;
    }
    //If the user enters the word report
    else if (input === "report") {
        terminalOutput.innerHTML = `${
            terminalOutput.innerHTML
        }<p>${COMMANDS[input]}</p>`;

        return;
    }
    //Otherwise, the text of the command will be displayed as output
    else {
        output = COMMANDS[input];
    }

    terminalOutput.innerHTML = `${
        terminalOutput.innerHTML
    }<p class="out_code">${output}</p>`;
    Terminal.scrollTop = terminalOutput.scrollHeight;
};
let str = '';
//when user click any key
const key = function keyEvent(event) {
    let currentKey = event.key;
    Keyboard.focus();
    Keyboard.innerHTML = event.target.value;
    if (BLACKLISTED_KEY_CODES.includes(event.keyCode)) {
        return
    }
    if (!currentKey || currentKey === "Unidentified" || screen.width < 991) {
        currentKey = event.target.value;
    }
    if (event.key === "Enter") {
        execute(userInput.innerHTML);
        userInput.innerHTML = "";
        currentKey = "";
        event.target.value = "";
        str = '';
    }
    else{
        if(screen.width < 991){
            str = currentKey;
        }else{
            str += currentKey;
        }
        event.preventDefault();
        userInput.innerHTML = str;
    }
}
//when user click 'BackSpace' key
const backSpace = function backSpace(e){
    //if user click backspace
    if (e.keyCode === 8) {
        userInput.innerHTML = userInput.innerHTML.slice(
            0,
            userInput.innerHTML.length - 1
        );
        str = str.slice(
            0,
            str.length - 1
        );
    }
}
//When the user clicks on a control buttons
const BTNS = function MenuBTN(t) {
    switch (t) {
        case "max":
            if (document.getElementById("body").className !== "max") {
                document.getElementById("body").className = "max";
            } else {
                document.getElementById("body").className = "";
            }
            break;
        case "min":
            if (document.getElementById("body").className === "max") {
                document.getElementById("body").className = "max min";
            } else if (document.getElementById("body").className !== "max") {
                document.getElementById("body").className = "min";
            }
            break;
        case "re":
            if (document.getElementById("body").className === "max min") {
                document.getElementById("body").className = "max";
            }
            if (document.getElementById("body").className === "min") {
                document.getElementById("body").className = "";
            }
            break;
    }
};

document.addEventListener("DOMContentLoaded", app);

document.getElementById('textToCopy').addEventListener('click', function() {
    var text = this.innerText;
    navigator.clipboard.writeText(text)
        .then(function() {
            alert('Текст скопирован в буфер обмена');
        })
        .catch(function(err) {
            console.error('Ошибка копирования: ', err);
        });
});

