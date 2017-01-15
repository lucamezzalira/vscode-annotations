// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var RefactorAnnotation = require("./src/RefactorAnnotation");
var refactorAnn;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    refactorAnn = new RefactorAnnotation();
    var disposable = vscode.commands.registerCommand('extension.getRefactorAnnotation', function () {
        refactorAnn.analyseDoc();
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(refactorAnn);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
    refactorAnn.dispose();
}
exports.deactivate = deactivate;