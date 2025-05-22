"use client";
import React, { useEffect, useState } from "react";

export default function Analysis() {
    const [songList, setSongList] = useState();
    const [popularity, setPopularity] = useState<number>();
    const [data, setData] = useState();

    useEffect(() => {
        const t = localStorage.getItem("token");
        if (t) {
            const fetchAndLogSongs = async () => {
                try {
                    const data = await fetchSongs(t);
                    const pop = data.items.map((x) => {
                        return x.popularity;
                    });
                    const popAvg = Math.round(
                        pop.reduce((a, b) => a + b) / pop.length
                    );
                    setPopularity(popAvg);

                    const temp = data.items.map((e) => {
                        return e.id;
                    });

                    setSongList(data.items);
                } catch (error) {
                    console.error("Failed to fetch songs:", error);
                }
            };
            fetchAndLogSongs();
        }
    }, []);

    async function fetchSongs(token: string): Promise<any> {
        const result = await fetch(
            "https://api.spotify.com/v1/me/top/tracks?time_range=long_term",
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return await result.json();
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"></main>
        </div>
    );
}
