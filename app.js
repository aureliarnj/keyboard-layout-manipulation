const express = require('express');
const app = express();

const port = 3000;
const host = 'localhost';

// setting views
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const table = [
        { row: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] },
        { row: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'] },
        { row: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'] },
        { row: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'] }
    ];

    res.render('index', { table });
});



// Server
app.listen(port, () => {
    console.log(`Server running on port http://${host}:${port}`);
});