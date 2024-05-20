import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      <div className="container py-4 flex gap-4">
        <Sidebar />
        <section>{children}</section>
      </div>
    </main>
  );
}
