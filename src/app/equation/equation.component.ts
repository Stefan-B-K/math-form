import { Component } from '@angular/core';
import { FormControl, FormGroup, } from "@angular/forms";
import { mathEqualValidate } from "../math-validators";

import { TMathOp } from "../TMathOp";

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent {

  data: { mathOp: TMathOp, a: number, b: number, c: number }
  mathForm: FormGroup

  constructor () {
    this.data = this.generateMath()
    this.mathForm = new FormGroup({
      a: new FormControl(this.data.a),
      b: new FormControl(this.data.b),
      c: new FormControl(this.data.c),
      mathOp: new FormControl(this.data.mathOp),
      answer: new FormControl('')
    }, [mathEqualValidate('c', 'answer')])
  }

  generateMath = () => {
    const ops: TMathOp[] = ['+', '-', '×', '÷']
    const mathOp = ops[Math.floor(Math.random() * 4)]
    let a: number
    let c: number
    const b = Math.floor(Math.random() * 10)
    if (mathOp === '÷') {
      c = Math.floor(Math.random() * 10)
      a = c * b
    } else {
      a = Math.floor(Math.random() * 20)
      switch (mathOp) {
        case '+': c = a + b; break;
        case '-': c = a - b; break;
        case '×': c = a * b
      }
    }
    return { mathOp, a, b, c }
  }


}
