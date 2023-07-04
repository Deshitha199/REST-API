const express = require('express');
const app = express();
const PORT = 3000;

let blog = [];

const convertParams = (req, res, next) => {
    const { id } = req.params;
    req.params.id = parseInt(id);
    next();
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send("success!");

});

app.get('/blogs', (req, res) => {
    res.json(blog);
});

app.post('/blogs', (req, res) => {
    blog.push({ id: blog.length + 1, ...req.body });
    res.status(201).send({ messageInfo: "ok!" });
});

app.put('/blogs/:id', convertParams, (req, res) => {
    const { id } = req.params;
    const index = blog.findIndex((item) => item.id === id);
    blog[index] = req.body
    if (index != -1) {
        return res.send(blog[index]);
    }
    else {
        res.send({ message: "Not founded" });
    }
});

app.get('/blogs/:id', convertParams, (req, res) => {
    const { id } = req.params;
    const index = blog.findIndex((item) => item.id === id);
    res.send(blog[index]);
})

app.delete('/blogs/:id', convertParams, (req, res) => {
    const { id } = req.params;
    const index = blog.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).send({ message: "Not found" })
    } else {
        blog.splice(index, 1)
        res.send({ message: "Deleted" })
    }
})

app.listen(PORT, () => console.log(`App is listening on PORT: ${PORT}`));

