import { apiGateway } from "./apiGateway";
import { contactsMapper } from "./contactsMapper";

const AGENDA_SLUG = "jvelasco"


export const contactsService = {
    async getContacts() {
        const data = await apiGateway.get(`/agendas/${AGENDA_SLUG}/contacts`)
        const rawContacts = data.contacts || [];
        return rawContacts.map(contact => contactsMapper.fromApi(contact));
    },


    async createContact(contactData = {}) {
        const createPayload = contactsMapper.toCreateRequest(contactData)
        const rawResponse = await apiGateway.post(`/agendas/${AGENDA_SLUG}/contacts`, createPayload)
        return contactsMapper.fromApi(rawResponse)
    },

    async updateContact(contactId, formFields) {
        const updatePayload = contactsMapper.toUpdateRequest(formFields)
        const rawResponse = await apiGateway.put(`/agendas/${AGENDA_SLUG}/contacts/${contactId}`, updatePayload)
        return contactsMapper.fromApi(rawResponse)
    },

    // La api devuelve error 500 al intentar borrar una tarea que no existe, pero con usuario que existe
    async deleteContact(contactId) {
        return await apiGateway.delete(`/agendas/${AGENDA_SLUG}/contacts/${contactId}`)
    }
};

console.log(contactsService.getContacts())