const PersonForm = (props) => {
    return (
    <form onSubmit={props.submit}>
    <div>
    Name:{" "}
    <input value={props.newName} onChange={(event) => props.setNewName(event.target.value)} />
    </div>
    <div>
    Phone:{" "}
    <input value={props.newPhone} onChange={(event) => props.setNewPhone(event.target.value)} />
    </div>
    <div>
    <button type="submit">Add</button>
    </div>
    </form>
    )
    }
  export default PersonForm;