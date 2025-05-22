"use client";
import React, { useEffect, useState } from "react";

export default function Artists() {
    const [artistList, setArtistList] = useState();

    useEffect(() => {
        const t = localStorage.getItem("token");
        if (t) {
            const fetchAndLogSongs = async () => {
                try {
                    const data = await fetchSongs(t);
                    console.log(data);
                    setArtistList(data.items);
                } catch (error) {
                    console.error("Failed to fetch songs:", error);
                }
            };
            fetchAndLogSongs();
        }
    }, []);

    async function fetchSongs(token: string): Promise<any> {
        const result = await fetch(
            "https://api.spotify.com/v1/me/top/artists?time_range=long_term",
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return await result.json();
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <ul>
                    {artistList &&
                        artistList.map((x) => {
                            return <li key={x.name}>{x.name}</li>;
                        })}
                </ul>
            </main>
        </div>
    );
}
