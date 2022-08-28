import Footer from "../components/Footer";
import Sidebar from "../components/SideBar"
import { useAuth } from "../hooks/auth"

export default function Default({ children }: { children: React.ReactNode }) {

	const { logout } = useAuth({ middleware: "auth" });

	return (
		<>

			<Sidebar logout={logout}>
				<main>{children}</main>
			</Sidebar>

			<Footer />
		</>
	);
}
