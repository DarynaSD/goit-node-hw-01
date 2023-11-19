// const admins = ["Alex", "Andrey", "VAsiliy"];

// const clients = ["Anna", "Alina", "Tamara"];

// const contacts = {
//     admins,
//     clients
// };

const { nanoid } = require("nanoid");
const fs = require("node:fs/promises");
const path = require("node:path");

//  Розкоментуй і запиши значення
const contactsPath = path.join(process.cwd(), "./db/contacts.json");
//console.log(contactsPath)

async function readDB() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data.toString());
}

async function writeDB(newData) {
  await fs.writeFile(contactsPath, JSON.stringify(newData));
}

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await readDB();
  return data;
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const data = await readDB();
  const result = data.find((one) => one.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const data = await readDB();
  const removed = data.find((one) => one.id === contactId) || null;

  if (removed) {
    const result = data.filter((one) => one.id !== removed.id);
    await writeDB(result);
  }
  return removed;
}

//removeContact("AeHIrLTr6JkxGE6SN-0Rw")

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
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

//addContact("olha", "alam@mail", 46389202);

const contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contacts;
