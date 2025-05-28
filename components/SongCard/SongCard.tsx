/* eslint-disable @next/next/no-img-element */
interface cardProps {
    song: string;
    artist: string;
    img: string;
    popularity: number;
}
export default function SongCard({ song, artist, img, popularity }: cardProps) {
    let pop;
    if (popularity <= 50) {
        pop = Math.round(popularity * 0.75);
    } else {
        pop = Math.round(popularity * 1.25);
    }
    return (
        <div className="flex flex-col p-2 sm:p-8 items-center text-center">
            <img
                src={img}
                width={160}
                height={160}
                alt=""
                className="mb-4 object-cover w-40 h-40 border-4"
                style={{
                    borderColor: `rgba(0, 0, 0, ${pop / 100})`,
                }}
            />
            <h1 className="font-bold text-lg">{song}</h1>
            <h2>{artist}</h2>
        </div>
    );
}
