# vscode-annotation README

vscode-annotation is an extension for Visual Studio Code that will help you to add annotation in your code for identifying:
. Refactor code   
. Code to Fix    
. To-do activities   

## Features

In order to add an annotation in your code you just need to add the following comment:

`//refactor: my refactor`   
`//fixme: this is code to fix!`   
`//todo: my todo`   

The annotation are recognised if are single line.
This is the output that you will see inside the panel

-- add an image here...

In order to list all the annotations in a specific file or in all the files of the projects you will need to follow these instructions:

-- add instructions here... 

## Requirements   

Please install the annotations extension via the extensions panel in Visual Studio Code     

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Release Notes

### 1.0.0

Initial release of vscode-annotations.
. adding following annotations: `FIXME`, `REFACTOR` or `TODO`    
. the extension will allow you to list the annotations in the "Annotations panel"    
