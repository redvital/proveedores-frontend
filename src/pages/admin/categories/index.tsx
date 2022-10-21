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
import React, { useEffect, useState } from "react";
import { Link } from "@chakra-ui/react";
import api from "@/lib/api";
import { getToken } from "@/services/local-storage.service";
import { ICategory } from "@/interfaces/categories.interface";

const index = () => {
	const { user } = useAuth({ middleware: "auth" });
	const token = getToken();

	const [categories, setCategories] = useState<ICategory[]>([]);
	const getData = async () => {
		const { data } = await api.get("category", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		setCategories(data.data);
	};

	useEffect(() => {
		getData();
	}, []);

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
					<TableContainer>
						<Table variant='simple'>
							<TableCaption>Lista de Categorías</TableCaption>
							<Thead>
								<Tr>
									<Th>#</Th>

									<Th>Nombre</Th>
									<Th>Categoría</Th>
									<Th>Acciones</Th>
								</Tr>
							</Thead>
							<Tbody>
								{categories.map(({ id, name, description }) => (
									<Tr>
										<Td>{id}</Td>
										<Td>{name}</Td>
										<Td>{description}</Td>
										<Td>
											<Stack direction='row' spacing={4}>
												<Link
													href={`/admin/categories/${id}`}
												>
													<Button
														leftIcon={<ViewIcon />}
														colorScheme='blue'
														variant='ghost'
													>
														Ver
													</Button>
												</Link>

												<Link
													href={`/admin/categories/${id}`}
												>
													<Button
														leftIcon={<EditIcon />}
														colorScheme='blue'
														variant='ghost'
													>
														Editar
													</Button>
												</Link>
											</Stack>
										</Td>
									</Tr>
								))}
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
