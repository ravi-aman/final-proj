import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-700">
        <main className="">{children}</main>
      </body>
    </html>
  );
}
