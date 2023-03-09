const SearchFilter = (props) => {
  return (
  <div>
  <form>
  <div>
  Search:{" "}
  <input value={props.searchQuery} onChange={(event) => props.setSearchQuery(event.target.value)} />
  </div>
  </form>
  </div>
  )
  }
export default SearchFilter