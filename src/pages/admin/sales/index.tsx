
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
	Center,
	Flex,
	Grid,
	GridItem,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	Square,
	Box,
	HStack,
} from "@chakra-ui/react";
import React from "react";

const index = () => {


	return (
		<>
			<Breadcrumb
				spacing='8px'
				separator={<ChevronRightIcon color='gray.500' />}
			>
				<BreadcrumbItem>
					<BreadcrumbLink href='dashboard'>
						<Text fontSize='2xl'>Ventas</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>


		</>
	);
};

export default index;
