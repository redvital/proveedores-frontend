import { ChevronRightIcon } from "@chakra-ui/icons";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
} from "@chakra-ui/react";

import { useAuth } from "@/hooks/auth";

const dashboard = () => {
	const { user } = useAuth({ middleware: "auth" });

	return (
		<>
			<Breadcrumb
				spacing='8px'
				separator={<ChevronRightIcon color='gray.500' />}
			>
				<BreadcrumbItem>
					<BreadcrumbLink href='dashboard'>Home</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

			<pre>{JSON.stringify(user, null, 2) ?? "Espere..."}</pre>
		</>
	);
};

export default dashboard;
