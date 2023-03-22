import { useEffect, useState } from "react";
import { IconCheckBox } from "../../Articles/Components/ArticleFull/Icon_CheckBox";
import { TMini } from "../types/TMini";

export default function DropdownItem(props: {
  data: TMini;
  value: boolean;
  setValue: (id: number, val: boolean) => void;
}) {
  const { data, value, setValue } = props;
  const [currentValue, setCurrentValue] = useState<boolean>(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <span
      className="dropdown-item d-flex justify-content-between"
      onClick={() => setValue(data.id, !currentValue)}
    >
      <span>
        <IconCheckBox value={value} />
      </span>
      <span>
        <p>{data.name}</p>
      </span>
      <span>
        <img className="item-icon" src={`./ressources/icons/${data.name}.svg`} />
      </span>
    </span>
  );
}
