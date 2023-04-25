import { Link } from "react-router-dom";
import "./Navbar.css"

export default function Navbar () { 
  return (
    <nav className="Navbar Nav">
      <Link className="Navbar Link Shorter" to="/">Shorter</Link>
      <Link className="Navbar Link Info" to="/info">Info</Link>
    </nav>
  )
}