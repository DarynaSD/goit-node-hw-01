console.log("hello world");
const fs = require("node:fs").promises;
const { Command } = require('commander');

// const obj = require("./contacts");
// console.log(obj);

// const {admins} = require("./contacts");
// console.log(admins);

const { listContacts, getContactById, removeContact, addContact } = require("./contacts");

//console.log(contactsPath);
//listContacts().then((data) => console.log(data));
//getContactById("vza2RIzNGIwutCVCs4mCL").then((one) => console.log(one));
// removeContact("8P4UVSmdgOYfCNbnc2bcK").then((data) => console.log(data));
// addContact("artur", "alam@mail", 46389202).then((data) => console.log(data));


const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.log(contacts);
      break;

    case 'get':
      const contactById = await getContactById(id);
      console.log(contactById);
      break;

    case 'add':
      const contactToAdd = await addContact(name, email, phone);
      console.log(contactToAdd);
      break;

    case 'remove':
    const contactToRemove = await removeContact(id);
      console.log(contactToRemove);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);