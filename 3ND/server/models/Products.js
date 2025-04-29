const mongoose=require('mongoose')
const ProductSchema=new mongoose.Schema ({
    Product:{
    type:String,
    required:true,
    },
    Type:{
    type:String,
    required:true,
    },
    BestBefore:{
    type:String,
    required:true,
    }
    })

    const ProductModel = mongoose.model("products",ProductSchema);
    module.exports=ProductModel;