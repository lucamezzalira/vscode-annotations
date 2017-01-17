var vscode = require('vscode');
var outputWin_NAME = "Annotations"
var outputWin;

function OutputPanel(){
    outputWin = vscode.window.createOutputChannel(outputWin_NAME);

    return{
        createOutputPanel: createOutputPanel,
        dispose: dispose
    }

}

function createOutputPanel(doc, data){
    var lastType = "";

    outputWin.appendLine(`FILE -> file://${doc.fileName}`);
    outputWin.appendLine("-----------------------------------------");

    data.forEach(function(value, index, arr){
        
        if(value.type !== lastType && lastType !== "")
            outputWin.appendLine("")
        
        outputWin.appendLine(value.content);
        lastType = value.type
    })
    
    outputWin.appendLine("");

    outputWin.show(true);
}

function dispose(){
    outputWin.hide();
    outputWin.dispose();
}

module.exports = OutputPanel;