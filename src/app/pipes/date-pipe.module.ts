import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateToLocalStringPipe } from './date-to-local-string.pipe';

@NgModule({
    declarations: [
        DateToLocalStringPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DateToLocalStringPipe
    ]
})
export class DatePipeModule { }
