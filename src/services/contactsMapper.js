const contactsMapper = {
    toCreateRequest(formFields) {
        return {
            name: formFields.name?.trim() || "",
            phone: formFields.phone?.trim() || "",
            email: formFields.email?.trim() || "",
            address: formFields.address?.trim() || ""
        };
    },

    toUpdateRequest(formFields) {
        return {
            name: formFields.name.trim(),
            phone: formFields.phone.trim(),
            email: formFields.email.trim(),
            address: formFields.address.trim()
        };
    },

    fromApi(apiData) {
        const defaultNameValue = "string"
        return {
            id: apiData.id,
            name: apiData.name === defaultNameValue ? "" : apiData.name,
            phone: apiData.phone || "",
            email: apiData.email || "",
            address: apiData.address || ""
        };
    }
};

export default contactsMapper;