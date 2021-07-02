/*Creamos un objeto calculadora*/

let calculadora = {
    currentNumberElement: null,
    previousNumberElement: null,
    currentNumber: '0',
    previousNumber: '',
    operation: '',
    operate: function (operation) {
        if(this.currentNumber === '0') this.currentNumber = ''
        if (this.currentNumber !== '') {
            if (this.operation !== '') this.previousNumber = eval(this.previousNumber + this.operation + this.currentNumber).toString()
            else this.previousNumber = this.currentNumber

            this.operation = OPERATION_DICC.get(operation)
            this.currentNumber = ''
        } else {
            this.operation = OPERATION_DICC.get(operation)
        }
        this.updateElements()
    },
    getResult: function () {
        if (this.operation === '' || this.currentNumber === '' || this.currentNumber === '0') return
        this.currentNumber = eval(this.previousNumber + this.operation + this.currentNumber).toString()
        this.previousNumber = ''
        this.operation = ''
        this.updateElements()
    },
    updateElements: function () {
        this.currentNumberElement.textContent = this.currentNumber
        this.previousNumberElement.textContent = this.previousNumber + this.operation
    },
    addNumber: function (number) {
        if (this.currentNumber === '0') this.currentNumber = number.toString()
        else this.currentNumber += number.toString()
        this.updateElements()
    },
    addPoint: function () {
        if (this.currentNumber.includes('.')) return
        this.currentNumber += '.'
        this.updateElements()
    },
    deleteLastDigit: function () {
        if (this.currentNumber.length === 1) this.currentNumber = '0'
        else { this.currentNumber = this.currentNumber.substring(0, this.currentNumber.length - 1) }
        this.updateElements()
    },
    reset: function () {
        this.currentNumber = '0'
        this.previousNumber = ''
        this.operation = ''
        this.updateElements()
    }
}


/*Map para traducir los operadores */

const OPERATION_DICC = new Map()
OPERATION_DICC.set('X', '*')
OPERATION_DICC.set('/', '/')
OPERATION_DICC.set('+', '+')
OPERATION_DICC.set('-', '-')


/*Elementos HTML usados*/

const previousNumberDiv = document.getElementById('previousNumber')
const currentNumberDiv = document.getElementById('currentNumber')
const digitButtons = document.querySelectorAll('.digit-button')
const operatorButtons = document.querySelectorAll('.operator-button')
const pointButton = document.getElementById('butt-point')
const delButton = document.getElementById('butt-del')
const resetButton = document.getElementById('butt-reset')
const equalButton = document.getElementById('butt-eq')


/*Rellenamos la calculadora*/

calculadora.currentNumberElement = currentNumberDiv
calculadora.previousNumberElement = previousNumberDiv


/*Eventos para los botones*/

resetButton.addEventListener('click', () => calculadora.reset())
delButton.addEventListener('click', () => calculadora.deleteLastDigit())
pointButton.addEventListener('click', () => calculadora.addPoint())
equalButton.addEventListener('click', () => {
    calculadora.getResult()
})
for (let butt of digitButtons) butt.addEventListener('click', () => calculadora.addNumber(butt.textContent))
for (let butt of operatorButtons) butt.addEventListener('click', () => calculadora.operate(butt.textContent))
