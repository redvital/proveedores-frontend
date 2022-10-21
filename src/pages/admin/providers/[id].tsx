import { useRouter } from "next/router";

import { useAuth } from "@/hooks/auth";

const edit = () => {
	const { user } = useAuth({ middleware: "auth" });
	const router = useRouter();
	const { id } = router.query;

	return (
		<>
			<h1>Product {id}</h1>
		</>
	);
};

export default edit;
