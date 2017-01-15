var vscode = require('vscode');
var window, output;
var KEYS_REGEX = "(\/\/(REFACTOR:|FIXME:|TODO:))"
var TRIM_SPACES_REGEX = "^[ ]+|[ ]+$"
var FIXME_ID = "fixme_id"
var REFACTOR_ID = "refactor_id"
var TODO_ID = "todo_id"

function RefactorAnnotation(){
     window = vscode.window;

    return {
        analyseDoc: analyseDoc,
        dispose: dispose
    }
}

function analyseDoc(){
    
    output = window.createOutputChannel("RefactorAnnotation");
    output.show(true);

    var activeEditor = window.activeTextEditor
    
    if(activeEditor){
        var doc = activeEditor.document;

        if(doc.fileName.toLowerCase().indexOf("untitled") >= 0){
            dispose()
            return;
        }
        
        var reKeys = new RegExp(KEYS_REGEX, "gmi");
        var reSpaces = new RegExp(TRIM_SPACES_REGEX, "g");
        var line, result, finalOutput, i, annotationType;
        var totalLines = doc.lineCount;
        var annotationsArr = [];

        for(i = 0; i < totalLines; i++){
            line = doc.lineAt(i);
            result = reKeys.exec(line.text)
            if(result){
                finalOutput = line.text.replace(reSpaces, "")
                                       .substr(2, line.text.length);
                
                
                annotationType = getAnnotationID(finalOutput.charAt(0).toLowerCase());              
                annotationsArr.push({type: annotationType, content: `line ${i+1}: ${finalOutput}`})

            }
        }
        
        annotationsArr.sort(filterAnnotations)     
        createOutput(doc, annotationsArr, output);
       
    }

}

function getAnnotationID(value){
    var type;
    
    switch (value) {
        case "r":
            type = REFACTOR_ID;
            break;
        case "f":
            type = FIXME_ID;
            break;
        default:
            type = TODO_ID;
            break;
    }

    return type;
}

function createOutput(doc, data, panel){
    var lastType = "";

    panel.appendLine(`FILE -> file://${doc.fileName}`);
    panel.appendLine("-----------------------------------------");

    data.forEach(function(value, index, arr){
        
        if(value.type !== lastType && lastType !== "")
            panel.appendLine("")
        
        panel.appendLine(value.content);
        lastType = value.type
    })
    
    panel.appendLine("")
}

function filterAnnotations(a,b){
        if(a.type < b.type)
            return -1;
        else if(a.type > b.type)
            return 1;
        else
            return 0;
}

function dispose(){
    output.hide();
    output.dispose();
}

module.exports = RefactorAnnotation


//todo: apply doc analysis to all the files in a project
//todo: bug with fixme annotation
//todo: add vscode command: check all files, check file, export output
//todo: change name extension
