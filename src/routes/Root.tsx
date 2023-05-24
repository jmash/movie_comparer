import React, {useState, useEffect, useRef} from 'react';
import axios, {AxiosResponse} from 'axios';

export interface MovieRoot {
    page: number
    next: string
    entries: number
    results: Result[]
}

export interface Result {
    _id: string
    id: string
    primaryImage: PrimaryImage
    titleType: TitleType
    titleText: TitleText
    originalTitleText: OriginalTitleText
    releaseYear: ReleaseYear
    releaseDate: ReleaseDate
}

export interface PrimaryImage {
    id: string
    width: number
    height: number
    url: string
    caption: Caption
    __typename: string
}

export interface Caption {
    plainText: string
    __typename: string
}

export interface TitleType {
    displayableProperty: DisplayableProperty
    text: string
    id: string
    isSeries: boolean
    isEpisode: boolean
    categories: Category[]
    canHaveEpisodes: boolean
    __typename: string
}

export interface DisplayableProperty {
    value: Value
    __typename: string
}

export interface Value {
    plainText: string
    __typename: string
}

export interface Category {
    value: string
    __typename: string
}

export interface TitleText {
    text: string
    __typename: string
}

export interface OriginalTitleText {
    text: string
    __typename: string
}

export interface ReleaseYear {
    year: number
    endYear: any
    __typename: string
}

export interface ReleaseDate {
    day: number
    month: number
    year: number
    __typename: string
}
export default function Root() {
    const [movieInput1, setMovieInput1] = useState("");
    const [movieInput2, setMovieInput2] = useState("");
    const [moviePreds1, setMoviePreds1] = useState<Array<Result>>([]);
    const [moviePreds2, setMoviePreds2] = useState<Array<Result>>([]);
    const [delayDelta, setDelayDelta] = useState(500);
    
    const movieInput1Ref = useRef<HTMLInputElement>(null);
    const movieInput2Ref = useRef<HTMLInputElement>(null);
    const movieInputTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    const callMovieAPI = (movieInput:string) => {
        console.log("Entering callMovieAPI");
        console.log(`movieInput1: ${movieInput}`);
        console.log(`Movie input length: ${movieInput.length}`);
        if (movieInput.length > 0) {
            const options = {
                method: 'GET', // TODO: make the url dependent on development/production
                url: `http://localhost:5000/get-possible-titles/${movieInput}`,
            };
            const predsRes = axios.request<MovieRoot>(options);
            predsRes.then((res: AxiosResponse) => {
                let predictions:Result[] = [];
                console.log("before predsRes for loop");
                console.log("res.data.length is " + Object.keys(res.data).length);
                for (let i = 0; i < Object.keys(res.data.results).length; i++) {
                    predictions.push(res.data.results[i]);
                }
                console.log("after predsRes for loop");
                
                console.log(predictions);
                setMoviePreds1(predictions);
                //console.log(moviePreds1);
            }).catch((err: any) => {
                console.error(err);
            });
        }
    }
    
    useEffect(():void => {
        
    }, []);
    
    useEffect(():void => {
        // update predictions 
        setMovieInput1(movieInput1Ref.current!.value);
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
                    <div style={{minWidth: "500px"}}>
                        { moviePreds1.map((el:Result, idx:number) => {
                            let currentMovieId = el.id;
                            let currentMovieTitle = el.titleText.text;
                            let currentMovieImageURL = el.primaryImage.url;
                            let currentMovieType = el.titleType.text;
                            return <div key={currentMovieId}><button style={{minWidth: "500px"}}>{currentMovieTitle} | <span style={{fontWeight:"bold"}}>{currentMovieType}</span> | <img style={{width: "75px", minHeight: "75px", height:"75px", objectFit:"cover"}} alt="temp alt" src={currentMovieImageURL} /></button></div>
                        })}
                    </div>
                    <h3>Movie Input 2</h3>
                    <input list="moviePreds2" id="movieInput2" ref={movieInput2Ref} value={movieInput2} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setMovieInput2(e.target.value)}}/>
                </form>
            </div>
        </>
    );
}