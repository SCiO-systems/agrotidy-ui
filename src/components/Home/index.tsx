import './styles.css';

export const Home = () => {
	return (
		<div className="about">
			<div className="header">
				<h3>
					AgroTidy is a tool suite for bringing your primary data into
					the format suitable for your analysis.
				</h3>
			</div>
			<div className="features">
				<h3>Main features:</h3>
				<p>
					The suite is continuously extended and refined to cover
					different fields and analytical cases. Currently, it entails
					the following services:
				</p>
				<ul>
					<li>
						Survey Data Cleaner: It cleans and restructures
						ODK-based datasets to improve readability and
						understanding, and prepares the for ingestion into
						analytical tools like STATA.
					</li>
					<li>
						Crop Model Data Transformer: It transforms data
						following the AgMIP Crop Experiment (ACE) format into
						formats adopted by the widely used DSSAT and APSIM
						models.
					</li>
				</ul>
			</div>
		</div>
	);
};
