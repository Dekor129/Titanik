let url = "https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json";
let btnLind = document.getElementById("btnLind");
let btnClear = document.getElementById("btnClear");
let textInput = document.getElementById('textInput');

checkScroll();

function checkScroll() {
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    let clientHeight = document.documentElement.clientHeight + 100;
    if (windowRelativeBottom < clientHeight) {
        fetch(url).then(function(response) {
            return response.json();
        }).then(function(response) {
            addTable(response, 25);
        });
    } else{
        return false;
    }
}

function addTable(response, num) {
    let tableNow =  document.querySelectorAll('.table');
    let num1 = response.length - tableNow.length;
    if (num1 > 0) createTable (num, num1);
    else return;

    let tableAll =  document.querySelectorAll('.table');
    for(let i = tableNow.length; i < tableAll.length; i++) {
        let table =  document.querySelectorAll('.table')[i];
        inTable (response, table, i);
    }
}
    
function createTable (num, num1) {
    if (num > num1) num = num1;
    let table = document.createElement("table");
    table.setAttribute('class', 'table');

    for ( let i = 0; i < 6; i++){
        let tr = document.createElement('tr');
        for ( let k = 0; k < 2; k++){
            let td = document.createElement('td');
            tr.append(td);  
        }
        table.append(tr);
    }

    let div = document.querySelector('.list');
    div.append(table);

    if (num > 1)  createTable (num  - 1);
}

function inTable (response, table, i ) {
    (response[i].survived == true) ? table.rows[0].cells[0].innerHTML = 'Survived' : table.rows[0].cells[0].innerHTML = 'Not Survived';
    table.rows[0].cells[1].innerHTML = '№ ' + response[i].id;
    (response[i].name == false || response[i].name == null) ? table.rows[1].cells[0].innerHTML = 'Name: Unknown' : table.rows[1].cells[0].innerHTML = 'Name: ' + response[i].name;
    (response[i].age == false || response[i].age == null) ? table.rows[2].cells[0].innerHTML = 'Full age: Unknown' : table.rows[2].cells[0].innerHTML = 'Full age: ' + Math.floor(response[i].age);
    (response[i]['home.dest'] == false || response[i]['home.dest'] == null) ? table.rows[3].cells[0].innerHTML = 'Home: Unknown' : table.rows[3].cells[0].innerHTML = 'Home: ' + response[i]['home.dest'];
    (response[i].gender == false || response[i].gender == null) ? table.rows[4].cells[0].innerHTML = 'Gender: Unknown': table.rows[4].cells[0].innerHTML = 'Gender: ' + response[i].gender;                
    (response[i].ticket == false || response[i].ticket == null) ? table.rows[5].cells[0].innerHTML = 'Ticket: Unknown' : table.rows[5].cells[0].innerHTML = 'Ticket: ' + response[i].ticket;
    (response[i].cabin == false || response[i].cabin == null) ? table.rows[5].cells[1].innerHTML = 'Cabin: Unknown' : table.rows[5].cells[1].innerHTML = 'Cabin: ' + response[i].cabin;
}

window.addEventListener('scroll', checkScroll);

btnLind.addEventListener("click", query);

btnClear.addEventListener("click", function() {
    textInput.value = '';
    document.querySelector('.list').remove();
    let div = document.createElement('div');
    div.setAttribute('class', 'list');
    document.body.append(div);
    window.addEventListener('scroll', checkScroll);
    checkScroll();
});

textInput.addEventListener('keydown', function(event) {
    if (event.code == 'Enter') {
        query();
    }
});

function query () {
    let findName = textInput.value;
    document.querySelector('.list').remove();
    let div = document.createElement('div');
    div.setAttribute('class', 'list');
    document.body.append(div);
    window.removeEventListener('scroll', checkScroll);
    if(findName == false) {checkFindName(); return;}

    fetch(url).then(function(response) {
        return response.json();
    }).then(function(response) {
       find(response, findName);
    })
}

function find (response, findName){
    for (let i = 0; i < response.length; i++){
        let name = response[i].name;
        name = name.toUpperCase();
        findName =findName.toUpperCase();
        if(name.indexOf(findName, 0) != -1) {
            createTable (1);
            let table =  document.querySelector('.list').lastChild;
            inTable (response, table, i);
        }
    }
    if (document.querySelectorAll('.table').length == 0) checkMatch ();
}

function checkFindName() {
    let div = document.querySelector('.list');
    let err = document.createElement('div');
    err.innerHTML = 'Введите корректные текстовые данные!!!';
    err.style = 'color: white; background: green; width: 450px; padding: 50px; border-radius:10px;text-align: center;';
    div.append(err);
    setTimeout(() => err.remove(), 5000);
}

function checkMatch () {
    let div = document.querySelector('.list');
    let err = document.createElement('div');
    err.innerHTML = 'Совпадений не обнаружено!';
    err.style = 'color: white; background: green; width: 450px; padding: 50px; border-radius:10px;text-align: center;';
    div.append(err);
}
