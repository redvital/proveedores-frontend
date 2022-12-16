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
import { IProducts } from "@/interfaces/product.interface";
import { getProducts } from "@/services/products.service";
import PaginationTable from "@/components/PaginationTable";
import { ModalImportProduct } from "@/components/ModalImportProduct"

const index = () => {
	const [products, setProducts] = useState<IProducts[]>([]);

	const getData = async () => {
		await getProducts(setProducts);
	};

	useEffect(() => {
		getData();
	}, []);

	const uri = `/supplier/1/products`;

	const columns = [
		"#",
		"Nombre",
		"SKU",
		"Precio unitario",
		"Precio por paquete",
		"Modificado",
		"Acciones",
	];

	const columnsTable = [
		"id",
		"name",
		"sku_provider",
		"cost_per_unit",
		"cost_per_package",
		"updated_at",
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

			<Flex marginTop={5} w={"100%"} h={10} gap={5} justifyContent='end'>
				{/* <InputGroup size='lg' w={"50%"}>
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
					</InputGroup> */}

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

				{/* <Button
					colorScheme='blue'
					bgGradient='linear(to-r, brand.400, brand.500, brand.600)'
					color='white'
					variant='solid'
					size={"lg"}
				>
					Importar Productos
				</Button> */}

				<ModalImportProduct />
			</Flex>

			<Box marginTop={4} marginBottom={10}>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack>
						<PaginationTable
							uri={uri}
							columns={columns}
							columnsTable={columnsTable}
							titleTable='Lista de productos'
							pathView='products'
							pathEdit='products/edit'
						/>
					</Stack>
				</Box>
			</Box>
		</>
	);
};

export default index;
