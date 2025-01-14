import { deleteClientModal } from "./createDeleteModal.js";
import { editClientModal } from "./editClient.js";
import { svgSpinner } from "./svg.js";
import { createContactItemByType, formatDate, formatTime } from "./utils.js";
import { deleteClientItem, getClient } from "./clientsApi.js";
import { createApp } from "./index.js";

export const createClientItem = (data) => {
    const clientTr = document.createElement('tr');
    const clientIdTd = document.createElement('td');
    const clientId = document.createElement('span');
    const clientFullName = document.createElement('td');
    const clientName = document.createElement('span');
    const clientSurname = document.createElement('span');
    const clientLastName = document.createElement('span');
    const clientCreated = document.createElement('td');
    const createDate = document.createElement('span');
    const createdTime = document.createElement('span');
    const clientChanged = document.createElement('td');
    const changedDate = document.createElement('span');
    const changedTime = document.createElement('span');
    const clientContacts = document.createElement('td');
    const seeMoreContact = document.createElement('button');
    const clientActions = document.createElement('td');
    const clientEdit = document.createElement('button');
    const clientDelete = document.createElement('button');
    const deleteClient = deleteClientModal();
    const editSpinner = document.createElement('span');
    const deleteSpinner = document.createElement('span');

    editSpinner.classList.add('actions__spinner');
    deleteSpinner.classList.add('actions__spinner');
    clientTr.classList.add('clients__item');
    clientTr.id = data.id;
    clientIdTd.classList.add('client__id');
    clientFullName.classList.add('clients__full-name');
    clientName.classList.add('clients__name');
    clientSurname.classList.add('clients__surname');
    clientLastName.classList.add('clients__lastname');
    clientCreated.classList.add('clients__created');
    createDate.classList.add('created__date');
    createdTime.classList.add('created__time');
    clientChanged.classList.add('clients__changed');
    changedDate.classList.add('changed__date');
    changedTime.classList.add('changed__time');
    clientActions.classList.add('clients__actions');
    clientContacts.classList.add('clients__contacts');
    seeMoreContact.classList.add('see__more');
    clientDelete.classList.add('clients__delete', 'btn-reset');
    clientEdit.classList.add('clients__edit', 'btn-reset');
    seeMoreContact.classList.add('hidden', 'btn-reset')

    if(data.contacts.length > 4) {
        seeMoreContact.classList.remove('hidden')
        seeMoreContact.textContent = `+${data.contacts.length - 4}`;
    }

    seeMoreContact.addEventListener('click', ()=>{
        const contactsArray = clientContacts.querySelectorAll('.contacts__link')
        contactsArray.forEach(contact => contact.classList.add('is-visible'))
        seeMoreContact.classList.add('hidden')
    })     

    for (const contact of data.contacts) {
        createContactItemByType(contact.type, contact.value, clientContacts);
    }

    const deleteById = (client) => {        
        deleteClient.deleteModalDelete.addEventListener('click', () => {
            try {
                deleteClient.deleteSpinner.style.display = 'block';
                deleteClientItem(client.id);
                document.getElementById(data.id).remove();
                deleteClient.deleteModal.remove();
                document.querySelector('.main').remove();
                createApp();
            } catch (error) {
                console.log(error);
            } finally {
                deleteClient.deleteSpinner.style.display = 'none'
            }
        });
    }

    clientDelete.addEventListener('click', async () => {
        try {
            deleteSpinner.style.display = 'block';
            clientDelete.classList.add('action-wait');
            const client = await getClient(data.id);
            document.body.append(deleteClient.deleteModal);
            deleteById(client);
        }catch (error) {
            console.log(error);
        } finally {
            deleteSpinner.style.display = 'none';
            clientDelete.classList.remove('action-wait');
        }
    });

    clientEdit.addEventListener('click', async () => {
        try {
            editSpinner.style.display = 'block';
            clientEdit.classList.add('action-wait');
            const client = await getClient(data.id);
            const editClient = editClientModal(client);
            document.body.append(editClient.editModal);
        } catch (error) {
            console.log(error);
        } finally {
            editSpinner.style.display = 'none'
            clientEdit.classList.remove('action-wait');
        }
    })
 
    deleteSpinner.innerHTML = svgSpinner;
    editSpinner.innerHTML = svgSpinner;
    clientId.textContent = data.id;
    clientName.textContent = data.name;
    clientSurname.textContent = data.surname;
    clientLastName.textContent = data.lastName;
    clientEdit.textContent = 'Изменить';
    clientDelete.textContent = 'Удалить';
    createDate.textContent = formatDate(data.createdAt);
    createdTime.textContent = formatTime(data.createdAt);
    changedDate.textContent = formatDate(data.updatedAt);
    changedTime.textContent = formatTime(data.updatedAt);
    clientIdTd.append(clientId);
    clientFullName.append( clientSurname, clientName, clientLastName);
    clientCreated.append(createDate, createdTime);
    clientChanged.append(changedDate, changedTime);
    clientDelete.append(deleteSpinner);
    clientEdit.append(editSpinner);
    clientContacts.append(seeMoreContact);
    clientActions.append(clientEdit, clientDelete);
    clientTr.append(
        clientIdTd,
        clientFullName,
        clientCreated,
        clientChanged,
        clientContacts,
        clientActions
    );
    return clientTr;
}