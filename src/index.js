require("./stylesheets/main.less");

var Q = codebox.require("q");
var commands = codebox.require("core/commands");
var File = codebox.require("models/file");
var dialogs = codebox.require("utils/dialogs");

var templateDialog = require("./templates/dialog.html");


// Add command to open a file
commands.register({
    id: "file.open.(wav|mp3)",
    title: "File: Open as audio",
    hidden: true,
    run: function(args) {
        var file;

        return Q()
        .then(function() {
            if (args.file) return args.file;
            if (args.path) return File.get(args.path);
            throw "No file";
        })
        .then(function(file) {
            return dialogs.input({
                template: templateDialog,
                file: file
            });
        });
    }
});
