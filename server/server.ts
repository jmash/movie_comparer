import Express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
import cors from 'cors';
const app = Express();
const port = process.env.SERVER_PORT || 5000;

app.use(cors());
dotenv.config();

app.listen(port, () => console.log(`Listening on port ${port}`));

const rapidAPIKey = process.env.RAPID_API_KEY;
const rapidAPIHost = process.env.RAPID_API_HOST;

// route for retrieving movie title
app.get('/get-possible-titles/:title',
    async (req: Request, res:Response, next:NextFunction) => {
        const options = {
            method: 'GET',
            url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${req.params.title}`,
            params: {
                exact: 'false',
                limit: '5'
            },
            headers: {
                'X-RapidAPI-Key': rapidAPIKey,
                'X-RapidAPI-Host': rapidAPIHost
            }
        };
        
        try {
            console.log(req.params);
            const movieRes = await axios.request(options);
            res.status(200).send(movieRes.data);
            console.log(movieRes.data); 
        } catch(err) {
            next(err);
            console.error("Error connecting to movies database") 
        }
    });

export {}; // included to comply with typescript standards regarding isolated modules