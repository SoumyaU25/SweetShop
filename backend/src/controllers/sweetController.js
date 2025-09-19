const Sweet = require('../model/Sweet');


const createSweets = async (req, res) =>{
     try {
    const { name, description, category, price, quantity, imageUrl } = req.body;

    // Basic validation
    if (!name || !description || !category || !price || quantity == null || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const sweet = await Sweet.create({
      name,
      description,
      category,
      price,
      quantity,
      imageUrl,
      createdBy: req.user._id
    });

    res.status(201).json(sweet);
  }
  catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {createSweets}