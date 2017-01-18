var vscode = require('vscode');
var Annotations = require("./src/Annotations");
var OutputPanel = require("./src/OutputPanel");
var annotations, output;

function activate(context) {
    output = new OutputPanel();
    annotations = new Annotations();
    var annotationsDisposable = vscode.commands.registerCommand('extension.getAnnotations', function () {
        var vo = annotations.analyseDoc();
        output.createOutputPanel(vo.doc, vo.data);
    });

    var allAnnotationsDisposable = vscode.commands.registerCommand('extension.getAllAnnotations', function () {
        console.log("get all annotations in a project")
    });

    var annotationsOutputDisposable = vscode.commands.registerCommand('extension.createAnnotationsOutput', function () {
        var vo = annotations.analyseDoc();
        output.createMarkdownFile(vo.doc, vo.data);
    });

    /*var annotationsWatcherDisposable = vscode.commands.registerCommand('extension.activateAnnotationsWatcher', function () {
       console.log("activate annotations watcher")
    });*/

    context.subscriptions.push(annotationsDisposable);
    context.subscriptions.push(annotationsOutputDisposable);
    context.subscriptions.push(annotationsWatcherDisposable);
    context.subscriptions.push(allAnnotationsDisposable);
    context.subscriptions.push(annotations);
    context.subscriptions.push(output);
}
exports.activate = activate;

function deactivate() {
    output.dispose();
}
exports.deactivate = deactivate;