const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// route for retrieving movie title
app.get('/test',
    (req: Express.Request, res: Express.Response) => {
        console.log(typeof(res));
        //res.send({express: 'Test route connecting successfully'});
    });

export {}; // included to comply with typescript standards regarding isolated modules