import Navbar from "@/components/Navbar/Navbar";

export default function AnalysisLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex flex-col gap-5 min-h-screen">
            <Navbar activePage={"analysis"}></Navbar>
            {children}
        </main>
    );
}
