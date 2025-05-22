export default function Home() {
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div className="grid gap-4 text-center">
                    <h1>Taste Test</h1>
                    <h3>
                        Your Music, Your Taste, Your Insights: <br></br>Dive
                        into Your Music DNA with Personalized Analytics!
                    </h3>
                    <a
                        className="border-2 rounded m-auto px-6 py-2"
                        href={`${AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}&scope=user-top-read&response_type=${RESPONSE_TYPE}`}
                    >
                        LOGIN
                    </a>
                </div>
            </main>
        </div>
    );
}
