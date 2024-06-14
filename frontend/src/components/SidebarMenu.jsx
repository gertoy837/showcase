import { Link } from "react-router-dom";

export default function SidebarMenu() {

  return (
    <div className="card border-0 rounded shadow-sm">
      <div className="card-header">MAIN MENU</div>
      <div className="card-body">
        <div className="list-group">
          <Link
            to="/dashboard"
            className="list-group-item list-group-item-action"
          >
            Dashboard
          </Link>
          <Link
            to="/makanan"
            className="list-group-item list-group-item-action"
          >
            Makanan
          </Link>
        </div>
      </div>
    </div>
  );
}
