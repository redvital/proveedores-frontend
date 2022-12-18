import Footer from "@/components/Footer";
import Sidebar from "@/components/SideBar";
import { getUserStorage } from "@/services/local-storage.service"
import { useRouter } from "next/router"


export default function Default({ children }: { children: React.ReactNode }) {

	const user = getUserStorage()

	const router = useRouter();

	const logout = () => {
		localStorage.clear();

		router.push("/admin/login");

	}
	return (
		<>
			<Sidebar logout={logout}>
				<main>{children}</main>
			</Sidebar>

			<Footer />
		</>
	);
}
