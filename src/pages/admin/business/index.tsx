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
	Badge,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "@chakra-ui/react";

const index = () => {
	const { user } = useAuth({ middleware: "auth" });

	const business = [
		{
			id: 1,
			name: "Empresa 1",
			last_modified: "2021-01-01",
			status: "Aprobado",
		},
		{
			id: 2,
			name: "Empresa 2",
			last_modified: "2021-01-01",
			status: "Denegado",
		},
		{
			id: 3,
			name: "Empresa 3",
			last_modified: "2021-01-01",
			status: "Aprobado",
		},
		{
			id: 4,
			name: "Empresa 4",
			last_modified: "2021-01-01",
			status: "Aprobado",
		},
		{
			id: 5,
			name: "Empresa 5",
			last_modified: "2021-01-01",
			status: "Aprobado",
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
					<BreadcrumbLink href='/admin/business'>
						<Text fontSize='2xl'>Empresas</Text>
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

				<Link href='/admin/business/create'>
					<Button
						colorScheme='blue'
						bgGradient='linear(to-r, brand.400, brand.500, brand.600)'
						color='white'
						variant='solid'
						size={"lg"}
					>
						Crear Empresa
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
					<TableContainer>
						<Table variant='simple'>
							<TableCaption>Lista de empresas</TableCaption>
							<Thead>
								<Tr>
									<Th>#</Th>

									<Th>Nombre</Th>
									<Th>Modificado</Th>
									<Th>Estado</Th>
									<Th>Acciones</Th>
								</Tr>
							</Thead>
							<Tbody>
								{business.map(
									({ id, name, last_modified, status }) => (
										<Tr>
											<Td>{id}</Td>
											<Td>{name}</Td>
											<Td>{last_modified}</Td>
											<Td>
												<Badge
													colorScheme={
														status == "Aprobado"
															? "green"
															: "red"
													}
												>
													{status}
												</Badge>
											</Td>

											<Td>
												<Stack
													direction='row'
													spacing={4}
												>
													<Link
														href={`/admin/products/${id}`}
													>
														<Button
															leftIcon={
																<ViewIcon />
															}
															colorScheme='blue'
															variant='ghost'
														>
															Ver
														</Button>
													</Link>

													<Link
														href={`/admin/products/${id}`}
													>
														<Button
															leftIcon={
																<EditIcon />
															}
															colorScheme='blue'
															variant='ghost'
														>
															Editar
														</Button>
													</Link>
												</Stack>
											</Td>
										</Tr>
									)
								)}
							</Tbody>
							<Tfoot></Tfoot>
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</>
	);
};

export default index;
