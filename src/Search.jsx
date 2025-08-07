const Search = ({search, onSearchChange}) => {
    return(
        <>
        <input type="text" value = {search} onChange = {onSearchChange}/>
        </>
    )
}
export default Search;