import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.status(200).json({ msg: "hello!" });
});

app.listen(port, () => {
    console.log(`app running at port ${port}`);
});
