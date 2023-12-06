const express=require('express');
const router=express.Router();
const Idea=require('../models/Idea')

// Get all ideas
router.get('/', async(req, res) => {
    try {
        const ideas=await Idea.find();
        res.json({success:true, data: ideas});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, error:'something wrong'});
    }
})
// 

// Get single idea
router.get('/:id', async(req, res) => {

    const idea= await Idea.findById(req.params.id);
    res.json({success:true, data: idea});

    
    try {
        const idea= await Idea.find
    } catch (error) {
        console.log(error);
        return res.status(404).json({success:false, error:'sth not found'})

    }

})

// Add an idea
router.post('/', async(req, res) => {

    const idea=new Idea({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
    })

    try {
       const savedIdea= await idea.save();
       res.json({success:true , data: savedIdea});

    } catch (error) {
        console.log(error);
        return res.status(404).json({success:false, error:'sth not found'})

    }

})

// Update an idea
router.put('/:id', async(req, res) => {

    try {

        const idea= await Idea.findById(req.params.id);
        if (idea.username===req.body.username) {
            const UpdateIdea = await Idea.findByIdAndUpdate(
                req.params.id ,
                {
                    text: req.body.text,
                    tag: req.body.tag,
                },
                {  
                    new: true
                }
                );
               return res.json({success:true, data: UpdateIdea});
        }

        // username doesnot match
        res.status(403).json({success:false, error:'you are not authorized to update'})
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, error:'sth went wrong'})

    }
})

// delete an idea
router.delete('/:id', async(req, res) => {

    try {
        const idea= await Idea.findById(req.params.id);
        // Match the username
        if (idea.username===req.body.username) {
            await Idea.findByIdAndDelete(req.params.id);
            return res.json({success:true, data: {}});
        }
        // username doesnot match
         res.status(403).json({success:false, error:'you are not authorized to delete'})

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, error:'sth went wrong'})
    }

})


module.exports = router;