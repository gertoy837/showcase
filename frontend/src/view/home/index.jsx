import { useEffect, useState } from "react";
import api from "../../services/api";
import Card from "../../components/Card";

export default function Home() {
  const [makanan, setMakanan] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await api.get("/makan");
      setTimeout(() => {
        setMakanan(response.data.data);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("There was an error fetching the makanan!", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <h1 className="fw-bold text-center mb-5 text-white">Daftar Makanan</h1>
      {loading ? (
        <p className="fw-bold text-center fs-5 text-white">Loading...</p>
      ) : (
        makanan.length > 0 &&
        makanan.map((item) => <Card key={item.id} item={item} />)
      )}
    </div>
  );
}
