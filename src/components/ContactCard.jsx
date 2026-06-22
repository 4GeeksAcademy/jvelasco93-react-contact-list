import avatar from "../assets/img/rigo-baby.jpg";
import {Link} from "react-router-dom";

export function ContactCard({contact, onDelete}) {
    return (
        <li className="list-group-item p-3 p-lg-4 rounded border shadow-sm">
            <div className="row text-center text-lg-start">
                <div className="col-12 col-lg-3 d-flex justify-content-center align-items-center mb-3 mb-lg-0">
                    <img
                        src={avatar}
                        className="img-fluid rounded-circle object-fit-cover"
                        alt={`Foto de ${contact.name}`}
                        width="150"
                        height="150"
                    />
                </div>

                <div className="col-12 col-lg-6 d-flex flex-column justify-content-center mb-3 mb-lg-0">
                    <h2 className="h5 mb-2">{contact.name || "No Name"}</h2>
                    <div className="mb-0">
                        <div
                            className="d-flex align-items-center gap-2 mb-1 justify-content-center justify-content-lg-start">
                            <i className="fa-solid fa-location-dot text-secondary" aria-hidden="true"></i>
                            <span className={contact.address?.trim() ? "" : "text-muted"}>
                                {contact.address?.trim() || "No address"}
                            </span>
                        </div>

                        <div
                            className="d-flex align-items-center gap-2 mb-1 justify-content-center justify-content-lg-start">
                            <i className="fa-solid fa-envelope text-secondary" aria-hidden="true"></i>
                            <span className={contact.email?.trim() ? "" : "text-muted"}>
                                {contact.email?.trim() || "No email"}
                            </span>
                        </div>

                        <div
                            className="d-flex align-items-center gap-2 justify-content-center justify-content-lg-start">
                            <i className="fa-solid fa-phone text-secondary" aria-hidden="true"></i>
                            <span className={contact.phone?.trim() ? "" : "text-muted"}>
                                {contact.phone?.trim() || "No phone"}
                            </span>
                        </div>
                    </div>
                </div>

                <div
                    className="col-12 col-lg-3 d-flex align-items-center justify-content-center justify-content-lg-end gap-3">
                    <Link to={`/edit-contact/${contact.id}`} className="btn btn-primary">Edit</Link>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onDelete(contact.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </li>
    );
}