import React from "react";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import { useRouter } from "next/router";
const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const excludeFooter = router.pathname === '/Authentication' || router.pathname === '/CreateListing'; // Specify the route where you want to exclude the footer
    return (
        <section className="flex flex-col h-screen overflow-none font-montserrat">
            <Navbar />
            <main className='flex flex-col flex-grow'>
                {children}
            </main>
            {!excludeFooter && <Footer />}
        </section>
    );
};

export default Layout;
