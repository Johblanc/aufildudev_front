import MDEditor, {commands} from "@uiw/react-md-editor";
import { titleNone } from "./Commands/titleNone";
import "./CustomMDEditor.style.css"



export function CustomMDEditor(props : {value? : string, setValue: (val? : string )=> void}){

  const {value, setValue} = props
  return (
    <div className="">
      <label>Contenu : </label>
    <MDEditor
    value={value}
    onChange={setValue}
    commands={[
      commands.bold,
      commands.italic,
      commands.strikethrough,
      commands.hr,
      commands.group(
        [
          titleNone,
          commands.title1,
          commands.title2,
          commands.title3,
          commands.title4,
          commands.title5,
          commands.title6,
        ], 
        {
          name: 'title',
          groupName: 'title',
          buttonProps: { 'aria-label': 'Insert title'}
        }
      ),
      commands.divider,
      commands.link,
      commands.quote,
      commands.code,
      commands.codeBlock,
      commands.comment,
      commands.image,
      commands.unorderedListCommand,
      commands.orderedListCommand,
      commands.checkedListCommand

    ]}

    extraCommands={[
      commands.codeEdit,
      commands.codeLive,
      commands.codePreview,
      commands.divider,
      commands.fullscreen
    ]}
    
    />
      
    </div>
  )
}