import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router'
import './Layout.css'

const LandingPageLayout: React.FC = () => {
    return (
        <div className="layout-container">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
            </div>
    )
}

export default LandingPageLayout