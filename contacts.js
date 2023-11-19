const { nanoid } = require("nanoid");
const fs = require("node:fs/promises");
const path = require("node:path");


const contactsPath = path.join(process.cwd(), "./db/contacts.json");


async function readDB() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data.toString());
}


async function writeDB(newData) {
  await fs.writeFile(contactsPath, JSON.stringify(newData));
}

//get all
async function listContacts() {
  const data = await readDB();
  return data;
}

//get one by id
async function getContactById(contactId) {
  const data = await readDB();
  const result = data.find((one) => one.id === contactId);
  return result || null;
}

//remove by id
async function removeContact(contactId) {
  const data = await readDB();
  const removed = data.find((one) => one.id === contactId) || null;

  if (removed) {
    const result = data.filter((one) => one.id !== removed.id);
    await writeDB(result);
  }
  return removed;
}

//add
async function addContact(name, email, phone) {
  const data = await readDB();
  const exist = data.filter((one) => one.name === name);

  if (exist.length) {
    return(`Contact ${name} already exist!`);
  }
  else {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    data.push(newContact);
    await writeDB(data);
    return newContact;
  }
}


const contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contacts;
