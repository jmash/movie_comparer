import React, {useState, useEffect, useRef} from 'react';

export default function Root() {
    const [movieInput1, setMovieInput1] = useState("");
    const [movieInput2, setMovieInput2] = useState("");
    const movieInput1Ref = useRef(String);
    const movieInput2Ref = useRef(String);
    
    useEffect(() => {
       // update predictions 
        console.log(movieInput1);
    }, [movieInput1]);
    
    useEffect(() => {
       // update predictions 
        console.log(movieInput2);
    }, [movieInput2]);
    
    return (
        <>
            <div>
                <h1>Root Route</h1>
                <form>
                    <h3>Movie Input 1</h3>
                    <input id="movieInput1" value={movieInput1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setMovieInput1(movieInput1Ref.current)}}/>
                    <h3>Movie Input 2</h3>
                    <input id="movieInput2" value={movieInput2} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setMovieInput2(movieInput2Ref.current)}}/>
                </form>
            </div>
        </>
    );
}