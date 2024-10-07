// src/components/side-nav.js
"use client";  // Add this directive at the top

import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="sidenav">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/users">users</Link>
        </li>
        <li>
          <Link href="/services">Services</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
