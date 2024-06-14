/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Card({ item }) {
  return (
    <div className="col-md-3">
      <div className="card mb-4 border-dark" style={{ width: "18rem" }}>
        <img src="https://picsum.photos/200" className="card-img-top" alt="..." />
        <div className="card-body">
          <h3 className="fw-bold">{item.name}</h3>
          <p className="">
            {item.deskripsi > 50
              ? item.deskripsi
              : item.deskripsi.slice(0, 50) + "..."}
          </p>
          <hr />
          <Link to={`/detail/${item.id}`} className="btn me-3 border-dark" style={{backgroundColor: "#D9EDBF"}}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
