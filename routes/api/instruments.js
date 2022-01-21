const express = require("express");
const intruments = require("../../Models/Intruments");

const router = express.Router();


router.get('/', (req, res) => {
    res.json(intruments);
});

router.get('/:id', (req, res) => {
    const found = intruments.some(x=>x.Id === req.params.id);
    if(found)
    {
        res.json(intruments.filter(x=>x.Id === req.params.id));
    }
    else
    {
        res.status(400).send({
        error : `Intruments Not Found For Id : ${req.params.id} `
        });
    }
});


module.exports = router;