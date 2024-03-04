import React from "react";
import { Link } from "react-router-dom";
const AccessDenied: React.FC = () => {
    return (
        <div>
            <div>Brak dostępu...</div>
            <Link to="/">Wróć na stronę główną</Link>
        </div>
    )
}
export default AccessDenied;