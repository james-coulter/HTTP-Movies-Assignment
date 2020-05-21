import React, { useState } from "react"
import { useHistory } from "react-router-dom";

import axios from "axios"

const AddMovie = ({ getMovieList }) => {

    const history = useHistory()

    const initMovie = {
        id: "",
        title: "",
        director: "",
        metascore: Number(""),
        stars: []
    }

    const [newMovie, setNewMovie] = useState(initMovie);

    const [newStar, setNewStar] = useState([]);

    const handleChange = e => {
        e.persist();
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value

        })
        // console.log(newMovie)
    };

    const handleNewStars = e => {
        setNewStar(e.target.value)
    }

    const addStar = e => {
        setNewMovie({
            ...newMovie,
            stars: [...newMovie.stars, newStar]
        })
        setNewStar('')
    }


    // const handleNewMovie = (movie) => {
    //     axios.post("http://localhost:5000/api/movies", movie)
    //         .then( res => {
    //             console.log(res)
    //             history.push('/')
    //             getMovieList()
    //         })
    //         .catch(err => console.log(err))
    // }


    const handleSubmit = (e) => {
        e.preventDefault();

        axios
          .post(`http://localhost:5000/api/movies`, newMovie)
          .then(res => {
            console.log('POST request for adding a movie', res);
            getMovieList();
            history.push(`/`);
          })
          .catch(err => console.log(err));
    
        setNewMovie(initMovie)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name: <input type="text" value={newMovie.title} name="title" onChange={handleChange} />
                </label>
                <label>
                    Director: <input type="text" value={newMovie.director} name="director" onChange={handleChange} />
                </label>
                <label>
                   Metascore: <input type="number" value={newMovie.metascore} name="metascore" onChange={handleChange} />
                </label>
                <label>
                    Stars: <input type="text" value={newStar} name="stars" onChange={handleNewStars} />
                </label>
                <button>Add Movie</button>
            </form>
            <button onClick={addStar}>Add New Star</button>
            {/* {newStar.initMovie.map(star => <div>{star}</div>)} */}
        </div>
    )
}

export default AddMovie;
