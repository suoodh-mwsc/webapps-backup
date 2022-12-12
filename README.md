# YodaAngularV2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


### To build use:

```shell
    ng build --configuration=prd --aot=true --build-optimizer=true --outputHashing=all --outputPath=dist/webapps-2022-09-21-prd_aot
    ng build --configuration=demo --aot=true --build-optimizer=true --outputHashing=all --outputPath=dist/webapps-2022-09-21-demo_aot
    ng build --configuration=dev-01 --aot=true --build-optimizer=true --outputHashing=all --outputPath=dist/webapps-2022-09-21-dev-01_aot
```

## WebApps- Build Commands
    node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --environment=dev01 --aot --build-optimizer --output-path=devBuild/webapps-dev01-2022-09-21
    node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --environment=dev02 --aot --build-optimizer --output-path=devBuild/webapps-dev02-2022-09-21
    node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --environment=developer --aot --build-optimizer --output-path=devBuild/webapps-dev-2022-09-21
    node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --environment=demo --aot --build-optimizer --output-path=devBuild/webapps-demo-2022-09-21
    node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --environment=prd --aot --build-optimizer --output-path=devBuild/webapps-prod-2022-09-21

    ng build --prod --configuration=dev-01 --outputPath=A:\webapps-dev-01.mwsc.com.mv

