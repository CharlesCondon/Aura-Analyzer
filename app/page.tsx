"use client";
import React, { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Root() {
    const clientId = `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`;
    const router = useRouter();
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            const fetchToken = async () => {
                const accessToken = await getAccessToken(clientId, code);
                console.log("access token: " + accessToken);
                localStorage.setItem("token", accessToken);
                router.push("/home");
                return accessToken;
            };
            fetchToken();
        }
    });

    async function authorizeUser() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (!code) {
            redirectToAuthCodeFlow(clientId);
        } else {
            const accessToken = await getAccessToken(clientId, code);
            localStorage.setItem("token", accessToken);
            redirect("/home");
        }
    }

    async function redirectToAuthCodeFlow(clientId: string) {
        const verifier = generateCodeVerifier(128);
        const challenge = await generateCodeChallenge(verifier);

        localStorage.setItem("verifier", verifier);

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", "http://127.0.0.1:3000");
        params.append(
            "scope",
            "user-read-private user-read-email user-library-read user-top-read"
        );
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);

        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }

    function generateCodeVerifier(length: number) {
        let text = "";
        const possible =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; i++) {
            text += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );
        }
        return text;
    }

    async function generateCodeChallenge(codeVerifier: string) {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await window.crypto.subtle.digest("SHA-256", data);
        return btoa(
            String.fromCharCode.apply(null, [...new Uint8Array(digest)])
        )
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }

    async function getAccessToken(clientId: string, code: string) {
        const verifier = localStorage.getItem("verifier");

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "http://127.0.0.1:3000");
        params.append("code_verifier", verifier!);

        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params,
        });

        const { access_token } = await result.json();
        console.log("access token: " + access_token);
        return access_token;
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div className="grid gap-4 text-center">
                    <h1>Taste Test</h1>
                    <h3>
                        Your Music, Your Taste, Your Insights: <br></br>Dive
                        into Your Music DNA with Personalized Analytics!
                    </h3>
                    <button onClick={authorizeUser}>LOGIN</button>
                </div>
            </main>
        </div>
    );
}
