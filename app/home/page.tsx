import React from "react";

export default function Home() {
    return (
        <div className="text-center p-8 pb-20">
            <h1>Welcome to Taste Test</h1>
            <p>Discover your sound and uncover the story of your music</p>
            <div className="flex gap-4 text-left pt-8">
                <div className="infoFeature">
                    <h3>Top Tracks</h3>
                    <hr></hr>
                    <p className="infoP">
                        Find out which 20 tracks you&apos;ve replayed the most,
                        revealing your absolute favorite tracks.
                    </p>
                    <p className="infoP">
                        Take advantage of the timeline feature to see your
                        favorites in a chosen time:
                    </p>
                    <ul className="infoList">
                        <li>Short-Term: 4 weeks</li>
                        <li>Medium-Term: 6 months</li>
                        <li>Long-Term: 1 year</li>
                    </ul>
                    <p className="infoP">
                        As you click through the timeframes, songs that repeat
                        will remain while new favorites will flip down.
                    </p>
                </div>
                <div className="infoFeature">
                    <h3>Top Artists</h3>
                    <hr></hr>
                    <p className="infoP">
                        Find out which artists you&apos;ve replayed the most,
                        revealing your absolute favorite artists.
                    </p>
                    <p className="infoP">
                        Take advantage of the timeline feature to see your
                        favorites in a chosen time:
                    </p>
                    <ul className="infoList">
                        <li>Short-Term: 4 weeks</li>
                        <li>Medium-Term: 6 months</li>
                        <li>Long-Term: 1 year</li>
                    </ul>
                    <p className="infoP">
                        As you click through the timeframes, artists that repeat
                        will remain while new favorites will flip down.
                    </p>
                </div>
                <div className="infoFeature">
                    <h3>Analytics</h3>
                    <hr></hr>
                    <p className="infoP">
                        Dive into the underlying details of your music taste
                        with the Analytics tab.
                    </p>
                    <p className="infoP">
                        Using the timeline feature, get a breakdown of what
                        you&apos;ve been listening to. Get analytics such as:
                    </p>
                    <ul className="infoList">
                        <li>Danceability</li>
                        <li>Energy</li>
                        <li>Valence</li>
                        <li>Popularity</li>
                    </ul>
                    <p className="infoP">
                        Additionally, get a unique color calculated by the
                        metadata of your favorite songs.
                    </p>
                </div>
            </div>
        </div>
    );
}
