import Link from "next/link";

interface NavbarProps {
    activePage: string;
}

export default function Navbar({ activePage }: NavbarProps) {
    return (
        <nav className="max-w-lg mx-auto flex flex-row items-center justify-between w-screen border-[var(--accent-light)] border-b">
            <Link href={"/home"} className="flex-1 flex justify-center p-4">
                Home
            </Link>
            <Link href={"/songs"} className="flex-1 flex justify-center p-4">
                Songs
            </Link>
            <Link href={"/artists"} className="flex-1 flex justify-center p-4">
                Artists
            </Link>
            {/* <Link href={"/messages"} className="flex-1 flex justify-center p-4">
                <Image src={dmImg} width={25} height={25} alt="Messages" />
            </Link> */}
            <Link href={"/analysis"} className="flex-1 flex justify-center p-4">
                Analysis
            </Link>
        </nav>
    );
}
