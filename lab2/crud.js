import readline from "readline/promises";
import { writeFile, readFile } from "fs/promises";
import { stdin, stdout } from "process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const file = join(dirname(fileURLToPath(import.meta.url)), "products.json");

const saveCart = async (cart) => {
  await writeFile(file, JSON.stringify(cart, null, 2));
};

const getCart = async () => {
  const data = await readFile(file, "utf-8");
  return JSON.parse(data);
};

const addToCart = async (item) => {
  const products = await getCart();
  const existingProduct = products.find((product) => product.id === item.id);

  if (existingProduct) {
    existingProduct.qty = (existingProduct.qty || 0) + item.qty;
  } else {
    products.push(item);
  }

  await saveCart(products);
};

const showCart = async () => {
  const products = await getCart();
  if (products.length === 0) {
    console.log("Cart is empty.");
    return;
  }
  console.table(products);
};

const deleteFromCart = async (id) => {
  const products = await getCart();
  const remainingProducts = products.filter((product) => product.id !== id);
  if (remainingProducts.length === products.length) {
    console.log("Product not found.");
    return;
  }
  await saveCart(remainingProducts);
  console.log("Product removed.");
};

const updateCart = async (id, quantity) => {
  const products = await getCart();
  const product = products.find((item) => item.id === id);
  if (!product) {
    console.log("Product not found.");
    return;
  }
  product.qty = quantity;
  await saveCart(products);
  console.log("Quantity updated.");
};

const main = async () => {
  const cin = readline.createInterface({ input: stdin, output: stdout });
  let choice;

  do {
    console.log("Welcome to the Shopping Cart");
    console.log("1-------Add to cart");
    console.log("2-------Show cart");
    console.log("3-------Remove from cart");
    console.log("4-------Update Quantity");
    console.log("5-------Checkout");
    choice = await cin.question("Enter your choice: ");

    try {
      switch (Number(choice)) {
        case 1: {
          const data = await cin.question("Enter id, name, price, qty: ");
          const [id, name, price, qty] = data
            .split(",")
            .map((item) => item.trim());
          await addToCart({
            id: Number(id),
            name,
            price: Number(price),
            qty: Number(qty),
          });
          console.log("Product added.");
          break;
        }
        case 2:
          await showCart();
          break;
        case 3: {
          const id = Number(await cin.question("Enter product id: "));
          await deleteFromCart(id);
          break;
        }
        case 4: {
          const id = Number(await cin.question("Enter product id: "));
          const quantity = Number(await cin.question("Enter new quantity: "));
          await updateCart(id, quantity);
          break;
        }
        case 5:
          console.log("See you later...");
          break;
        default:
          console.log("Invalid choice! Try again.");
      }
    } catch (error) {
      console.error("Cart operation failed:", error.message);
    }
  } while (choice !== "5");

  cin.close();
};

main();
