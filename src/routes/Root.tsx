import React, {useState, useEffect, useRef} from 'react';
import axios, {AxiosResponse} from 'axios';
export default function Root() {
    const [movieInput1, setMovieInput1] = useState("");
    const [movieInput2, setMovieInput2] = useState("");
    const [moviePreds1, setMoviePreds1] = useState([]);
    const [moviePreds2, setMoviePreds2] = useState([]);
    const [delayDelta, setDelayDelta] = useState(1000);
    
    const movieInput1Ref = useRef(null);
    const movieInput2Ref = useRef(null);
    const movieInputTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    const callMovieAPI = (movieInput:string) => {
        console.log("Entering callMovieAPI");
        console.log(`movieInput1: ${movieInput}`);
        console.log(`Movie input length: ${movieInput.length}`);
        if (movieInput.length > 0) {
            const options = {
                method: 'GET', // TODO: make the url dependent on development/production
                url: `http://localhost:5000/get-possible-titles/${movieInput}`,
                params: {
                    exact: 'false',
                    limit: '5'
                },
            };
            const predsRes = axios.request(options);
            predsRes.then((res: AxiosResponse) => {
                console.log(res.data);
            }).catch((err: any) => {
                console.error(err);
            });
        }
    }
    
    useEffect(():void => {
        
    }, []);
    
    useEffect(():void => {
        // update predictions 
        console.log(movieInput1);
        clearTimeout(movieInputTimeoutRef.current!);
        movieInputTimeoutRef.current = setTimeout(() => {
            callMovieAPI(movieInput1);
        }, delayDelta);
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
                    <input list="moviePreds1" id="movieInput1" ref={movieInput1Ref} value={movieInput1} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setMovieInput1(e.target.value)}}/>
                    { moviePreds1.map((el:HTMLDivElement) => {
                        <div></div>
                    })} 
                    <h3>Movie Input 2</h3>
                    <input list="moviePreds2" id="movieInput2" ref={movieInput2Ref} value={movieInput2} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setMovieInput2(e.target.value)}}/>
                </form>
            </div>
        </>
    );
}