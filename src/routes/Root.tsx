import React, {useState, useEffect, useRef} from 'react';
import axios, {AxiosResponse} from 'axios';
export default function Root() {
    const [movieInput1, setMovieInput1] = useState("");
    const [movieInput2, setMovieInput2] = useState("");
    const [moviePreds1, setMoviePreds1] = useState([]);
    const [moviePreds2, setMoviePreds2] = useState([]);
    const [delayDelta, setDelayDelta] = useState(500);
    
    const movieInput1Ref = useRef(null);
    const movieInput2Ref = useRef(null);
    
    const callMovieAPI = (movieInput:string) => {
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
    
    let movieInputTimeout = setTimeout(() => {}, delayDelta);
    const invokeMovieInputTimeout = () => {
        if (document.activeElement === movieInput1Ref.current) {
            movieInputTimeout = setTimeout(() => {
                callMovieAPI(movieInput1);
            }, delayDelta);
        }
        if (document.activeElement === movieInput2Ref.current) {
            movieInputTimeout = setTimeout(() => {
                callMovieAPI(movieInput2);
            }, delayDelta);
        }
    }
    
    const resetTimeout = (timeout:number) => {
        clearTimeout(timeout);
        
    };
    
    useEffect(():void => {
        document.addEventListener('keydown', () => { 
            if ((document.activeElement === movieInput1Ref.current) ||
                (document.activeElement === movieInput2Ref.current))
            invokeMovieInputTimeout() 
        }, false);
    }, []);
    
    useEffect(():void => {
       // update predictions 
       
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
                    <input id="movieInput2" ref={movieInput2Ref} value={movieInput2} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setMovieInput2(e.target.value)}}/>
                </form>
            </div>
        </>
    );
}