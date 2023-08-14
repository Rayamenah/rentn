import React from "react";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import { useRouter } from "next/router";
const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const excludeFooter = router.pathname === '/Authentication'; // Specify the route where you want to exclude the footer
    return (
        <section className="flex flex-col overflow-none font-montserrat">
            <Navbar />
            <main>
                {children}
            </main>
            {!excludeFooter && <Footer />}
        </section>
    );
};

export default Layout;
