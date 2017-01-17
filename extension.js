var vscode = require('vscode');
var Annotations = require("./src/Annotations");
var OutputPanel = require("./src/OutputPanel");
var annotations, output;

function activate(context) {
    output = new OutputPanel();
    annotations = new Annotations(output);
    var annotationsDisposable = vscode.commands.registerCommand('extension.getAnnotations', function () {
        annotations.analyseDoc();
    });

    var allAnnotationsDisposable = vscode.commands.registerCommand('extension.getAllAnnotations', function () {
        console.log("get all annotations in a project")
    });

    var annotationsOutputDisposable = vscode.commands.registerCommand('extension.createAnnotationsOutput', function () {
       console.log("create output")
       vscode.window.activeTextEditor.edit(function(txtEditor){
           txtEditor.insert(new vscode.Position(0, 0), "ciao")
       })
    });

    var annotationsWatcherDisposable = vscode.commands.registerCommand('extension.activateAnnotationsWatcher', function () {
       console.log("activate annotations watcher")
    });

    context.subscriptions.push(annotationsDisposable);
    context.subscriptions.push(annotationsOutputDisposable);
    context.subscriptions.push(annotationsWatcherDisposable);
    context.subscriptions.push(allAnnotationsDisposable);
    context.subscriptions.push(annotations);
}
exports.activate = activate;

function deactivate() {
    output.dispose();
}
exports.deactivate = deactivate;