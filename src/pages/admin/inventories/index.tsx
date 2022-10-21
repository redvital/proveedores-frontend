import { useAuth } from "@/hooks/auth";
import {
	ChevronRightIcon,
	ViewIcon,
	CopyIcon,
	EditIcon,
} from "@chakra-ui/icons";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
	Flex,
	Grid,
	GridItem,
	Input,
	InputGroup,
	InputRightElement,
	useColorModeValue,
	Text,
	Square,
	Box,
	HStack,
	Stack,
	TableContainer,
	Table,
	TableCaption,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Tfoot,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "@chakra-ui/react";
import { CardSedes } from "@/components/CardSedes";

const index = () => {
	const { user } = useAuth({ middleware: "auth" });

	const sedes = [
		{
			id: 1,
			name: "Valencia",
		},
		{
			id: 2,
			name: "Turmero",
		},
		{
			id: 3,
			name: "Barquisimeto",
		},
		{
			id: 4,
			name: "Maracay",
		},
		{
			id: 5,
			name: "Caracas",
		}
	];

	return (
		<>
			<Breadcrumb
				spacing='8px'
				separator={<ChevronRightIcon color='gray.500' />}
			>
				<BreadcrumbItem>
					<BreadcrumbLink href='/admin/dashboard'>
						<Text fontSize='2xl'>Inicio</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink href='/admin/inventories'>
						<Text fontSize='2xl'>Inventarios</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

			<Box marginTop={4} marginBottom={10}>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Grid templateColumns='repeat(5, 1fr)' gap={6}>
						{sedes.map((sede) => {
							return (
								<GridItem colSpan={1}>
									<CardSedes key={sede.id} sede={sede} />
								</GridItem>
							);
						})}
					</Grid>
				</Box>
			</Box>
		</>
	);
};

export default index;
