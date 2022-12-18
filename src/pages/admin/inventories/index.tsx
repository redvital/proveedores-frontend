
import {
	ChevronRightIcon,
} from "@chakra-ui/icons";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Grid,
	GridItem,
	useColorModeValue,
	Text,
	Box,
} from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import { CardSedes } from "@/components/CardSedes";
import { IStore } from "@/interfaces/store.interface";
import { getStores } from "@/services/store.service";

const index = () => {

	const [stores, setStores] = useState<IStore[]>([]);

	const getData = async () => {
		await getStores(setStores);
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
						{stores.map((sede) => {
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
