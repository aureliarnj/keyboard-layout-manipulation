const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 5000;
const host = 'localhost';

// Setting Views
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// App
const table = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
];

const shiftKey = (val, num) => {
    let index;
    const shifting = (val, num) => {
        const len = val.length;
        for (let i = 0; i < len; i++) {
            return val.map((x,i,a) => val[(((num+i)%len) + len) % len]);
        }
    };
    
    for (let i = 0; i < val.length; i++) {
        index = shifting(val[i], num);
    }
    return index
};


const verticalFlipKey = (val) => {
    let index = 0;
    let newIndex = val.length - 1;
    
    while (index < newIndex) {
        let temp = val[index];
        val[index] = val[newIndex];
        val[newIndex] = temp;
        
        index++;
        newIndex--;
    }
    
    return val;
};

const horizontalFlipKey = (val) => {
    for (let i = 0; i < val.length; i++) {
        verticalFlipKey(val[i]);
    }
    return val;
};

// console.log(shiftKey(table, -8));

app.get('/', (req, res) => {
    res.render('index', { table });
});

app.post('/result', (req, res) => {
    const input = req.body.key;
    
    for (let i = 0; i < input.length; i++) {
        let index = input[i].toUpperCase();
        let result;
        // isNaN(input[i]) ? console.log("yep") : console.log("this is number");
        if (isNaN(input[i])) {
            let flipKey = index === "H" || index === "V" ? index : console.log(`${input[i]} is a wrong key, please enter the correct key`);
            result = flipKey === "H" ? horizontalFlipKey(table) : verticalFlipKey(table);
        }
        // console.log(result);
        // let index = !isNaN(input[i])

        // if (input[i].toUpperCase() === "H") {
        //     console.log('1 ok');
        // }

        // if (input[i].toUpperCase() === "V") {
        //     console.log('2 ok');
        // }

        // if (!isNaN(input[i])) {
        //     console.log("3 ok");
        //     shiftKey(table[1], input[i])
        // }

    }

    res.render('index', { table });
});

// Connection
app.listen(port, () => {
    console.log(`Server running on port http://${host}:${port}`);
});