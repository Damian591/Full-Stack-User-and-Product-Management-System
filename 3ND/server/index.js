const express = require ("express");
const app = express();
const mongoose=require('mongoose');
const UserModel=require("./models/Users");
const ProductModel = require("./models/Products");


const cors=require('cors');
app.use(express.json());
app.use(cors());


app.listen(3001, () => {
    console.log("Serveris tinkamai veikia");
    });

mongoose.connect ("Connection string from MongoDB")

app.get("/getUsers", (req, res)=>{
    UserModel.find().then(function(response){
    res.json(response);
    }).catch(function(err){
    res.json(err);
    })
    });
app.post("/createUser", async (req, res)=>{
    const user = req.body;
    const newUser = new UserModel (user);
    await newUser.save();
    res.json(user)
});
app.delete('/users/:id', async (req, res) => {
    try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});
app.put("/users/:id", async (req, res) => {
  try {
    const { name, age, username, email, birthday } = req.body;

    // Patikriname, ar visi būtini laukai yra pateikti
    if (!name || !age || !username || !email || !birthday) {
      return res.status(400).json({ message: "Visi laukai turi būti užpildyti!" });
    }

    // Atnaujiname vartotojo informaciją
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        age,
        username,
        email,
        birthday,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Vartotojas nerastas!" });
    }

    res.json({ message: "Vartotojas sėkmingai atnaujintas!", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Klaida atnaujinant vartotoją", error: err.message });
  }
});
// Products
app.get('/getProducts', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving products', error: err.message });
  }
});
app.post("/createProduct", async (req, res) => {
    try {
      const { Product, Type, BestBefore } = req.body;
  
      // Patikriname, ar visi laukai yra pateikti
      if (!Product || !Type || !BestBefore) {
        return res.status(400).json({ message: "Visi laukai turi būti užpildyti!" });
      }
  
      const newProduct = new ProductModel({
        Product,
        Type,
        BestBefore,
      });
  
      await newProduct.save();
      res.json({ message: "Produktas sukurtas sėkmingai!", product: newProduct });
    } catch (err) {
      res.status(500).json({ message: "Klaida kuriant produktą", error: err.message });
    }
  });
  
  // Sukuriame DELETE metodą produkto ištrynimui pagal ID
  app.delete("/products/:id", async (req, res) => {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: "Produktas nerastas!" });
      }
  
      res.json({ message: "Produktas sėkmingai ištrintas!", product: deletedProduct });
    } catch (err) {
      res.status(500).json({ message: "Klaida trinant produktą", error: err.message });
    }
  });
  
  // Sukuriame PUT metodą produkto atnaujinimui pagal ID
  app.put("/products/:id", async (req, res) => {
    try {
      const { Product, Type, BestBefore } = req.body;
  
      // Patikriname, ar visi laukai yra pateikti
      if (!Product || !Type || !BestBefore) {
        return res.status(400).json({ message: "Visi laukai turi būti užpildyti!" });
      }
  
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        req.params.id,
        { Product, Type, BestBefore },
        { new: true } 
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: "Produktas nerastas!" });
      }
  
      res.json({ message: "Produktas sėkmingai atnaujintas!", product: updatedProduct });
    } catch (err) {
      res.status(500).json({ message: "Klaida atnaujinant produktą", error: err.message });
    }
  });

  app.post("/createProduct", async (req, res) => {
    try {
      const { Product, Type, BestBefore } = req.body;
      if (!Product || !Type || !BestBefore) {
        return res.status(400).json({ message: "All fields are required!" });
      }
  
      const newProduct = new ProductModel({ Product, Type, BestBefore });
      await newProduct.save();
      res.json({ message: "Product created successfully!", product: newProduct });
    } catch (err) {
      res.status(500).json({ message: "Error creating product", error: err.message });
    }
  });
  
  // Delete a product by ID
  app.delete("/products/:id", async (req, res) => {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found!" });
      }
      res.json({ message: "Product deleted successfully!", product: deletedProduct });
    } catch (err) {
      res.status(500).json({ message: "Error deleting product", error: err.message });
    }
  });
  
  // Update a product by ID
  app.put("/products/:id", async (req, res) => {
    try {
      const { Product, Type, BestBefore } = req.body;
      if (!Product || !Type || !BestBefore) {
        return res.status(400).json({ message: "All fields are required!" });
      }
  
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        req.params.id,
        { Product, Type, BestBefore },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found!" });
      }
      res.json({ message: "Product updated successfully!", product: updatedProduct });
    } catch (err) {
      res.status(500).json({ message: "Error updating product", error: err.message });
    }
  });
    
        