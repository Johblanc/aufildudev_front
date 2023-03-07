
export function EntryStringArea(props : {name : string, defaultValue : string, setter : (value : string) => void}){

  const {name, defaultValue, setter} = props ;
  return (
    <div>
      <label>{name} :</label>
      <textarea
        onChange={(e) => setter(e.target.value)}
        defaultValue={defaultValue}
      ></textarea>
    </div>
  )
}