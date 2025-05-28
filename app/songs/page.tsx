"use client";
import React, { useEffect, useState } from "react";
import SongCard from "@/components/SongCard/SongCard";

export default function Songs() {
    const [currentTerm, setCurrentTerm] = useState("long_term");
    const [songList, setSongList] = useState();

    useEffect(() => {
        const t = localStorage.getItem("token");
        const longMemo = localStorage.getItem("songs-long");

        if (longMemo) {
            setSongList(JSON.parse(longMemo));
            return;
        }

        if (t) {
            const fetchAndLogSongs = async () => {
                try {
                    const data = await fetchSongs(t, currentTerm);
                    console.log(data);
                    localStorage.setItem(
                        "songs-long",
                        JSON.stringify(data.items)
                    );
                    setSongList(data.items);
                } catch (error) {
                    console.error("Failed to fetch songs:", error);
                }
            };
            fetchAndLogSongs();
        }
    }, []);

    async function fetchSongs(token: string, term: string): Promise<any> {
        const result = await fetch(
            `https://api.spotify.com/v1/me/top/tracks?limit=30&time_range=${term}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return await result.json();
    }

    function changeTerm(term: string) {
        setCurrentTerm(term);
        const t = localStorage.getItem("token");
        let memo;
        let keyName;
        if (term === "short_term") {
            keyName = "songs-short";
            memo = localStorage.getItem("songs-short");
        } else if (term === "medium_term") {
            keyName = "songs-medium";
            memo = localStorage.getItem("songs-medium");
        } else {
            keyName = "songs-long";
            memo = localStorage.getItem("songs-long");
        }

        if (memo) {
            setSongList(JSON.parse(memo));
            return;
        }

        if (t) {
            const fetchAndLogSongs = async () => {
                try {
                    const data = await fetchSongs(t, currentTerm);
                    console.log(data);
                    localStorage.setItem(keyName, JSON.stringify(data.items));
                    setSongList(data.items);
                } catch (error) {
                    console.error("Failed to fetch songs:", error);
                }
            };
            fetchAndLogSongs();
        }
    }

    return (
        <div className="max-w-4xl m-auto items-center justify-items-center  p-2 sm:p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-row justify-around w-full p-4 gap-2">
                <button
                    onClick={() => changeTerm("short_term")}
                    disabled={currentTerm === "short_term"}
                    className={
                        currentTerm === "short_term"
                            ? "p-2 border rounded-md bg-gray-200 opacity-20"
                            : "p-2 border rounded-md cursor-pointer"
                    }
                >
                    Short Term
                </button>
                <button
                    onClick={() => changeTerm("medium_term")}
                    disabled={currentTerm === "medium_term"}
                    className={
                        currentTerm === "medium_term"
                            ? "p-2 border rounded-md bg-gray-200 opacity-20"
                            : "p-2 border rounded-md cursor-pointer"
                    }
                >
                    Medium Term
                </button>
                <button
                    onClick={() => changeTerm("long_term")}
                    disabled={currentTerm === "long_term"}
                    className={
                        currentTerm === "long_term"
                            ? "p-2 border rounded-md bg-gray-200 opacity-20"
                            : "p-2 border rounded-md cursor-pointer"
                    }
                >
                    Long Term
                </button>
            </div>
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <ul className="grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-3 ">
                    {songList &&
                        songList.map((x) => {
                            return (
                                <li key={x.name}>
                                    <SongCard
                                        song={x.name}
                                        artist={x.artists[0].name}
                                        img={x.album.images[0].url}
                                        popularity={x.popularity}
                                    />
                                </li>
                            );
                        })}
                </ul>
            </main>
        </div>
    );
}
