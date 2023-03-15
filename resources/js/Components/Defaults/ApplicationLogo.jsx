import React from 'react';
import logo from '@/Assets/logo.png';

export default function ApplicationLogo({ className }) {
    return (
        <img src={logo} alt='logo' className={className}/>
    );
}
