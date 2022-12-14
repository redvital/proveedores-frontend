import { useAuth } from "@/hooks/auth";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
	useColorModeValue,
	Text,
	Box,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "@chakra-ui/react";
import PaginationTable from "@/components/PaginationTable";

const index = () => {
	const { user } = useAuth({ middleware: "auth" });

	const uri = `/category`;
	const columns = ["#", "Nombre", "Categoría", "Acciones"];

	const columnsTable = ["id", "name", "description"];

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
					<BreadcrumbLink href='/admin/categories'>
						<Text fontSize='2xl'>Categorías</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

			<Flex marginTop={5} w={"100%"} h={10} gap={5}>
				<InputGroup size='lg' w={"50%"}>
					<Input type='text' placeholder='Buscar' bg={"white"} />
					<InputRightElement width='5.5rem'>
						<Button
							h='2.75rem'
							size='lg'
							colorScheme='blue'
							bgGradient='linear(to-r, brand.400, brand.500, brand.600)'
							color='white'
						>
							Buscar
						</Button>
					</InputRightElement>
				</InputGroup>

				<Link href='/admin/categories/create'>
					<Button
						colorScheme='blue'
						bgGradient='linear(to-r, brand.400, brand.500, brand.600)'
						color='white'
						variant='solid'
						size={"lg"}
					>
						Crear Categoría
					</Button>
				</Link>
			</Flex>

			<Box marginTop={4} marginBottom={10}>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<PaginationTable
						uri={uri}
						columns={columns}
						columnsTable={columnsTable}
						titleTable='Lista de categorías'
						pathView='categories'
						pathEdit='categories/edit'
					/>
				</Box>
			</Box>
		</>
	);
};

export default index;
