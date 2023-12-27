const Filter = ({ filter, onFilterChange }) =>
  <form>
  filter shown with
  <input 
    value={filter}
    onChange={onFilterChange}
  />
  </form>

export default Filter