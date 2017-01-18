var vscode = require('vscode');
var OutputPanelVO = require('./OutputPanelVO');
var AnnotationEnum = require('./AnnotationEnum');
var window, output;
var KEYS_REGEX = "(\/\/(TODO:|REFACTOR:|FIXME:))"
var TRIM_SPACES_REGEX = "^[ ]+|[ ]+$";

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
        var line, result, finalOutput, i, annotationType, initChar, annotationVO;
        var totalLines = doc.lineCount;
        var annotationsArr = [];

        for(i = 0; i < totalLines; i++){
            line = doc.lineAt(i);
            result = line.text.match(reKeys);
            if(result){
                finalOutput = line.text.replace(reSpaces, "")
                                       .substr(2, line.text.length);
                
                annotationVO = getAnnotationVO(finalOutput.charAt(0).toLowerCase());
                annotationType = annotationVO.type;
                initChar = annotationVO.initChar;           
                annotationsArr.push({type: annotationType, content: finalOutput.substr(initChar, finalOutput.length), line: i+1})

            }
        }
        
        annotationsArr.sort(filterAnnotations);
        vo = new OutputPanelVO(doc, annotationsArr)
    }

    return vo
}

function getAnnotationVO(value){
    var type, initChar;
    
    switch (value) {
        case "r":
            type = AnnotationEnum.REFACTOR_ID;
            initChar = 10;
            break;
        case "f":
            type = AnnotationEnum.FIXME_ID;
            initChar = 7;
            break;
        case "t":
            type = AnnotationEnum.TODO_ID;
            initChar = 6;
            break;
    }

    return {
        type: type,
        initChar: initChar
    }
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

//todo: create check on all project files
//todo: finish instructions on README file

//todo p2: embeddare filesystemWatcher
