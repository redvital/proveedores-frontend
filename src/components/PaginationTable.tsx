import React, { ChangeEvent, useEffect, useState } from "react";
import {
	Grid,
	Center,
	Select,
	Text,
	Button,
	Stack,
	ChakraProvider,
	TableContainer,
	Table,
	Tbody,
	TableCaption,
	Thead,
	Tr,
	Th,
	Td,
	Tfoot,
	Link,
	SimpleGrid,
	Box,
	Image,
} from "@chakra-ui/react";
import {
	Pagination,
	usePagination,
	PaginationPage,
	PaginationNext,
	PaginationPrevious,
	PaginationPageGroup,
	PaginationContainer,
	PaginationSeparator,
} from "@ajna/pagination";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { getToken } from "@/services/local-storage.service";
import api from "@/lib/api";
import { NextPage } from "next";

interface Props {
	uri: string;
	columns: string[];
	titleTable: string;
	pathView: string;
	pathEdit: string;
	columnsTable: string[];
}

const PaginationTable: NextPage<Props> = ({
	uri,
	columns,
	titleTable,
	pathView,
	pathEdit,
	columnsTable,
}) => {
	const token = getToken();

	const fetchData = async (
		pageSize: number,
		offset: number,
		currentPage: number
	): Promise<any> => {
		const response = await api.get(
			`${uri}?limit=${pageSize}&page=${currentPage}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response.data;
	};

	// states
	const [dataTotal, setDataTotal] = useState<number | undefined>(undefined);
	const [data, setData] = useState<any[]>([]);

	const [page, setPage] = useState(1);

	// constants
	const outerLimit = 2;
	const innerLimit = 2;

	const {
		pages,
		pagesCount,
		offset,
		currentPage,
		setCurrentPage,
		setIsDisabled,
		isDisabled,
		pageSize,
		setPageSize,
	} = usePagination({
		total: dataTotal,
		limits: {
			outer: outerLimit,
			inner: innerLimit,
		},
		initialState: {
			pageSize: 10,
			isDisabled: false,
			currentPage: 1,
		},
		pagesCount: page,
	});

	// effects
	useEffect(() => {
		fetchData(pageSize, offset, currentPage)
			.then((data) => {
				setDataTotal(data.total);
				setData(data.data);
				setCurrentPage(data.current_page);
				setPage(data.last_page);
			})
			.catch((error) => console.log("App =>", error));
	}, [currentPage, pageSize, offset]);

	// handlers
	const handlePageChange = (nextPage: number): void => {
		// -> request new data using the page number
		setCurrentPage(nextPage);
		console.log("request new data with ->", nextPage);
	};

	const handlePageSizeChange = (
		event: ChangeEvent<HTMLSelectElement>
	): void => {
		const pageSize = Number(event.target.value);

		setPageSize(pageSize);
	};

	const handleDisableClick = (): void => {
		setIsDisabled((oldState) => !oldState);
	};

	return (
		<ChakraProvider>
			<Stack>
				<Pagination
					pagesCount={page}
					currentPage={currentPage}
					isDisabled={isDisabled}
					onPageChange={handlePageChange}
				>
					<PaginationContainer
						align='center'
						justify='space-between'
						p={4}
						w='full'
					>
						<PaginationPrevious
							_hover={{
								bg: "blue.400",
							}}
							bg='blue.300'
							onClick={() =>
								console.log(
									"Im executing my own function along with Previous component functionality"
								)
							}
						>
							<Text>Anterior</Text>
						</PaginationPrevious>
						<PaginationPageGroup
							isInline
							align='center'
							separator={
								<PaginationSeparator
									onClick={() =>
										console.log(
											"Im executing my own function along with Separator component functionality"
										)
									}
									bg='blue.300'
									fontSize='sm'
									w={7}
									jumpSize={11}
								/>
							}
						>
							{pages.map((page: number) => (
								<PaginationPage
									w={7}
									bg='red.300'
									key={`pagination_page_${page}`}
									page={page}
									onClick={() =>
										console.log(
											"Im executing my own function along with Page component functionality"
										)
									}
									fontSize='sm'
									_hover={{
										bg: "green.300",
									}}
									_current={{
										bg: "green.300",
										fontSize: "sm",
										w: 7,
									}}
								/>
							))}
						</PaginationPageGroup>
						<PaginationNext
							_hover={{
								bg: "blue.400",
							}}
							bg='blue.300'
							onClick={() =>
								console.log(
									"Im executing my own function along with Next component functionality"
								)
							}
						>
							<Text>Siguiente</Text>
						</PaginationNext>
					</PaginationContainer>
				</Pagination>
				<Center w='full'>
					{/* <Button
						_hover={{
							bg: "purple.400",
						}}
						bg='purple.300'
						onClick={handleDisableClick}
					>
						Disable ON / OFF
					</Button> */}
					<Select ml={3} onChange={handlePageSizeChange} w={40}>
						<option value='10'>10</option>
						<option value='25'>25</option>
						<option value='50'>50</option>
					</Select>
				</Center>
				<Grid
					gap={2}
					mt={2}
					px={2}
					// templateColumns='repeat(5, 1fr)'
					// templateRows='repeat(2, 1fr)'
				>
					<TableContainer>
						<Table size='sm'>
							<TableCaption>{titleTable}</TableCaption>
							<Thead>
								<Tr>
									{columns.map((column: string) => (
										<Th key={column}>{column}</Th>
									))}
								</Tr>
							</Thead>
							<Tbody>
								{data.map((item: any) => (
									<Tr key={item.id}>

										{columnsTable.map((column, index) => (
											<Td key={index}>{item[column]}</Td>
										))}

										<Td>
											<Stack direction='row' spacing={4}>
												<Link
													href={`${pathView}/${item.id}`}
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
													href={`${pathEdit}/${item.id}`}
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
				</Grid>
			</Stack>
		</ChakraProvider>
	);
};

export default PaginationTable;
