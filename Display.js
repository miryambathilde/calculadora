class Display {
    constructor(displaypreviousValue, displaycurrentValue) {
        this.displaycurrentValue = displaycurrentValue;
        this.displaypreviousValue = displaypreviousValue;
        this.calculador = new Calculadora();
        this.typeOperation = undefined;
        this.currentValue = '';
        this.previousValue = '';
        this.signes = {
            sum: '+',
            division: '%',
            multiplication: 'x',
            subtraction: '-', 
        }
    }

    delete() {
        this.currentValue = this.currentValue.toString().slice(0,-1);
        this.printValues();
    }

    deleteAll() {
        this.currentValue = '';
        this.previousValue = '';
        this.typeOperation = undefined;
        this.printValues();
    }

    computar(tipo) {
        this.typeOperation !== 'equal' && this.calculate();
        this.typeOperation = tipo;
        this.previousValue = this.currentValue || this.previousValue;
        this.currentValue = '';
        this.printValues();
    }

    agregarNumero(numero) {
        if(numero === '.' && this.currentValue.includes('.')) return
        this.currentValue = this.currentValue.toString() + numero.toString();
        this.printValues();
    }

    printValues() {
        this.displaycurrentValue.textContent = this.currentValue;
        this.displaypreviousValue.textContent = `${this.previousValue} ${this.signes[this.typeOperation] || ''}`;
    }

    calculate() {
        const previousValue = parseFloat(this.previousValue);
        const currentValue = parseFloat(this.currentValue);

        if( isNaN(currentValue)  || isNaN(previousValue) ) return
        this.currentValue = this.calculador[this.typeOperation](previousValue, currentValue);
    }
}