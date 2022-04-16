import React from "react";
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
// Components
import HeroImage from './heroImage/HeroImage';
import Grid from './grid/Grid';
import Thumb from './thumb/Thumb';
import Spinner from './spiner/Spiner';
import SearchBar from './searchBar/SearchBar';
import Button from './button/Button';
// Hooks
import { useHomeFetch } from "../hooks/useHomeFetch";
// Images
import NoImage from '../images/no_image.jpg';

const Home = () => {
    const {
        state,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        setIsLoadingMore
    } = useHomeFetch();

    console.log(state);
    
    if (error) {
        return <div>Something went wrong...</div>;
    }

    return (
        <>
            {!searchTerm && state.results[0] ?
                <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                    title={state.results[0].original_title}
                    text={state.results[0].overview}
                />
                : null}
            <SearchBar setSearchTerm={setSearchTerm} />
            <Grid header={searchTerm ? 'Search movies' : 'Popular Movies'}>
                {state.results.map(movie => (
                    <Thumb
                        key={movie.id}
                        clickable
                        image={
                            movie.poster_path
                            ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                            : NoImage
                        }
                        movieId={movie.id}
                    />
                ))}
            </Grid>
            {loading && <Spinner />}
            {state.page < state.total_pages && !loading && (
                <Button text='Load More' callback={() => setIsLoadingMore(true)}/>
            )}
        </>
    );
}

export default Home;