
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
import { IProviders } from "@/interfaces/provider.interface";
import api from "@/lib/api";
import { getToken } from "@/services/local-storage.service";
import PaginationTable from "@/components/PaginationTable";

const index = () => {


	const uri = `/provider`;

	const columns = [
		"#",
		"Nombre",
		"Correo",
		"Teléfono",
		"Empresa",
		"RIF",
		"Modificado",
		"Acciones",
	];

	const columnsTable = [
		"id",
		"name",
		"email",
		"phone_number",
		"company",
		"rif",
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
					<BreadcrumbLink href='/admin/providers'>
						<Text fontSize='2xl'>Proveedores</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

			<Flex marginTop={5} w={"100%"} h={10} gap={5} justifyContent='end'>
				{/*<InputGroup size='lg' w={"50%"}>
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
				</InputGroup>*/}

				<Link href='/admin/providers/create'>
					<Button
						colorScheme='blue'
						bgGradient='linear(to-r, brand.400, brand.500, brand.600)'
						color='white'
						variant='solid'
						size={"lg"}
					>
						Crear Proveedor
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
					<Stack>
						<PaginationTable
							uri={uri}
							columns={columns}
							columnsTable={columnsTable}
							titleTable='Lista de proveedores'
							pathView='providers'
							pathEdit='providers/edit'
						/>
					</Stack>
				</Box>
			</Box>
		</>
	);
};

export default index;
