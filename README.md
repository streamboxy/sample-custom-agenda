# SbxyCustomAgenda

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Custom Agenda Docs

First of all you need a Streamboxy event with different subsessions, which should be displayed in the custom-agenda.
Important is that the visibility in the portal-settings of each subsession is configured for logged in user or anonymous user. Also the event portal-settings visibility have to be configured for logged in user or anonymous.
Then the subsession will be displayed in the custom-agenda when you enter the correct url to the content-page.

In order to include the Custom Agenda in Streamboxy, you must add the streamboxy url-placeholders as query parameters to the costum agenda url.
You need userToken, tenantId and the eventId as parameters in the url f.e.: https://samples.streamboxy.com/custom-agenda?token={{userToken}}&tenantId={{tenantId}}&eventId={{eventId}} 
This example url could be inserted in Streamboxy to a content page url-input field.



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
