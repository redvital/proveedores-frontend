import Footer from "@/components/Footer";
import Sidebar from "@/components/SideBar";
import { useAuth } from "@/hooks/auth";

export default function Default({ children }: { children: React.ReactNode }) {
	const { logout, user } = useAuth({ middleware: "auth" });

	return (
		<>
			<Sidebar logout={logout} user={user}>
				<main>{children}</main>
			</Sidebar>

			<Footer />
		</>
	);
}
