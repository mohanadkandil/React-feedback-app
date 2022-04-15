import { Link } from "react-router-dom"

function Header() {

    return (
        <header className="header">
            <div className='container'>
                <Link to='/'>
                    <h1 style={{ color: "#fff" }}>React Feedback UI </h1>
                </Link>
            </div>
        </header>
    )
}

export default Header