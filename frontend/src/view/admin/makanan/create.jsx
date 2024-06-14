import { useNavigate } from "react-router-dom";
import SidebarMenu from "../../../components/SidebarMenu";
import Cookies from "js-cookie";
import { useState } from "react";
import api from "../../../services/api";

const token = Cookies.get("token");

export default function MakananCreate() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [validation, setValidation] = useState([]);

    const storeMakanan = async (e) => {
        e.preventDefault();
        api.defaults.headers.common['Authorization'] = token;
        await api.post('/admin/makanan', {
            name: name,
            deskripsi: deskripsi,
        })
        .then(() => {
            navigate('/makanan');
        })
        .catch(error => {
            setValidation(error.response);
        })
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-header">
                            Tambah Makanan
                        </div>
                        <div className="card-body">
                            {validation.errors && (
                                <div className="alert alert-danger mt-2 pb-0">
                                    {validation.errors.map((error, index) => (
                                        <p key={index}>{error.path} : {error.msg}</p>
                                    ))}
                                </div>
                            )}
                            <form onSubmit={storeMakanan}>
                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Nama Makanan</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Nama Makanan" />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Deskripsi</label>
                                    <textarea name="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="form-control" placeholder="Deskripsi" ></textarea>
                                </div>

                                <button type="submit" className="btn btn-sm btn-primary">SAVE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}