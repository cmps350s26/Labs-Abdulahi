import "./globals.css";
import NavBar from "@/app/components/NavBar.jsx";

export const metadata = {
    title: "MyFinance",
    description: "Personal Finance Platform"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <NavBar />
                {children}
            </body>
        </html>
    );
}
