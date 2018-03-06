export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <p className="has-text-white">
            <strong className="has-text-white">WWWID PWA by </strong> 
            <a className="has-text-white" href="http://twitter.com/nirzaq">
              {" "}
              @nirzaq
            </a>.
          </p>
        </div>
      </div>
      <style jsx>{`
        .has-text-white {
          color: white !important;
        }
        .footer {
          background-color: #000000;
          padding: 2rem 1.5rem 2rem;
        }
        .footer > p {
          color: "white";
        }
      `}</style>
    </footer>
  );
}
