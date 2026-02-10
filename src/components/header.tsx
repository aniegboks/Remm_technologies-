import React from 'react'
import { createClient } from "@prismicio/client";
import { repositoryName } from '@/prismicio';
import Container from './ui/container';
import Nav from './nav';


const Header = async () => {
    const client = createClient(repositoryName);
    const settings = await client.getSingle("settings");
    return (
        <header className="bg-white z-50 fixed w-full top-0">
            <Container>
                <Nav settings={settings} />
            </Container>
        </header>
    );
};

export default Header;
