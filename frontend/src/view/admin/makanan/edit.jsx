import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarMenu from "../../../components/SidebarMenu";
import Cookies from "js-cookie";
import api from "../../../services/api";

const token = Cookies.get("token");

export default function MakananEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [validation, setValidation] = useState([]);

  const fetchDetailUser = async () => {
    api.defaults.headers.common["Authorization"] = token;

    await api.get(`/admin/makanan/${id}`).then((response) => {
      setName(response.data.data.name);
      setDeskripsi(response.data.data.deskripsi);
    });
  };

  useEffect(() => {
    fetchDetailUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateMakanan = async (e) => {
    e.preventDefault();
    api.defaults.headers.common["Authorization"] = token;
    await api
      .put(`/admin/makanan/${id}`, {
        name: name,
        deskripsi: deskripsi,
      })
      .then(() => {
        navigate("/makanan");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header">Tambah Makanan</div>
            <div className="card-body">
              {validation.errors && (
                <div className="alert alert-danger mt-2 pb-0">
                  {validation.errors.map((error, index) => (
                    <p key={index}>
                      {error.path} : {error.msg}
                    </p>
                  ))}
                </div>
              )}
              <form onSubmit={updateMakanan}>
                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Nama Makanan</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Nama Makanan"
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Deskripsi</label>
                  <textarea
                    name="deskripsi"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="form-control"
                    placeholder="Deskripsi"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-sm btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
