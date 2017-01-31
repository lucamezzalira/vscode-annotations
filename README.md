# vscode-annotations

__Vscode-annotations__ is an extension for __Visual Studio Code__ that will help you to add annotations in your __Javascript projects__ for identifying:   
. __Code to refactor__   
. __Code to fix__    
. __To-do activities__   

<img src="https://s3.eu-west-2.amazonaws.com/mezzalab-personal/vscode-annotations-palette.png" width="600">

## Features

In order to add an annotation in your code you just need to add the following comments:

`//refactor: here I need to refactor some code`   
`//fixme: this is an annotation for fixing some code!`   
`//todo: adding stuff to do`   

therefore you can add to your javascript code the following annotations:

`//refactor:`   
`//fixme:`   
`//todo:`   

*The annotation are recognised if are in a single line and written as above (e.g. //fixme: not // fixme:).*
This is the output that you will see inside the panel

<img src="https://s3.eu-west-2.amazonaws.com/mezzalab-personal/vscode-annotations-panel.png" width="600">

In order to list all the annotations in a specific file or in all the files of the projects you will need to follow these instructions:

1. open your Javascript project or javascript file with Visual Studio Code     
2. `CMD + SHIFT + P` will open the Command Palette (you can also open via the menu `View > Command Palette`)    
3. search for ANNOTATION and choose the action you want to perform

At the moment you can perform the following things:

. retrieve annotations for a single javascript file    
. retrieve annotations for the entire project    
. export annotations to a markdown file 

## Requirements   

Please install the annotations extension via the extensions panel in Visual Studio Code     

## Release Notes

### 0.1.4

. fix bug on check project folder    
. fix bug on export markdown file    
. improve markdown file readability

### 0.1.0

Initial release of vscode-annotations.    
. adding following annotations: `FIXME`, `REFACTOR` or `TODO`    
. the extension will allow you to list the annotations in the "Annotations panel"    

## Next Features   

. adding fileswatcher API in order to run the check on files automatically
. exporting annotations directly to README file   

## Suggestion

For a better readability I suggest to install, in combination with vscode-annotations, the IBM output panel colorful extension: https://marketplace.visualstudio.com/items?itemName=IBM.output-colorizer