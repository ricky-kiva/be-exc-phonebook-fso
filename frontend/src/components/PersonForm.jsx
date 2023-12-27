const PersonForm = (props) => {
    const { submitHandler, name, onNameChange, number, onNumberChange } = props

    return (
        <form onSubmit={submitHandler}>
        <div>
            name: 
            <input
            value={name} 
            onChange={onNameChange} 
            />
        </div>
        <div>
            number:
            <input 
            value={number}
            onChange={onNumberChange}
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
    )
}

export default PersonForm