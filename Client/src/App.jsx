import { Route, BrowserRouter, Routes } from "react-router-dom";
import UserContext from "./UserContext";
import "./App.css";
import { useState } from "react";
import HeaderFooterLayout from "./layouts/HeaderFooterLayout";
import BareLayout from "./layouts/BareLayout";
import Dokumenti from "./pages/Dokumenti";
import Forum from "./pages/Forum";
import MyAccount from "./pages/MyAccount";
import Login from "./pages/Login";
import Registracija from "./pages/Registracija";
// import ViewDocument from "./components/ViewDocument";
import NewDocumentCard from "./components/NewDocumentCard";

function App() {
	const [user, setUser] = useState("guest");

	function changeUser(toSet) {
		//toSet smije biti samo "guest", "user" ili "admin"
		if (toSet === "guest" || toSet === "user" || toSet === "admin") {
			setUser(toSet);
		}
	}

	return (
		<UserContext.Provider value={user}>
			<BrowserRouter>
				<Routes>
					<Route element={<HeaderFooterLayout />}>
						<Route index element={<Dokumenti />} />
						<Route path="/forum" element={<Forum />} />
						<Route path="/myaccount" element={<MyAccount />} />
					</Route>

					<Route element={<BareLayout />}>
						<Route path="/login" element={<Login />} changeUserFunction={changeUser} />
						<Route path="/registracija" element={<Registracija />} changeUserFunction={changeUser} />
					</Route>

					{/* <Route path="/view-document" element={<ViewDocument />} /> */}

					<Route path="/" element={<NewDocumentCard />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
