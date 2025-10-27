import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logos/logo_full_dark_750x200.png';

const Navbar: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);

	const handleClick = (): void => {
		setOpen(!open);
	};

	const closeMenu = (): void => {
		setOpen(false);
	};

	return (
		<nav className="navbar">
			<Link to="/" className="nav-logo">
				<div className="nav-logo-div">
					<div className="nav-logo-subDiv1">
						<img alt='logo' className='logo_image' src={logo} />
					</div>
					<div className="nav-logo-subDiv2 text3d">
						<div>Mahanaim Church of God</div>
						<div>Telford - UK</div>
					</div>

				</div>
			</Link>
			<div onClick={handleClick} className="nav-icon">
				{open ? <FiX /> : <FiMenu />}
			</div>

			<ul className={open ? 'nav-links active' : 'nav-links'}>
			<li className="nav-item">
					<Link to="/live" className="nav-link" onClick={closeMenu}>
						<div className='fb-live'>Live</div>
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/about" className="nav-link" onClick={closeMenu}>
						About Us
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/kidsandyouth" className="nav-link" onClick={closeMenu}>
						Kids and Youth
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/sermons" className="nav-link" onClick={closeMenu}>
					Sermons
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/gallery" className="nav-link" onClick={closeMenu}>
						Gallery
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/leadership" className="nav-link" onClick={closeMenu}>
						Our Leadership
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/contact" className="nav-link" onClick={closeMenu}>
						Contact Us
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;