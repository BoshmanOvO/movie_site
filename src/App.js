import React ,{ useState , useEffect } from "react";

import "./App.css";
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = `http://www.omdbapi.com?apikey=82ad317`;

const movie1 ={
    Poster: "https://m.media-amazon.com/images/M/MV5BMDJhZjA5MWEtOTE5Yy00MWJiLTgwNjQtMDliOWI0NWJmZDZkXkEyXkFqcGdeQXVyMjY1ODY2Ng@@._V1_SX300.jpg",
    Title: "Lauf um Dein Leben - Vom Junkie zum Ironman",
    Type: "movie",
    Year: "2008",
    imdbID: "tt0954542"
}
const App = () => {

    const [movies , setMovies]=useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect ( () => {
        searchMovies('Ironman').then(r => console.log(r));
    },[]);
        const searchMovies = async( title )=>{
            const response = await fetch(`${API_URL}&s=${title}`);
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




