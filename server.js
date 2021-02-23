const app = require('./app');
const db = require('./Database');


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
    db.connection();
});