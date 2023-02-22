export default function DropdownItem() {
    return (
        <a className="dropdown-item" href="/#">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="Checkme1" />
                <label className="form-check-label" htmlFor="Checkme1">Check me</label>
            </div>
        </a>
    )
}