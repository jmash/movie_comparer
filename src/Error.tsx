import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    
    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>An error has been encountered!</h1>
                <h2>{error.status}</h2>
                <p>{error.statusText}</p>
                {error.data?.message && <p>{error.data.message}</p>}
            </div>
        );
    } else {
        return <div>An unexpected and unknown error has been encountered!</div>
    }
}