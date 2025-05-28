"use client";
import React, { useEffect, useState } from "react";
import SongCard from "@/components/SongCard/SongCard";

export default function Analysis() {
    const [currentTerm, setCurrentTerm] = useState("long_term");
    const [songList, setSongList] = useState();
    const [artistList, setArtistList] = useState();
    const [genreList, setGenreList] = useState<Map<string, number>>();

    useEffect(() => {
        const t = localStorage.getItem("token");
        const songs = localStorage.getItem("songs-long");
        const artists = localStorage.getItem("artists-long");

        if (songs && artists) {
            setSongList(JSON.parse(songs));
            setArtistList(JSON.parse(artists));

            const genres = new Map();

            JSON.parse(artists).forEach((element) => {
                element.genres.forEach((g) => {
                    genres.set(g, (genres.get(g) ?? 0) + 1);
                });
            });

            setGenreList(genres);
            return;
        }

        if (t) {
            const fetchAndLogSongs = async () => {
                try {
                    const songData = await fetchData(t, currentTerm, "tracks");
                    const artistData = await fetchData(
                        t,
                        currentTerm,
                        "artists"
                    );
                    console.log(data);
                    localStorage.setItem(
                        "songs-long",
                        JSON.stringify(songData.items)
                    );
                    setSongList(songData.items);
                    localStorage.setItem(
                        "artists-long",
                        JSON.stringify(artistData.items)
                    );
                    setArtistList(artistData.items);
                } catch (error) {
                    console.error("Failed to fetch songs:", error);
                }
            };
            fetchAndLogSongs();
        }
    }, []);

    async function fetchData(
        token: string,
        term: string,
        data: string
    ): Promise<any> {
        const result = await fetch(
            `https://api.spotify.com/v1/me/top/${data}?limit=30&time_range=${term}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return await result.json();
    }

    function getPopularity(inputList) {
        let avg = 0;
        let total = 0;
        inputList.forEach((x) => {
            total += x.popularity;
        });
        avg = Math.round(total / inputList.length);
        return avg;
    }

    function changeTerm(term: string) {
        setCurrentTerm(term);
        const t = localStorage.getItem("token");
        let songMemo, artistMemo;
        let songKeyName, artistKeyName;

        if (term === "short_term") {
            songKeyName = "songs-short";
            artistKeyName = "artists-short";
            songMemo = localStorage.getItem("songs-short");
            artistMemo = localStorage.getItem("artists-short");
        } else if (term === "medium_term") {
            songKeyName = "songs-medium";
            artistKeyName = "artists-medium";
            songMemo = localStorage.getItem("songs-medium");
            artistMemo = localStorage.getItem("artists-medium");
        } else {
            songKeyName = "songs-long";
            artistKeyName = "artists-long";
            songMemo = localStorage.getItem("songs-long");
            artistMemo = localStorage.getItem("artists-long");
        }

        if (songMemo && artistMemo) {
            setSongList(JSON.parse(songMemo));
            setArtistList(JSON.parse(artistMemo));

            const genres = new Map();

            JSON.parse(artistMemo).forEach((element) => {
                element.genres.forEach((g) => {
                    genres.set(g, (genres.get(g) ?? 0) + 1);
                });
            });

            setGenreList(genres);
            return;
        }

        if (t) {
            const fetchAndLogSongs = async () => {
                try {
                    const songData = await fetchData(t, currentTerm, "tracks");
                    const artistData = await fetchData(
                        t,
                        currentTerm,
                        "artists"
                    );

                    localStorage.setItem(
                        songKeyName,
                        JSON.stringify(songData.items)
                    );
                    setSongList(songData.items);

                    localStorage.setItem(
                        artistKeyName,
                        JSON.stringify(artistData.items)
                    );
                    setArtistList(artistData.items);
                } catch (error) {
                    console.error("Failed to fetch songs:", error);
                }
            };
            fetchAndLogSongs();
        }
    }

    return (
        <div className="max-w-4xl mx-auto items-center justify-items-center  p-2 sm:p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
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
                {songList && artistList && (
                    <div className="flex flex-row justify-around w-full text-center">
                        <div>
                            <h1>Average Song Popularity</h1>
                            <h2 className="font-bold">
                                {getPopularity(songList)}
                            </h2>
                        </div>
                        <div>
                            <h1>Average Artist Popularity</h1>
                            <h2 className="font-bold">
                                {getPopularity(artistList)}
                            </h2>
                        </div>
                    </div>
                )}

                <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 ">
                    {genreList &&
                        [...genreList].map((g) => {
                            return (
                                <li
                                    key={g[0]}
                                    className="flex flex-row gap-0 sm:gap-4 justify-between items-center px-4 py-2 border rounded m-2"
                                >
                                    <p>{g[0]} :</p>
                                    <p className="font-bold">{g[1]}</p>
                                </li>
                            );
                        })}
                </ul>
            </main>
        </div>
    );
}
