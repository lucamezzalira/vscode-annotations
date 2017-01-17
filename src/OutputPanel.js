var vscode = require('vscode');
var fs = require('fs');
var outputWin_NAME = "Annotations";
var ANNOTATIONS_FILE = '/vscode-annotations.md'
var OUTPUT_PANEL_CONFIG = {
    newline: "\n",
    list: "."
};
var MARKDOWN_CONFIG = {
    newline: "    \r",
    list: "* "
};
var outputWin;

function OutputPanel(){
    outputWin = vscode.window.createOutputChannel(outputWin_NAME);

    return{
        createOutputPanel: createOutputPanel,
        createMarkdownFile: createMarkdownFile,
        dispose: dispose
    }

}

function createOutputPanel(doc, data){

    outputWin.appendLine(`FILE -> file://${doc.fileName}`);
    outputWin.appendLine("-----------------------------------------");

    outputWin.appendLine(getBody(data, OUTPUT_PANEL_CONFIG))
    
    outputWin.appendLine(OUTPUT_PANEL_CONFIG.newline);

    outputWin.show(true);
}

function createMarkdownFile(doc, data){
    var md = getMarkdown(doc.fileName, data);
    var path = vscode.workspace.rootPath + ANNOTATIONS_FILE
    fs.writeFile(path, md, (err) => {
        if (err){
           vscode.window.showErrorMessage('vscode-annotations.md not saved! Please try again');
           return 
        } 
        vscode.window.showInformationMessage('vscode-annotations.md saved correctly!');
    });
}

function getMarkdown(filename, data){
    return `# ${filename}
    
${getBody(data, MARKDOWN_CONFIG)}
    `
}

function getBody(data, config){
    var lastType = "";
    var str = "";

    data.forEach(function(value, index, arr){
        
        if(value.type !== lastType && lastType !== "")
            str += config.newline
        
        str += config.list + value.content + " - line:" + value.line  + config.newline
     
        lastType = value.type
    })

    return str
}

function dispose(){
    outputWin.hide();
    outputWin.dispose();
}

module.exports = OutputPanel;