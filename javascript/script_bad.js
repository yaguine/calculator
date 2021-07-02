/*Array con los diferentes operadores*/

const operators = [' X ', ' + ', ' - ', ' / ']

let isResult = false;

/*Variables con elementos html*/

const displayer = document.getElementById('displayer');
const dig_buttons = document.querySelectorAll('.digit-button');
const op_buttons = document.querySelectorAll('.operator-button');
const del_button = document.getElementById('butt-del');
const reset_button = document.getElementById('butt-reset');
const equals_button = document.getElementById('butt-eq');


/* Damos funcionalidad a los botones*/

equals_button.addEventListener('click', (e) => displayer.textContent = calculate(displayer.textContent));
reset_button.addEventListener('click', (e) => displayer.textContent = '0');
del_button.addEventListener('click', (e) => deleteNumber());
for (let butt of dig_buttons) butt.addEventListener('click', (e) => addNumber(butt.textContent));
for (let butt of op_buttons) butt.addEventListener('click', (e) => addOperator(butt));


/*Funcion que calcula el valor de la operación de un String*/
function calculate(str) {
    if (!endsWithOperator(str)) {
        isResult = true;
        str = str.split('X').join('*');
        result = eval(str);
        return result;
    }
    return str;
}


/*Funcion para eliminar el ultimo digito u operador*/
function deleteNumber() {
    let contenido = displayer.textContent;
    let longContenido = contenido.length;
    if(!isResult){
        if (longContenido > 1) {
            if (endsWithOperator(contenido)) displayer.textContent = contenido.substring(0, longContenido - 3);
            else displayer.textContent = contenido.substring(0, longContenido - 1);
        } else {
            displayer.textContent = '0';
        }
    }else{
        displayer.textContent = '0';
        isResult = false;
    }
}


/*Funcion para añadir un numero al displayer*/
function addNumber(number) {
    if (!isResult) {
        let contenido = displayer.textContent;
        if (endsWithZero(contenido) && number === '0') console.log('No se hace nada');
        else if (endsWithZero(contenido) && number !== '0') displayer.textContent = contenido.substring(0, contenido.length - 1) + number;
        else displayer.textContent += number;
    }else{
        displayer.textContent = number;
        isResult = false;
    }
}


/*Funcion para añadir un operador al displayer*/
function addOperator(butt) {
    isResult = false;
    let buttOperator = ' ' + butt.textContent + ' ';
    let contenido = displayer.textContent;
    let longContenido = contenido.length;
    if (endsWithOperator(contenido)) displayer.textContent = contenido.substring(0, longContenido - 3);
    if (contenido !== '') displayer.textContent += buttOperator;
}


/*Funcion que a partir de un string indica si acaba en un operador*/
function endsWithOperator(str) {
    for (let operator of operators) {
        if (str.endsWith(operator)) {
            return true;
        }
    };
    return false;
}


/*Funcion que indica si el final del string es un 0*/
function endsWithZero(str) {
    let arr = str.split(' ');
    if (parseInt(arr[arr.length - 1]) == 0) {
        return true;
    } else {
        return false;
    }
}