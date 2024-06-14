import { useEffect, useState } from "react";
import SidebarMenu from "../../../components/SidebarMenu";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../../services/api";
import Pagination from "../../../components/Pagination";
import { FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";

export default function MakananIndex() {
  const [makanan, setMakanan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDataUsers = async (page = 1) => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.common["Authorization"] = token;

      try {
        const response = await api.get(`/admin/makanan?page=${page}&limit=10`);
        setMakanan(response.data.data);
        setCurrentPage(response.data.meta.page);
        setTotalPages(response.data.meta.totalPages);
      } catch (error) {
        console.error("There was an error fetching the makanan!", error);
      }
    } else {
      console.error("Token is not available!");
    }
  };

  useEffect(() => {
    fetchDataUsers(currentPage);
  }, [currentPage]);

  const deleteUsers = async (id) => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.common["Authorization"] = token;

      try {
        await api.delete(`/admin/makanan/${id}`);
        fetchDataUsers(currentPage);
      } catch (error) {
        console.error("There was an error deleting the item!", error);
      }
    } else {
      console.error("Token is not available!");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>Makanan</span>
              <Link
                to="/makanan/create"
                className="btn btn-sm btn-success rounded shadow-sm border-0"
              >
                <FaPlus /> tambah
              </Link>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <th scope="col" className="text-center">
                      #
                    </th>
                    <th scope="col">Nama</th>
                    <th scope="col">Deskripsi</th>
                    <th scope="col" style={{ width: "17%" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {makanan.length > 0 ? (
                    makanan.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                          {item.deskripsi.length > 50
                            ? item.deskripsi.slice(0, 50) + "..."
                            : item.deskripsi}
                        </td>
                        <td className="text-center">
                          <Link
                            to={`/makanan/edit/${item.id}`}
                            className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                          >
                            <FaPencilAlt />
                          </Link>
                          <button
                            onClick={() => deleteUsers(item.id)}
                            className="btn btn-sm btn-danger rounded-sm shadow border-0"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <div className="alert alert-danger mb-0">
                          Data Belum Tersedia!
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="card-footer">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
