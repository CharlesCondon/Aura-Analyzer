"use client";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import React, { useEffect, useState } from "react";

export default function Artists() {
    const [currentTerm, setCurrentTerm] = useState("long_term");
    const [artistList, setArtistList] = useState();

    useEffect(() => {
        const t = localStorage.getItem("token");
        const memo = localStorage.getItem("artists-long");

        if (memo) {
            setArtistList(JSON.parse(memo));
            return;
        }

        if (t) {
            const fetchAndLogSongs = async () => {
                try {
                    const data = await fetchSongs(t);
                    console.log(data);
                    localStorage.setItem(
                        "artists-long",
                        JSON.stringify(data.items)
                    );
                    setArtistList(data.items);
                } catch (error) {
                    console.error("Failed to fetch artists:", error);
                }
            };
            fetchAndLogSongs();
        }
    }, []);

    async function fetchSongs(token: string, term: string): Promise<any> {
        const result = await fetch(
            `https://api.spotify.com/v1/me/top/artists?limit=28&time_range=${term}`,
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
            keyName = "artists-short";
            memo = localStorage.getItem("artists-short");
        } else if (term === "medium_term") {
            keyName = "artists-medium";
            memo = localStorage.getItem("artists-medium");
        } else {
            keyName = "artists-long";
            memo = localStorage.getItem("artists-long");
        }

        if (memo) {
            setArtistList(JSON.parse(memo));
            return;
        }

        if (t) {
            const fetchAndLogSongs = async () => {
                try {
                    const data = await fetchSongs(t, currentTerm);
                    console.log(data);
                    localStorage.setItem(keyName, JSON.stringify(data.items));
                    setArtistList(data.items);
                } catch (error) {
                    console.error("Failed to fetch songs:", error);
                }
            };
            fetchAndLogSongs();
        }
    }

    return (
        <div className="max-w-4xl m-auto items-center justify-items-center  p-2 sm:p-8 pb-20 gap-16  font-[family-name:var(--font-geist-sans)]">
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
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ">
                    {artistList &&
                        artistList.map((x) => {
                            return (
                                <li key={x.name}>
                                    <ArtistCard
                                        artist={x.name}
                                        img={x.images[0].url}
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
