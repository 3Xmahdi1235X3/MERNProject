const ProductModel = require("./models/ProductModel")
const UserModel = require("./models/UserModel")
const OrderModel = require("./models/OrderModel")
const products = require("./data/products")
const users = require("./data/users")
const connectDb = require("./config/db")
const dotenv = require("dotenv")
dotenv.config()


const importData = async () => {
  try {
    await connectDb()

    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    const createdUsers = await UserModel.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });

    await ProductModel.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
importData()