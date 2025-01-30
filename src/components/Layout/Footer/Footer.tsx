import React from 'react';
import EiA from '../../../assets/images/Footer/EiA_logo.png';
import './styles.css';

const Footer = () => {
	return (
		<div className="footer">
			<div className="content">
				<div className="upper">
					<div className="icons">
						<a
							href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
							target="_blank"
							rel="noreferrer"
						>
							<i className="fab fa-creative-commons license-icons" />
						</a>
						<a
							href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
							target="_blank"
							rel="noreferrer"
						>
							<i className="fab fa-creative-commons-by license-icons" />
						</a>
						<a
							href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
							target="_blank"
							rel="noreferrer"
						>
							<i className="fab fa-creative-commons-nc license-icons" />
						</a>
						<a
							href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
							target="_blank"
							rel="noreferrer"
						>
							<i className="fab fa-creative-commons-sa license-icons" />
						</a>
					</div>
					<a
						href="https://www.cgiar.org/initiative/excellence-in-agronomy/"
						target="_blank"
						rel="noreferrer"
					>
						<img src={EiA} alt="EiA" />
					</a>
				</div>
				<div className="lower">
					<a
						href="https://scio.systems/"
						target="_blank"
						rel="noreferrer"
					>
						<p>
							powered by<span> SCiO</span>
						</p>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Footer;
