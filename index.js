const express = require('express');
const app = express();
const port = 5000;

const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json'); ignore while using ymal 
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const fileUpload = require('express-fileupload');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

let course = [

    {
        id: "11",
        name: "Learn React",
        price: 299
    }, {
        id: "22",
        name: "Learn Java",
        price: 399
    }, {
        id: "33",
        name: "LearnNodejs",
        price: 499
    },
]

app.get("/", (req, res) => {
    res.status(200).send("<h1>hello Guys<h1>");

});

app.get("/api/v1/lco", (req, res) => {
    res.status(200).send("<h1>Join the course and Enjoy<h1>");

});

app.get("/api/v1/lcoObject", (req, res) => {
    res.status(200).send({ id: 55, name: "Java", price: 999 });
});

app.get("/api/v1/course", (req, res) => {
    res.status(200).send(course);
});

app.get("/api/v1/mycourse/:id", (req, res) => {
    //id params
    const mycourse = course.find((c) => c.id === req.params.id);
    /*const coursename = course.find((cn) =>
        cn.name === req.params.name
    );*/

    // console.log(coursename);
    res.status(200).send(mycourse);
    //res.status(200).send(coursename);
});

app.post("/api/v1/addcourse", (req, res) => {
    console.log(req.body);
    course.push(req.body);
    res.send(true);
});

app.get("/api/v1/coursequery", (req, res) => {

    const Location = req.query.Location;
    const device = req.query.device;

    res.send({ Location, device });

});

app.post("/api/v1/uploadcourse", (req, res) => {
    console.log(req.headers);
    const file = req.files.file
    let path = __dirname + "/image/" + Date.now() + ".jpg"
    file.mv(path, (err) => {
        res.send(true);
    })

});


app.listen(port, () => {
    console.log(`Server is up and runing on port ${port}`);
})