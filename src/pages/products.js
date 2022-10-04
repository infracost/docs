import React from "react";
import PageLayout from "../components/PageLayout";

function Pricing() {
	return (
		<PageLayout
			title="Products"
			description="Cloud costs, loved by developers"
			pageClass="products"
			hideCTA={false}
		>
			<div className="products-wrapper">
				<div className="container">
					<div className="intro">
						<h1 className="tagline">Cloud costs, loved by developers</h1>
					</div>
				</div>
			</div>
		</PageLayout>
	);
}

export default Pricing;
