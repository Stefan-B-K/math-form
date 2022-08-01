import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, } from "@angular/forms";
import { delay, filter, scan } from "rxjs";

import { mathEqualValidate } from "../math-validators";

@Component({
    selector: 'app-equation',
    templateUrl: './equation.component.html',
    styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {

    data: { math: string, a: number, b: number, c: number }
    mathForm: FormGroup
    delayBetween = 500
    secondsPerSolution = 0

    constructor () {
        this.data = this.generateMath()
        this.mathForm = new FormGroup({
            a: new FormControl(this.data.a),
            b: new FormControl(this.data.b),
            c: new FormControl(this.data.c),
            mathOp: new FormControl(this.data.math),
            answer: new FormControl('')
        }, [mathEqualValidate('c', 'answer')])
    }

    ngOnInit () {
        this.mathForm.statusChanges
            .pipe(
                filter(value => value === 'VALID'),
                delay(this.delayBetween),
                scan(acc => {
                    return {
                        roundsSolved: acc.roundsSolved + 1,
                        startTime: acc.startTime
                    }
                }, { roundsSolved: 0, startTime: new Date() })
            )
            .subscribe(({ roundsSolved, startTime }) => {
                this.secondsPerSolution = (new Date().getTime() - startTime.getTime() - this.delayBetween) / roundsSolved / 1000
                this.data = this.generateMath()
                this.mathForm.setValue({
                    a: this.data.a,
                    b: this.data.b,
                    c: this.data.c,
                    mathOp: this.data.math,
                    answer: ''
                })
            })
    }

    generateMath = () => {
        const math = ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)]
        let a: number
        let c: number
        let b = Math.floor(Math.random() * 10)
        if (math === '÷') {
            c = Math.floor(Math.random() * 10)
            b++
            a = c * b
        } else {
            a = Math.floor(Math.random() * 20)
            switch (math) {
                case '+':
                    c = a + b;
                    break;
                case '-':
                    c = a - b;
                    break;
                case '×':
                    c = a * b;
                    break;
                default: c = 0
            }
        }
        return { math, a, b, c }
    }


}
