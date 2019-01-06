# checkFile

### what is this:

Simple tool I use to generate som excel report with data I need on a project.
Unless you are on same project as me this code wont help you much without some changes. If you plan to work with cvs data and want query the data to  generate excel reports, then it might help you get started.

To make modifications you need to learn about nodejs/typescript/sql
* [nodejs](https://www.tutorialspoint.com/nodejs/nodejs_introduction.htm)
* [typescript](https://www.tutorialspoint.com/typescript/)
* [sqllite](https://www.tutorialspoint.com/sqlite/)

Otger useful tools to know about:
* [dbeaver](https://dbeaver.io/) free open source [SQL](https://en.wikipedia.org/wiki/SQL) tool.
* [vscode](https://code.visualstudio.com/) free [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) for typescript.

### how to use:
Before using this you need to install [nodejs](https://nodejs.org/en/) v 11.6.0 or higher.

After nodejs is installed, run this in terminal:
* run `git clone https://github.com/vegarringdal/checkFile` 
    * if you do not have GIT installed you can download zip file from github, click the green download button
* run `npm install`
* add `data.cvs` 
    * with with needed headers (see bottom of readme)
* run `npm run start`
    * this generates the excel file.

### how to tranform typescript to js:
* `npm run watch`
    * code is only updated if there is no errors in typescript.
    * on every save you get a vaidation if if contains errors.
    * sql is not validated.

### csv headers:
* Project.Name
* Tag.Status
* Tag.No
* Tag.Discipline
* Tag.From tag number
* Tag.To tag number
* Tag.Cable Spesification STID
* Tag.Segregation level
* Tag.Cable length estimated
* Tag.Description
* Tag.Remark
* Tag.Engineering code
* Tag.Contractor
* Tag.Contractor installation
