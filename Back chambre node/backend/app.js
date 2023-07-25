const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
    
})


// ---api ---
app.use(express.json());
Cham_route = require('./routes/chambreroute');
app.use('/myapi/chambre', Cham_route);
app.use('/myapi/',Cham_route);


module.exports = app;
