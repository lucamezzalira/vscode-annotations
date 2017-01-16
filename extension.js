var vscode = require('vscode');
var Annotations = require("./src/Annotations");
var annotations;

function activate(context) {

    annotations = new Annotations();
    var annotationsDisposable = vscode.commands.registerCommand('extension.getAnnotations', function () {
        annotations.analyseDoc();
    });

    var allAnnotationsDisposable = vscode.commands.registerCommand('extension.getAllAnnotations', function () {
        console.log("get all annotations in a project")
    });

    var annotationsOutputDisposable = vscode.commands.registerCommand('extension.createAnnotationsOutput', function () {
       console.log("create output")
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
    annotations.dispose();
}
exports.deactivate = deactivate;