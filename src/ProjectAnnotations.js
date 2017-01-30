var Annotations = require('./Annotations');
var vscode = require('vscode');

function ProjectAnnotations(){
    return {
        analyseProject: analyseProject
    }
}

function analyseProject(){
   vscode.workspace.findFiles('*.js', '**∕@(node_modules|libs|vendors|output|public|dist)∕**').then(onFilesRetrieved)
   //todo: review glob pattern for retrieving javascript files
}

function onFilesRetrieved(files){
    //todo: set promise
    if(files.length < 1){
        vscode.window.showInformationMessage('There aren\'t any javascript files in the open project!');
        return;
    }
    var annotations = new Annotations();
    var docsVO = [];

    files.forEach(function(file){
         vscode.workspace.openTextDocument(file.path).then(value => {        
             docsVO.push(annotations.analyseDoc(value));
         })
    })

    return docsVO;
}

module.exports = ProjectAnnotations;