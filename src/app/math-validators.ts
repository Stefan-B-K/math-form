import { AbstractControl } from "@angular/forms";

class MathValidators {
  static mathEqual(target: string, input: string)  {
    return (form: AbstractControl) => {
      const result = form.value[target]
      const answer = form.value[input]
      if (result === parseInt(answer)) return null
      return { mathOp: true}
    }

  }
}

export const mathEqualValidate = MathValidators.mathEqual
