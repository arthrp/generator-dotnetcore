var generators = require('yeoman-generator');

module.exports = generators.NamedBase.extend({
    constructor: function() {
        generators.NamedBase.apply(this, arguments);
        
        this.helloText = 'hi';
    },
    prompting: function () {
        var done = this.async();
        this.prompt({
          type    : 'input',
          name    : 'helloText',
          message : 'Hello world message in program',
          default : 'Hello, ppl'
        }, function (answers) {
          this.log(answers.helloText);
          this.helloText = answers.helloText;
          done();
        }.bind(this));
    },
    writing: function() {
        this.fs.copyTpl(
            this.templatePath('Program.cs'),
            this.destinationPath(this.name + '/Program.cs'),
            { helloText: this.helloText }
        );

        this.fs.copy(
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
