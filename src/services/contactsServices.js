import { apiGateway } from "./apiGateway.js";
import { contactsMapper } from "./contactsMapper.js";

const AGENDA_SLUG = "jvelasco";
async function ensureAgenda() {
    try {
        await apiGateway.post(`/agendas/${AGENDA_SLUG}`, {
            slug: AGENDA_SLUG
        });
    } catch (error) {
        if (isAgendaAlreadyExistsError(error)) return;
        throw error;
    }
}


function isAgendaAlreadyExistsError(error) {
    return (
        error.status === 400 &&
        error.detail?.includes("already exists")
    );
}

export const contactsService = {
    async getContacts() {
        await ensureAgenda();

        const data = await apiGateway.get(
            `/agendas/${AGENDA_SLUG}/contacts`
        );

        const rawContacts = data.contacts || [];

        return rawContacts.map(contact =>
            contactsMapper.fromApi(contact)
        );
    },

    async createContact(contactData = {}) {
        const payload = contactsMapper.toCreateRequest(contactData);

        const res = await apiGateway.post(
            `/agendas/${AGENDA_SLUG}/contacts`,
            payload
        );

        return contactsMapper.fromApi(res);
    },

    async updateContact(contactId, formFields) {
        const payload = contactsMapper.toUpdateRequest(formFields);

        const res = await apiGateway.put(
            `/agendas/${AGENDA_SLUG}/contacts/${contactId}`,
            payload
        );

        return contactsMapper.fromApi(res);
    },

    async deleteContact(contactId) {
        await apiGateway.delete(
            `/agendas/${AGENDA_SLUG}/contacts/${contactId}`
        );
    }
};