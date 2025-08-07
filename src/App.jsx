import axios from "axios";
import { useState, useEffect, useMemo } from "react";
const App = () => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUrl , setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
  const [prevUrl, setPrevUrl] = useState();
  const [nextUrl, setNextUrl] = useState();
  const [sorted, setSorted] = useState();
  const [itemsPerPage] = useState(20);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const debouncedSearch = useDebounce(search, 2000); 
  useEffect(() => {
    axios
      .get(currentUrl)
      .then((res) => {
        setPosts(res.data.results);
        setCount(res.data.count);
        setPrevUrl(res.data.previous);
        setNextUrl(res.data.next);

      })
      .catch((err) => console.log(err));
  }, [currentUrl]);
  
  
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebounceValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    return debounceValue;
  }

  const handlePreviousPage = () => {
    if(prevUrl){
      setCurrentUrl(prevUrl);
    }
  };

  const handleNextPage = () => {
    if(nextUrl){
      setCurrentUrl(nextUrl);
    }
  };
  const sort = () => {
    setSorted(toggle => (toggle === "ascending"? "descending": "ascending"));
  }
  
  const filteredPokemon = useMemo(() => {
    console.log("Filtered pokemon");
    let filtered =  posts.filter((post) =>
      post.name?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    if(sorted === "ascending"){
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if(sorted === "descending"){
      filtered.sort((a, b) => b.name.localeCompare(a.name))
    }
    return filtered;
  }, [debouncedSearch, posts, sorted]);



  const currentItems = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);


 
  const handlePokemonClick = (name) => {
    console.log({ name });
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => setSelectedPokemon(res.data))
      .catch((err) => console.log(err));
  };
  const handleClick = () => {
    console.log("Clicked to list");
    setSelectedPokemon(null);
  };

  return (
    <>
      {selectedPokemon ? (
        <div>
          <h3>{selectedPokemon.name}</h3>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <h4>Stats:</h4>
          <ul>
            {selectedPokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
          <button onClick={handleClick}>Back to List</button>
        </div>
      ) : (
        <div>
          <button onClick = {sort} >Sort</button>
          <input type="text" value={search} onChange={handleSearch} />
      <div>Total Pokemon: {count}</div>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Id</th>
              <th>Pokemon Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((post, index) => (
              <tr key={post.url}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{post.name}
          </td>
                <td>
                  <button onClick={() => handlePokemonClick(post.name)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick = {handlePreviousPage}>Previous</button>
        <button onClick = {handleNextPage}>Next</button>
       
        </div>
      )}
    </>
  );
};
export default App;
