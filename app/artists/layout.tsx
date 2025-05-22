import Navbar from "@/components/Navbar/Navbar";

export default function ArtistsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex flex-col gap-5 min-h-screen">
            <Navbar activePage={"artists"}></Navbar>
            {children}
        </main>
    );
}
