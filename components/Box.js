export default ({ children }) => {
  return (
    <div className="box">
      {children}
      <style jsx>{`
        .box {
          background-color: white;
          border-radius: 0px;
          -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
            0 0 0 1px rgba(10, 10, 10, 0.1);
          box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
            0 0 0 1px rgba(10, 10, 10, 0.1);
          color: #4a4a4a;
          display: block;
          padding: 1.25rem;
          margin-bottom:1.5rem;
        }

        .box:not(:last-child) {
          margin-bottom: 1.5rem;
        }

        a.box:hover,
        a.box:focus {
          -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px #3273dc;
          box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px #3273dc;
        }

        a.box:active {
          -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2),
            0 0 0 1px #3273dc;
          box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2), 0 0 0 1px #3273dc;
        }
      `}</style>
    </div>
  );
};
