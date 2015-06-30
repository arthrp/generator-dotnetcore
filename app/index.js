var generators = require('yeoman-generator');

module.exports = generators.NamedBase.extend({
    constructor: function() {
        generators.NamedBase.apply(this, arguments);
    },
    writing: function() {
        this.fs.copyTpl(
            this.templatePath('Program.cs'),
            this.destinationPath(this.name + '/Program.cs'),
            { helloText: 'Hello, people' }
        );

        this.fs.copyTpl(
            this.templatePath('project.json'),
            this.destinationPath(this.name + '/project.json'),
            {}
        );
    },
    end: function(){
        console.log('-----------------------------');
        console.log('To run the app, run commands (replace [version] with your coreclr version):');
        console.log('cd ' + this.name);
        console.log('dnvm use [version] -r mono');
        console.log('dnu restore');
        console.log('dnvm use [version] -r coreclr');
        console.log('dnx . run');
    }
});
