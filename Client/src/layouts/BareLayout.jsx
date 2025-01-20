import React from "react";
import { Outlet } from "react-router-dom";
import "./GradientBackground.css";

function BareLayout({ children }) {
	return (
		<>
			{/* style={{ marginBottom: "15rem", marginTop: "10rem" }} */}
			<div
				id="bare-content-wrapper"
				className="gradient-background py-5 d-flex justify-content-center align-items-center m-0"
				style={{
					width: "100vw",
					minHeight: "100vh",
					backgroundColor: "#B9C9A6",
				}}
			>
				<Outlet />
			</div>
		</>
	);
}

export default BareLayout;
