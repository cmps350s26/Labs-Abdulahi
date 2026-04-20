"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ label = "Submit", pendingLabel = "Saving..." }) {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="btn btn--primary" disabled={pending}>
            {pending ? pendingLabel : label}
        </button>
    );
}
