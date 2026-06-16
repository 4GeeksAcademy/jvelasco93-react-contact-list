export const contactsMapper = {
    toCreateRequest(formFields) {
        const nameValue = formFields.name?.trim();
        return {
            name: nameValue && nameValue !== "" ? nameValue : "Sin Nombre",
            phone: formFields.phone?.trim() || "",
            email: formFields.email?.trim() || "",
            address: formFields.address?.trim() || ""
        };
    },

    // NOTA PARA EL COMPONENTE (UPDATE): 
    // Para evitar borrar datos por error, el formulario de edición SIEMPRE debe 
    // inicializarse cargando los datos actuales del contacto. 
    // De esta forma, un string vacío ("") significará que el usuario realmente desea borrar ese campo.
    toUpdateRequest(formFields) {
        const payload = {};

        if (formFields.name !== undefined) payload.name = formFields.name.trim();
        if (formFields.phone !== undefined) payload.phone = formFields.phone.trim();
        if (formFields.email !== undefined) payload.email = formFields.email.trim();
        if (formFields.address !== undefined) payload.address = formFields.address.trim();

        return payload;
    },

    fromApi(apiData) {
        return {
            id: apiData.id,
            name: apiData.name || "",
            phone: apiData.phone || "",
            email: apiData.email || "",
            address: apiData.address || ""
        };
    }
};