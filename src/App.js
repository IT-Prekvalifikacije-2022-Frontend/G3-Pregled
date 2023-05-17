import { NavLink, Outlet } from "react-router-dom";
import './App.css';

function App() {
  return <>
    <div className="app_container">
      <h1>Pregled Knjiga :) </h1>
      <aside className="sidenav_container">
        <ul className="sidenav_list">
          <li className="sidenav_list_item"><NavLink className="sidenav_navlink" to="books">Knjige</NavLink></li>
          <li className="sidenav_list_item"><NavLink className="sidenav_navlink" to="genres">Žanrovi</NavLink></li>
          <li className="sidenav_list_item"><NavLink className="sidenav_navlink" to="authors">Autori</NavLink></li>
        </ul>
      </aside>
      <div className="app_content">
        <Outlet/>
      </div>
    </div>
  </>;
}

export default App;
