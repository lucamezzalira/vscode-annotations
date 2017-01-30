var Annotations = require('./Annotations');
var vscode = require('vscode');

function ProjectAnnotations(){
    return {
        analyseProject: analyseProject
    }
}

function analyseProject(){
    return vscode.workspace.findFiles('**/*.js', '**∕@(node_modules|libs|vendors|output|public|dist)∕**')
                          .then(onFilesRetrieved)
}

function onFilesRetrieved(files){
        if(files.length < 1){
            vscode.window.showInformationMessage('There aren\'t any javascript files in the open project!');
            return;
        }

        var annotations = new Annotations();
        var docsPromises = [];

        files.forEach(file => {
            docsPromises.push(vscode.workspace.openTextDocument(file.path))
        })

        return Promise.all(docsPromises).then(docs => {
            var docsVO = [];
            
            docs.forEach(doc => {
                var vo = annotations.analyseDoc(doc);     
                docsVO.push(vo);
            })

            return docsVO;
        })

}

module.exports = ProjectAnnotations;