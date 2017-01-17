var vscode = require('vscode');
var OutputPanelVO = require('./OutputPanelVO');
var window, output;
var KEYS_REGEX = "(\/\/(TODO:|REFACTOR:|FIXME:))"
var TRIM_SPACES_REGEX = "^[ ]+|[ ]+$"
var FIXME_ID = "fixme_id"
var REFACTOR_ID = "refactor_id"
var TODO_ID = "todo_id";

function Annotations(){
    return {
        analyseDoc: analyseDoc
    }
}

function analyseDoc(){
    var vo;
    var activeEditor = vscode.window.activeTextEditor
    
    if(activeEditor){
        var doc = activeEditor.document;

        if(doc.languageId !== "javascript" || doc.fileName.toLowerCase().indexOf("untitled") >= 0){
            return
        }
      
        var reKeys = new RegExp(KEYS_REGEX, "gmi");
        var reSpaces = new RegExp(TRIM_SPACES_REGEX, "g");
        var line, result, finalOutput, i, annotationType;
        var totalLines = doc.lineCount;
        var annotationsArr = [];

        for(i = 0; i < totalLines; i++){
            line = doc.lineAt(i);
            result = line.text.match(reKeys);
            if(result){
                finalOutput = line.text.replace(reSpaces, "")
                                       .substr(2, line.text.length);
                
                
                annotationType = getAnnotationID(finalOutput.charAt(0).toLowerCase());              
                annotationsArr.push({type: annotationType, content: `line ${i+1}: ${finalOutput}`})

            }
        }
        
        annotationsArr.sort(filterAnnotations)     
        vo = new OutputPanelVO(doc, annotationsArr)
    }

    return vo
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

function filterAnnotations(a,b){
        if(a.type < b.type)
            return -1;
        else if(a.type > b.type)
            return 1;
        else
            return 0;
}

module.exports = Annotations


//todo: create markdown output (check API MarkedString, vscode.workspace.rootPath + node for saving)
//todo: create check on all files
//todo: embeddare filesystemWatcher