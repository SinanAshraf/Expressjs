const express = require("express");
const members = require("../../Models/Member");
const router = express.Router();
const uuid = require("uuid");

//Get All
router.get('/' , (req, res) => {
    res.json(members);
});

//Get One by Id
router.get('/:id', (req, res) => {
    const found = members.some(x=>x.id === parseInt(req.params.id));
    if(found)
    {
        const member = members.filter(x=>x.id === parseInt(req.params.id));
        res.json(member);
    }
    else
    {
        res.status(400).send({error : `Members Not Found For Id : ${req.params.id}`});
    }
});

//Create Member
router.post("/", (req, res) => {

    if(!req.body.name)
        res.status(400).send(`Please Provide Name.`);
    if(!req.body.email)
        res.status(400).send(`Please Provide Email.`);

    //check if already exist
    if(members.some(x=>x.Name == req.body.name))
    {
        res.status(400).send(`Member is Already Exist by Name: ${req.body.name}`);
    }
    //Add model
    members.push({
        id :  uuid.v4(),
        name : req.body.name,
        email : req.body.email,
        designation : req.body.designation
    });
    //res.send(members);
    res.redirect('/');
});

//Update Member
router.put("/:id", (req, res) => {
    const found = members.some(x=>x.id === parseInt(req.params.id));
    if(!found)
    {
        res.status(400).send({error : `Members Not Found For Id : ${req.params.id}`});
    }
    const member = members.filter(x=>x.id === parseInt(req.params.id));
    members.forEach(member => {
        if(member.id === parseInt(req.params.id))
        {
            member.name = req.body.name ? req.body.name : member.name;
            member.email = req.body.email? req.body.email : member.email;
            member.designation = req.body.designation ? req.body.designation : member.designation;
        }
    });
    res.json({msg : "Member Updated Successfully" , member: members.filter(x=>x.id === parseInt(req.params.id))});
});

//Delete Member 
router.delete("/:id", (req, res) => {
    const found = members.some(x=>x.id === parseInt(req.params.id));
    if(!found)
    {
        res.status(400).send({error : `Members Not Found For Id : ${req.params.id}`});
    }
    res.json({msg : "Member Deleted" , member: members.filter(x=>x.id !== parseInt(req.params.id))});
});

module.exports = router;