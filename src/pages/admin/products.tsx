import { useAuth } from '@/hooks/auth'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react'

const products = () => {
    const { user } = useAuth({ middleware: "auth" });

	return (
		<>
			<Breadcrumb
				spacing='8px'
				separator={<ChevronRightIcon color='gray.500' />}
			>
				<BreadcrumbItem>
					<BreadcrumbLink href='dashboard'>Products</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

			{user && (<pre>{JSON.stringify(user, null, 2)}</pre>)}
		</>
	);
}

export default products