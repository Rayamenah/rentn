import React from "react";
import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";
import { useRouter } from "next/router";
const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const excludeFooter = router.pathname === '/auth' || router.pathname === '/listing'; // Specify the route where you want to exclude the footer
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
