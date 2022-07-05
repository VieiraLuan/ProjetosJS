class CalcController {

    constructor() {

        // atribuindo os elements do document dentro do construtor 
        this._operation = [];
        this._locale = 'pt-BR';
        // dar nome privado e El - pega o document utiliza query selector com #
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        this.initKeyBoard();
    }

    // Metodo Padrão ao Iniciar a Pagina
    initialize() {
        this.displayCalc = this.displayCalc = 0;
        // Metodo Set Interval, cuida de atulizar a pagina a cada x segundos
        setInterval(() => {
            // set display time ativa e se refere ao que vai se atualizar dentro do set interval
            this.setDisplayDateTime();

        }, 1000);






    }

    initKeyBoard() {

        document.addEventListener('keyup', e => {
            switch (e.key) {
                case 'Escape':
                    this.clearAll();
                    break;

                case 'Backspace':
                    this.clearEntry();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key);
                    break;

                case '.':
                case ',':
                    this.addDot('.');

                    break;



                case '9':
                    this.addOperation(parseInt(e.key));

                    break;

                case '8':
                    this.addOperation(parseInt(e.key));

                    break;

                case '7':
                    this.addOperation(parseInt(e.key));

                    break;

                case '6':
                    this.addOperation(parseInt(e.key));

                    break;

                case '5':
                    this.addOperation(parseInt(e.key));

                    break;

                case '4':
                    this.addOperation(parseInt(e.key));

                    break;

                case '3':
                    this.addOperation(parseInt(e.key));

                    break;

                case '2':
                    this.addOperation(parseInt(e.key));

                    break;

                case '1':
                    this.addOperation(parseInt(e.key));

                    break;

                case '0':
                    this.addOperation(parseInt(e.key));

                    break;
                case 'Enter':
                case '=':

                    this.calc();

                    this.formatDisplay();

                    break;
            }
        });
    }



    clearAll() {

        this._operation = [];
        this.formatDisplay();
        this._displayCalcEl.innerHTML = 0;

    }

    clearEntry() {

        this._operation.pop();
        this.formatDisplay();


        if (this._operation.length < 1) {
            this._displayCalcEl.innerHTML = 0;

        }


    }



    isOperator(value) {

        // if (['+', '-', '*', '%', '/'].indexOf(value) > -1) {
        //     return true;

        // } else {

        //     return false;
        // }

        switch (value) {
            case '+':
                return true;
                break;

            case '-':
                return true;
                break;

            case '*':
                return true;
                break;

            case '%':
                return true;
                break;

            case '/':
                return true;
                break;


            default:
                return false;
                break;
        }

    }

    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;

    }



    calc(value) {

        let result = eval(this._operation.join(""));
        this._operation = [result, value];

    }

    calcPercent() {

        let result = eval(this._operation.join(""));
        this._operation = [result / 100];

    }

    formatDisplay() {
        this.displayCalc = this._operation.join("");
    }






    /*Não é push tem que substituir no Number*/
    addOperation(value) {



        if (isNaN(this.getLastOperation())) {

            //String ou vazio

            if (this.isOperator(value) == true) {
                // 
                this._operation[this._operation.length - 1] = value;




            } else if (this._operation.length == 0) { //ta vazio
                this._operation.push(value);

            } else if (!isNaN(value)) {
                this._operation.push(value);
                if (this._operation.length > 3) {

                    let lastOp = this._operation.pop(value);
                    if (lastOp == '%') {
                        this.calcPercent();

                    } else {

                        this.calc(lastOp);
                    }
                }



            }

        } else if (this.isOperator(value) == true) {
            this._operation.push(value);
            if (this._operation.length > 3) {

                let lastOp = this._operation.pop(value);
                if (lastOp == '%') {

                    this.calcPercent();
                } else {

                    this.calc(lastOp);
                }
            }



        } else {
            //Number


            let newValeu = this.getLastOperation().toString() + value.toString();

            this._operation[this._operation.length - 1] = parseFloat(newValeu);

        }



        this.formatDisplay();




    }



    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setError() {

        this.displayCalc = "Error";
    }

    execBtn(value) {
        switch (value) {
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'porcento':
                this.addOperation('%');
                break;
            case 'divisao':
                this.addOperation('/');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;


            case 'ponto':
                this.addDot('.');

                break;


            case 'igual':

                this.calc();

                this.formatDisplay();

                break;

            case 'soma':
                this.addOperation('+');

                break;

            case 'subtracao':
                this.addOperation('-');

                break;

            case '9':
                this.addOperation(parseInt(value));

                break;

            case '8':
                this.addOperation(parseInt(value));

                break;

            case '7':
                this.addOperation(parseInt(value));

                break;

            case '6':
                this.addOperation(parseInt(value));

                break;

            case '5':
                this.addOperation(parseInt(value));

                break;

            case '4':
                this.addOperation(parseInt(value));

                break;

            case '3':
                this.addOperation(parseInt(value));

                break;

            case '2':
                this.addOperation(parseInt(value));

                break;

            case '1':
                this.addOperation(parseInt(value));

                break;

            case '0':
                this.addOperation(parseInt(value));

                break;

            default:
                this.setError();
                break;
        }
    }

    // Carregando os Botões
    initButtonsEvents() {
        // como no html tem um elemento para btn e um elemento para texto, precisamos carregar
        // com o querry selectorAll, para pegar os dois e unificar em um só
        // Primeiro pegamos o Id usando # e depois todos os elementos usando > e o element("g")

        // carrega um node list
        let buttons = document.querySelectorAll("#buttons > g,#parts > g");

        buttons.forEach((btn, index) => {
            btn.style.cursor = "pointer";
            btn.addEventListener('click', e => {
                let textBtn = (btn.className.baseVal.replace("btn-", ""));

                this.execBtn(textBtn);
            })

            btn.addEventListener('drag', e => {
                let textBtn = (btn.className.baseVal.replace("btn-", ""));
                this.execBtn(textBtn);
            })
        });
        // buttons.addEventListener('click', e=>
        // {



        // })


    }


    // Gets Dos Displays

    get displayTime() {
        return this._timeEl.innerHTML;

    }

    get displayDate() {

        return this._dateEl.innerHTML;

    }

    get displayCalc() {

        return this._displayCalcEl.innerHTML;

    }



    // Sets dos Displays

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }


    set displayTime(value) {

        this._timeEl.innerHTML = value;

    }

    set displayDate(value) {

        this._dateEl.innerHTML = value;

    }

    // Metodos Reutilizaveis

    get currentDate() {
        return new Date;
    }

    set currentDate(value) {
        this._currentDate = value;

    }
    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }
    set currentDate(value) {

        this._dateEl.innerHTML = value;
    }


    // Metodos de Calculos
}