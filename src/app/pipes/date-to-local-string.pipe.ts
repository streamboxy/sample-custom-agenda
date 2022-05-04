import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'toLocalString',
    pure: false
})
export class DateToLocalStringPipe implements PipeTransform {

    constructor(private _translate: TranslateService) { }

    transform(value: Date, args?: any): string {
        if (!(value instanceof Date)) {
            value = new Date(value);
        }
        const datePipe: DatePipe = new DatePipe(this._translate.currentLang ?? this._translate.defaultLang);
        return datePipe.transform(value, args ?? 'short')!;
    }
}
