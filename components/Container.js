import Footer from "./Footer";
export default ({ children }) => {
  return (
    <div className="container">
      {children}
      <style jsx>{`
        .container {
          margin: 0 auto;
          position: relative;
        }

        @media screen and (min-width: 1024px) {
          .container {
            max-width: 960px;
            width: 960px;
          }
          .container.is-fluid {
            margin-left: 32px;
            margin-right: 32px;
            max-width: none;
            width: auto;
          }
        }

        @media screen and (max-width: 1215px) {
          .container.is-widescreen {
            max-width: 1152px;
            width: auto;
          }
        }

        @media screen and (max-width: 1407px) {
          .container.is-fullhd {
            max-width: 1344px;
            width: auto;
          }
        }

        @media screen and (min-width: 1216px) {
          .container {
            max-width: 1152px;
            width: 1152px;
          }
        }

        @media screen and (min-width: 1408px) {
          .container {
            max-width: 1344px;
            width: 1344px;
          }
        }
      `}</style>
    </div>
  );
};
