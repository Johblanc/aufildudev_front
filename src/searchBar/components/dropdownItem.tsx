import { TMini } from "../types/TMini";

export default function DropdownItem(props:{data :TMini}) {
    return (
        <a className="dropdown-item" href="/#">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="Checkme1" />
                <label className="form-check-label" htmlFor="Checkme1">{props.data.name}</label>
            </div>
        </a>
    )
}