const {Command} = require('commander');
const program = new Command();

const contactsOparations = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action){
        case 'list':
                const contacts = await contactsOparations.listContacts();
                console.table(contacts);
                break;
        case 'get':
                const contact = await contactsOparations.getContactById(id);
                console.log(contact);
                break;
        case 'add':
                if (!name){
                        return console.log(`Can't add a new contact with empty name.`);
                };
                if (!(phone || email)) {
                        return console.log(`Can't add a new contact without phone and/or email.`);
                }
                const newContact = await contactsOparations.addContact(name, email, phone);
                if (!newContact) {
                        return console.log(`Can't add a new contact besause the name = ${name} is already in the contact list.`);
                }
                console.log(newContact);
                break;
        case 'remove':
                const removeContact = await contactsOparations.removeContact(id);
                console.log(removeContact);
                break;
        default: 
                console.warn('\x1B[31m Unknown action type!');
    }
};

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');
program.parse(process.argv);
const argv = program.opts();

invokeAction(argv);