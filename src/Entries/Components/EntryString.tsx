
export function EntryString(props : {name : string, defaultValue : string, setter : (value : string) => void}){

  const {name, defaultValue, setter} = props ;
  return (
    <div>
      <label>{name} :</label>
      <input
        type="text"
        onChange={(e) => setter(e.target.value)}
        defaultValue={defaultValue}
      ></input>
    </div>
  )
}