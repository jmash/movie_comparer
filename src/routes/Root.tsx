import React, {useState, useEffect} from 'react';
import axios, {AxiosResponse} from 'axios';

interface Response {
    titleText: string,
    releaseYear: number,
    primaryImage: string,
    titleType: string
}

export default function Root() {
    const [movieInput1, setMovieInput1] = useState("");
    const [movieInput2, setMovieInput2] = useState("");
    const [moviePreds1, setMoviePreds1] = useState([]);
    const [moviePreds2, setMoviePreds2] = useState([]);
    
    useEffect(() => {
       // update predictions 
        console.log(movieInput1);
        if (movieInput1.length > 0) {
            const options = {
                method: 'GET', // TODO: make the url dependent on development/production
                url: `http://localhost:5000/get-possible-titles/${movieInput1}`,
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
                    <input list="moviePreds1" id="movieInput1" value={movieInput1} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setMovieInput1(e.target.value)}}/>
                    { moviePreds1.map((el:HTMLDivElement) => {
                        <div></div>
                    })} 
                    <h3>Movie Input 2</h3>
                    <input id="movieInput2" value={movieInput2} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setMovieInput2(e.target.value)}}/>
                </form>
            </div>
        </>
    );
}