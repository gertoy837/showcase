import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function Detail() {
  const { id } = useParams();
  const [makan, setMakan] = useState("");

  const fetchData = async () => {
    try {
      const response = await api.get(`/makan/${id}`);
      console.log(response);
      setMakan(response.data.data);
    } catch (error) {
      console.error("There was an error fetching the makan!", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="">
      <div className="card">
        <img
          src="https://picsum.photos/1200/200"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h1 className="fw-bold">{makan.name}</h1>
          <p className="">{makan.deskripsi}</p>
          <hr />
        </div>
      </div>
    </div>
  );
}
