import { writeFile, readFile, appendFile, unlink } from "fs/promises";

const writeData = async (fname, contents) => {
  await writeFile(fname, contents);
  console.log("File written");
};

const readData = async (fname) => {
  const data = await readFile(fname, "utf-8");
  console.log("File contents:");
  console.log(data);
};

const appendData = async (fname, contents) => {
  await appendFile(fname, "\n" + contents);
  console.log("File appended");
};

const deleteData = async (fname) => {
  await unlink(fname);
  console.log(`${fname} deleted`);
};

await writeData("happy.txt", "I am very happy");
await readData("happy.txt");
await appendData("happy.txt", "FSD is interesting");
await readData("happy.txt");
await deleteData("happy.txt");
