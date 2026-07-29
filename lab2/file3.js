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


