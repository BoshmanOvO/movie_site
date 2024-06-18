import React ,{ useState , useEffect } from "react";

import "./App.css";
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";


const Url = "http://www.omdbapi.com?apikey=82ad317";

const App = () => {

    const [movies , setMovies]=useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect ( () => {
        searchMovies('Ironman').then(r => console.log(r));
    },[]);
        const searchMovies = async( title )=>{
            const response = await fetch(`${Url}&s=${title}`);
            const data = await response.json();
            setMovies(data.Search);
        };

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className = "search">
               <input
                placeholder='Search for movies'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
               /> 
               <img 
                src={SearchIcon} alt="Search"
                onClick={()=>searchMovies(searchTerm)}
               />
            </div>

            {movies.length > 0 
               ?(
                    <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                    )) }
                    </div>
               ): (
                    <div className="empty">
                        <h2> No Movies Found</h2>
                    </div>
               )
            }

        </div>
    );
}
export default App;




