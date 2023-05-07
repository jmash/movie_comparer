import Express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
const app = Express();
const port = process.env.SERVER_PORT || 5000;

const options = {
    method: 'GET',
    url: 'https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids',
    params: {
        idsList: 'tt0001702,tt0001856,tt0001857'
    },
    headers: {
        'X-RapidAPI-Key': process.env["X-RapidAPI-Key"],
        'X-RapidAPI-Host': process.env["X-RapidAPI-Host"]
    }
};



app.listen(port, () => console.log(`Listening on port ${port}`));

// route for retrieving movie title
app.get('/test',
    async (req: Request, res:Response, next:NextFunction) => {
        try {
            const movieRes = await axios.request(options);
            res.status(200).send(movieRes.data);
            console.log(movieRes.data); 
        } catch(err) {
            next(err);
            console.error("Error connecting to movies database") 
        }
    });

export {}; // included to comply with typescript standards regarding isolated modules