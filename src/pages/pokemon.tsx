import React from "react";
import { Stack, ChakraProvider } from "@chakra-ui/react";

import PaginationTable from "@/components/PaginationTable";

// This components is a example of how to use the PaginationTable component

const Pokemon = () => {
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
		<ChakraProvider>
			<Stack>
				<PaginationTable
					uri={uri}
					columns={columns}
					columnsTable={columnsTable}
					titleTable='Lista de productos'
					pathView='/admin/products'
					pathEdit='/admin/products/edit'
				/>
			</Stack>
		</ChakraProvider>
	);
};

export default Pokemon;
