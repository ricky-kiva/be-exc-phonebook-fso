const Persons = ({ persons, deleteHandler }) =>
  <div>
    {persons.map(person =>
      <div key={person.id}>
        {person.name} {person.number}&nbsp;
        <button onClick={() => deleteHandler(person.id)}>delete</button>
      </div>  
    )}
  </div>

export default Persons