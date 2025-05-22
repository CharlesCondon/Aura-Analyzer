import Navbar from "@/components/Navbar/Navbar";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex flex-col gap-5 min-h-screen">
            <Navbar activePage={"home"}></Navbar>
            {children}
        </main>
    );
}
