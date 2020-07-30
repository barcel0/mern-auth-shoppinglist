const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Item = require('../../models/Item');

// @route   GET /api/items
// @desc    Get All items
// @access  Public
router.get('/', (req, res)=>{
  Item.find().sort({createdAt: 1}).exec((err, items)=>{
    res.json(items)
  });
});

// @route   POST /api/items
// @desc    Create an item
// @access  Private
router.post('/', auth, (req, res)=>{
  const newItem = new Item({name: req.body.name});
  newItem.save().then(item=>res.json(item));
});

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', auth, (req, res)=>{
  Item.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (err, item)=>{
    if(err) return res.status(404).json({success: false, error: err});
    return res.json({success: true, deletedItem: item});
  });
});




module.exports = router;