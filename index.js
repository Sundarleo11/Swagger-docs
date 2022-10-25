const express = require('express');
const app = express();
const port = 5000;

const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json'); ignore while using ymal 
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.status(200).send("<h1>hello Guys<h1>");

});

app.listen(port, () => {
    console.log(`Server is up and runing on port ${port}`);
})