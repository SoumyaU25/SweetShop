const Sweet = require('../model/Sweet');


//CRUD operation
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

const updateSweet = async (req, res, next) => {
  try {
    const updatedSweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedSweet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find().populate('createdBy', 'username email');
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

getSweetById = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    res.json({ message: 'Sweet deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // case-insensitive partial match
    }
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

//Inventory management

const purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });

    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: 'Out of stock' });
    }
    sweet.quantity -= 1;

    await sweet.save();
    res.json({ message: 'Purchase successful', sweet });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const restockSweet = async (req, res) => {
  try {
    const { amount } = req.body;
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });

    sweet.quantity += amount || 1;
    await sweet.save();
    res.json({ message: 'Restocked', sweet });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {createSweets, updateSweet, getAllSweets, getSweetById, deleteSweet, searchSweets, purchaseSweet, restockSweet}