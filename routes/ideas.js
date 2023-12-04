const express=require('express');
const router=express.Router();
const ideas=[
    {
        id: 1,
        text: 'Positive newsletter , a newsletter thatonly shares positive news 1',
        tag: 'Technology',
        username:'Amin',
        date:'2023-12-04'
    },
    {
        id: 2,
        text: 'Negative newsletter , a newsletter thatonly shares negative news ',
        tag: 'Inventions',
        username:'Hadi',
        date:'2023-12-05'
    },
    {
        id: 3,
        text: 'neutral newsletter , a newsletter thatonly shares neutral news ',
        tag: 'Inventions',
        username:'Sona',
        date:'2023-12-05'
    }
]


// Get all ideas
router.get('/', (req, res) => {
    res.json({success:true, data: ideas});

})


// Get single idea
router.get('/:id', (req, res) => {

    const idea= ideas.find((idea)=> idea.id === +req.params.id);
    if (!idea) {
       return res.status(404).json({success:false, error:'Resource not found'})
    }

    res.json({success:true, data: idea});

})

// Add an idea
router.post('/', (req, res) => {

    const idea={
        id: ideas.length + 1,
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        date: new Date().toISOString().slice(0,10)
    }

    ideas.push(idea);

    res.json({success:true , data: idea});


})

// Update an idea
router.put('/:id', (req, res) => {

    const idea= ideas.find((idea)=> idea.id === +req.params.id);
    if (!idea) {
       return res.status(404).json({success:false, error:'Resource not found'})
    }

    idea.text=req.body.text || idea.text;
    idea.tag=req.body.tag || idea.tag;

    res.json({success:true, data: idea});

})

// delete an idea
router.delete('/:id', (req, res) => {

    const idea= ideas.find((idea)=> idea.id === +req.params.id);
    if (!idea) {
       return res.status(404).json({success:false, error:'Resource not found'})
    }

    const index= ideas.indexOf(idea);
    ideas.splice(index, 1);

    res.json({success:true, data: {}});

})


module.exports = router;