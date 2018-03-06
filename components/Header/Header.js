import Link from "next/link";
import Head from "next/head";

const links = [
  { href: "/", label: "▲ WWWID" },
  { href: "/", label: "Feed" },
  { href: "/about", label: "About" }
];

export default () => (
  <div>
    <nav>
      <header>
        {links.map((link, i) => (
          <span key={`nav-link-${i}`}>
            <Link href={link.href}>
              <a>{link.label}</a>
            </Link>
          </span>
        ))}
      </header>
      <style jsx>{`
        nav {
          text-align: center;
          background-color: black;
          color: white;
          padding: 12px;
          position: fixed;
          z-index: 1000;
          top: 0;
          left: 0;
          right: 0;
        }
        header {
          display: flex;
          padding: 0;
          margin: 0;
        }
        span {
          padding: 6px 8px;
        }
        a {
          color: white;
          text-decoration: none;
          font-size: 16px;
        }
        @media (max-width: 600px) {
          header {
            justify-content: none;
          }
        }
      `}</style>
    </nav>
  </div>
);
