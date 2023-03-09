import { commands } from "@uiw/react-md-editor"




export const titleNone : commands.ICommand<string> = {
  name: 'titleNone',
  keyCommand: 'titleNone',
  render: (command, disabled, executeCommand) => {
    return (
      <button 
        aria-label="Insert titleNone"
        disabled={disabled}
        onClick={(evn) => {
          // evn.stopPropagation();
          executeCommand(command, command.groupName)
        }}
      >
        <div>No Title</div>
      </button>
    )
  },
  execute: (state, api) => {
    //console.log(state);
    
    let titleless = state.selectedText

    if (titleless.charAt(0) === "#"){
      while (titleless.charAt(0) === "#"){
        titleless = titleless.substring(1)
      }
      
      if (titleless.charAt(0) === " "){
        titleless = titleless.substring(1)
      }
      
    }

    
    let modifyText = `${titleless}\n`;
    if (!state.selectedText) {
      modifyText = `## `;
    }
    api.replaceSelection(modifyText);
  },
}