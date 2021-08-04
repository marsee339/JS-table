var data = [
    { id: 1, name: "Name 1", value: -1 },
    { id: 2, name: "Name 21", value: 0 },
    { id: 3, name: "Name 3", value: 1 },
    { id: 4, name: "Name 2", value: 20 },
    { id: 5, name: "Name 10", value: 10 },

    { id: 6, name: "Name 12", value: -21 },
    { id: 7, name: "Name 212", value: 20 },
    { id: 8, name: "Name 32", value: 21 },
    { id: 9, name: "Name 22", value: 220 },
    { id: 10, name: "Name 102", value: 210 },

    { id: 11, name: "Name 13", value: -31 },
    { id: 12, name: "Name 213", value: 30 },
    { id: 13, name: "Name 33", value: 31 },
    { id: 14, name: "Name 23", value: 320 },
    { id: 15, name: "Name 103", value: 310 }
];
var newData = data.slice(); //результат фильтрации

function FillTable() { //создание таблицы
    let table = document.createElement('table');
    table.id = "table1";
    table.style.cssText = "border: 0px solid black; border-collapse: collapse;";
    table.border = 1;

    tr = document.createElement('tr');
    tr.style.cssText = "background-color: rgb(198,217,241); text-align: center; font-weight: bold; font-family: Arial;";

    td = document.createElement('td');
    td.onclick = clickHandlerID;
    td.onmouseover = TDHoverIn;
    td.onmouseout = TDHoverOut;
    td.width = 200;
    td.innerHTML = "ID";
    tr.appendChild(td);    

    td = document.createElement('td');
    td.onclick = clickHandlerName;
    td.onmouseover = TDHoverIn;
    td.onmouseout = TDHoverOut;
    td.width = 200;
    td.innerHTML = "Name";
    tr.appendChild(td);    

    td = document.createElement('td');
    td.onclick = clickHandlerValue;
    td.onmouseover = TDHoverIn;
    td.onmouseout = TDHoverOut;
    td.width = 200;
    td.innerHTML = "Value";
    tr.appendChild(td);    

    table.appendChild(tr);

    for (row = 0; row < 5; row++) {
        tr = document.createElement('tr');

        td = document.createElement('td');
        td.innerHTML = data[row].id;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = data[row].name;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = data[row].value;
        tr.appendChild(td);

        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

// 3. предоставлять paging для загрузки в таблицу больших массивов
function UpdateTable(table) { //обновление таблицы
    if (document.getElementById('p1').style.color == 'black')
        FillPage(p1, p2, p3, -1, table);
    else if (document.getElementById('p2').style.color == 'black')
        FillPage(p2, p1, p3, 4, table);
    else
        FillPage(p3, p1, p2, 9, table);
}

function TDHoverIn() {
    this.style.cssText = "background-color: rgb(155 192 237);";    
}
function TDHoverOut() {
    this.style.cssText = "background-color: rgb(198 217 241);";
}

function FillPage(currPageBtnElement, pageBtnElement1, pageBtnElement2, increment, table) { //обновление текущей страницы таблицы
    ChangePage(currPageBtnElement, pageBtnElement1, pageBtnElement2);

    let tr = document.getElementById('table1').getElementsByTagName('tr');
    let row;
    for (row = 1; row < 6 && table.length > row + increment; row++) {
        let td = tr[row].getElementsByTagName('td');
        td[0].innerHTML = table[row + increment].id;
        td[1].innerHTML = table[row + increment].name;
        td[2].innerHTML = table[row + increment].value;
    }
    for (row = row; row < 6; row++) {
        let td = tr[row].getElementsByTagName('td');
        td[0].innerHTML = "-";
        td[1].innerHTML = " ";
        td[2].innerHTML = " ";
    }
}

function ChangePage(currElement, Element1, Element2) { 
    currElement.style.cssText = "text-decoration: none; color: black;";
    Element1.style.cssText = "text-decoration: underline; color: blue;";
    Element2.style.cssText = "text-decoration: underline; color: blue;";
}

// 2. сортировать данные по значениям столбцов
//обработчики нажатий для сортировки столбцов
var ascendingID = false;
var clickHandlerID = function () {
    if (!ascendingID) {
        newData.sort((a, b) => a.id - b.id);
        ascendingID = true;
    }
    else {
        newData.sort((a, b) => b.id - a.id);
        ascendingID = false;
    }
    UpdateTable(newData);
};

var ascendingName = false;
var clickHandlerName = function () {
    newData.sort((a, b) => a.name.localeCompare(b.name));
    if (!ascendingName) {        
        ascendingName = true;
    }
    else {        
        for (i = 0; i < newData.length/2; i++) {
            let temp = newData[i];
            newData[i] = newData[newData.length - i - 1];
            newData[newData.length - i - 1] = temp;
        }
        ascendingName = false;
    }
    UpdateTable(newData);
};

var ascendingValue = false;
var clickHandlerValue = function () {
    if (!ascendingValue) {
        newData.sort((a, b) => a.value - b.value);
        ascendingValue = true;
    }
    else {
        newData.sort((a, b) => b.value - a.value);
        ascendingValue = false;
    }
    UpdateTable(newData);
};

// 1. фильтровать данные
function FilterClick() { //фильтрация данных в таблице по текстовому фильтру. Шаблон [названиеСтолбца: содержимое]"
    let text = document.getElementById('filterText').value;
    let textSplit = text.split(':')
    if (textSplit.length != 2) {
        alert("Ошибка ввода! Шаблон [названиеСтолбца: содержимое]");
        UpdateTable(data);
    }
    else {
        const regexp = new RegExp(`${textSplit[1].trim()}`, 'i');

        if (textSplit[0].trim().toLowerCase() == 'name') {
            newData = new Array();
            for (i = 0; i < data.length; i++) {
                if (data[i].name.search(regexp) != -1) {
                    newData.push(data[i]);
                }
            }
            FillPage(p1, p2, p3, -1, newData);
        }
        else if (textSplit[0].trim().toLowerCase() == 'id') {
            newData = new Array();
            for (i = 0; i < data.length; i++) {
                if (data[i].id.toString().search(regexp) != -1) {
                    newData.push(data[i]);
                }
            }
            FillPage(p1, p2, p3, -1, newData);
        }
        else if (textSplit[0].trim().toLowerCase() == 'value') {
            newData = new Array();
            for (i = 0; i < data.length; i++) {
                if (data[i].value.toString().search(regexp) != -1) {
                    newData.push(data[i]);
                }
            }
            FillPage(p1, p2, p3, -1, newData);
        }
        else {
            alert("Ошибка ввода! Шаблон [названиеСтолбца: содержимое]");
            UpdateTable(data);
        }
    }
}

function TextClick(element) {
    if (element.style.color != 'black') {
        element.style.color = 'black';
        element.value = "";
    }
}
function TextMouseOut(element) {
    if (element.value == "") {
        element.style.color = 'gray';
        element.value = "name: Name 1";
    }
}
