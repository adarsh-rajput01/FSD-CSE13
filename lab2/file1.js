import {writeFile} from "fs/promises";

await writeFile("stud1.txt", "Name: Adarsh Rajput");
console.log("File written");