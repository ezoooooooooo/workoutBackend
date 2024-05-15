const app = require('./app');
const connectDb = require('./Config/productDB');

connectDb();

app.listen(3000, () => {
    console.log("Server is running on port 3000!");
})