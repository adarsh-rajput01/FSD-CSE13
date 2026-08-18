import readline from 'readline/promises';
import { writeFile, readFile } from 'fs/promises';

import {stdin, stdout} from 'process';

const File = "products.json";

const saveCart= async (cart)=>{
    await writeFile(File, JSON.stringify(cart, null, 2));
};


const getCart= async ()=>{
    const data = await readFile(File, "utf-8");
    return JSON.parse(data);
};

const addToCart = async (item) => {
const products = await getCart();
products.push(item);
await saveCart(products); 
};   


const main = async () => {

      const cin = readline.createInterface({input: stdin, output: stdout});
      let choice;
    do {
    console.log("Welcome to the Shopping Cart 🛒 ");
    console.log("1-------Add to cart");
    console.log("2-------Show cart");
    console.log("3-------Remove from cart");
    console.log("4-------Update Quantity");
    console.log("5-------Checkout");
     let choice = await cin.question("Enter your choice: ");
    console.log('Entered choice:', choice); 
    switch (Number(choice)) {
        case 1:
            await addToCart({id: 101, name: "Mobile", price: 20000, quantity: 3});
            console.log("Add to cart");
            break;
        case 2:
            console.log("Show cart items");
            break;
        case 3:
            console.log("Remove Items");
            break;
        case 4:  
            console.log("Update Quantity");
            break;
        case 5:
            console.log("See you later...😄");
            process.exit();
             break;
        default:
            console.log("Invalid choice! Try again.🤬");
    }                            
} while (choice != 5);
    cin.close();
};

main();