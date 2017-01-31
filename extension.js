var vscode = require('vscode');
var Annotations = require("./src/Annotations");
var ProjectAnnotations = require("./src/ProjectAnnotations");
var OutputPanel = require("./src/OutputPanel");
var annotations, output;

function activate(context) {
    output = new OutputPanel();
    annotations = new Annotations();
    var annotationsDisposable = vscode.commands.registerCommand('extension.getAnnotations', function () {
        var activeEditor = vscode.window.activeTextEditor
        if(activeEditor){
            var vo = annotations.analyseDoc(activeEditor.document);
            output.createOutputPanel(vo.doc, vo.data);
        }
    });

    var allAnnotationsDisposable = vscode.commands.registerCommand('extension.getAllAnnotations', function () {
        var projectAnnotations = new ProjectAnnotations();
        projectAnnotations.analyseProject().then(docs => {
                                                    docs.forEach(vo => {
                                                        output.createOutputPanel(vo.doc, vo.data);
                                                    })
                                                })
    });

    var annotationsOutputDisposable = vscode.commands.registerCommand('extension.createAnnotationsOutput', function () {
        var projectAnnotations = new ProjectAnnotations();
        projectAnnotations.analyseProject().then(docs => output.createMarkdownFile(docs))
    });

    /*var annotationsWatcherDisposable = vscode.commands.registerCommand('extension.activateAnnotationsWatcher', function () {
       console.log("activate annotations watcher")
    });

    context.subscriptions.push(annotationsWatcherDisposable);*/
    context.subscriptions.push(annotationsDisposable);
    context.subscriptions.push(annotationsOutputDisposable);
    context.subscriptions.push(allAnnotationsDisposable);
    context.subscriptions.push(annotations);
    context.subscriptions.push(output);
}

exports.activate = activate;

function deactivate() {
    output.dispose();
}

exports.deactivate = deactivate;