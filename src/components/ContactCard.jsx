import avatar from "../assets/img/rigo-baby.jpg";

export function ContactCard({contact, onDelete}) {
    return (
        <li className="list-group-item p-3 p-lg-4 rounded border shadow-sm">
            <div className="row text-center text-lg-start">
                <div className="col-12 col-lg-3 d-flex justify-content-center align-items-center mb-3 mb-lg-0">
                    <img
                        src={avatar || "https://placehold.co/600x400"}
                        className="img-fluid rounded-circle object-fit-cover"
                        alt={`Foto de ${contact.name}`}
                        width="150"
                        height="150"
                    />
                </div>

                <div className="col-12 col-lg-6 d-flex flex-column justify-content-center mb-3 mb-lg-0">
                    <h2 className="h5 mb-2">{contact.name}</h2>
                    <div
                        className="mb-0">
                        <p className="mb-1">{contact.address}</p>
                        <p className="mb-1">{contact.email}</p>
                        <p className="mb-0">{contact.phone}</p>
                    </div>
                </div>

                <div
                    className="col-12 col-lg-3 d-flex align-items-center justify-content-center justify-content-lg-end gap-3">
                    <button type="button" className="btn btn-primary">
                        Edit
                    </button>

                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => void onDelete(contact.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </li>
    );
}