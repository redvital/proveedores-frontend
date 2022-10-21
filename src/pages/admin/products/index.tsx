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

	const products = [
		{
			id: 1,
			name: "Producto 1",
			sku: "SKU-1",
			unit_price: 100,
			price: 100,
			last_modified: "2021-01-01",
			status: "Aprobado",
		},
		{
			id: 2,
			name: "Producto 2",
			sku: "SKU-2",
			unit_price: 200,
			price: 200,
			last_modified: "2021-01-01",
			status: "Denegado",
		},
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
					<BreadcrumbLink href='/admin/products'>
						<Text fontSize='2xl'>Productos</Text>
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

				<Link href='/admin/products/create'>
					<Button
						colorScheme='blue'
						bgGradient='linear(to-r, brand.400, brand.500, brand.600)'
						color='white'
						variant='solid'
						size={"lg"}
					>
						Crear Producto
					</Button>
				</Link>

				<Button
					colorScheme='blue'
					bgGradient='linear(to-r, brand.400, brand.500, brand.600)'
					color='white'
					variant='solid'
					size={"lg"}
				>
					Importar Productos
				</Button>
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
							<TableCaption>Lista de productos</TableCaption>
							<Thead>
								<Tr>
									<Th>#</Th>

									<Th>Nombre</Th>
									<Th>SKU</Th>
									<Th isNumeric>Precio unitario</Th>
									<Th isNumeric>Precio</Th>
									<Th>Modificado</Th>
									<Th>Estado</Th>
									<Th>Acciones</Th>
								</Tr>
							</Thead>
							<Tbody>
								{products.map(
									({
										id,
										name,
										sku,
										unit_price,
										price,
										last_modified,
										status,
									}) => (
										<Tr>
											<Td>{id}</Td>
											<Td>{name}</Td>
											<Td>{sku}</Td>
											<Td isNumeric>{unit_price}</Td>
											<Td isNumeric>{price}</Td>
											<Td>{last_modified}</Td>
											<Td><Badge colorScheme={status == 'Aprobado' ? 'green': 'red'}>{status}</Badge>
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
