import { Directive, ElementRef } from '@angular/core';
import { NgControl } from "@angular/forms";
import { map} from "rxjs";

@Directive({
    selector: '[appHighlightAnswer]'
})
export class HighlightAnswerDirective {

    constructor (private element: ElementRef, private controlName: NgControl) {}

    ngOnInit () {
        this.controlName.control?.parent?.valueChanges
            .pipe(
                map(({ c, answer }) => Math.abs((c - answer) / c))
            )
            .subscribe(value => {
                if (value < 0.03) {
                    this.element.nativeElement.classList.add('hit')
                } else if (value < 0.07) {
                    this.element.nativeElement.classList.remove('hit')
                    this.element.nativeElement.classList.add('closest')
                } else if (value < 0.12) {
                    this.element.nativeElement.classList.remove('hit')
                    this.element.nativeElement.classList.remove('closest')
                    this.element.nativeElement.classList.add('closer')
                } else if (value < 0.18) {
                    this.element.nativeElement.classList.remove('hit')
                    this.element.nativeElement.classList.remove('closest')
                    this.element.nativeElement.classList.remove('closer')
                    this.element.nativeElement.classList.add('close')
                } else {
                    this.element.nativeElement.classList.remove('hit')
                    this.element.nativeElement.classList.remove('closest')
                    this.element.nativeElement.classList.remove('closer')
                    this.element.nativeElement.classList.remove('close')
                }
            })
    }

}
