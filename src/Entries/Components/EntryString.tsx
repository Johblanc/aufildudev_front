export function EntryString(props: {
  name: string;
  defaultValue: string;
  setter: (value: string) => void;
}) {
  const { name, defaultValue, setter } = props;
  return (
    <div className="form-floating ">
      <input
        type="text"
        className="form-control height-form "
        placeholder={name}
        aria-label="search"
        onChange={(e) => setter(e.target.value)}
        defaultValue={defaultValue}
        
      />
      <label htmlFor="floatingInput" className="padding-label">
        {name}
      </label>
    </div>
  );
}
