import Link from "next/link";

export default ({ categories }) => {
  return (
    <div>
      <h2>Kategori</h2>
      <ul className="categories">
        {categories.map(item => {
          return (
            <li>
              <Link as={`/category/${item}`} href={`/category?cat=${item}`}>
                {item}
              </Link>
            </li>
          );
        })}
      </ul>
      <style jsx>
        {`
          .categories {
            padding: 0;
            list-style: none;
            list-style-image: none;
          }
          .categories > li {
            margin-right: 8px;
            margin-bottom: 8px;
            border: none;
            color: rgba(0, 0, 0, 0.68);
            background: rgba(0, 0, 0, 0.05);
            display: inline-block;
            position: relative;
            line-height: 1.4;
            padding: 5px 10px;
          }
        `}
      </style>
    </div>
  );
};
