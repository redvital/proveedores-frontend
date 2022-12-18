import { useRouter } from "next/router";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
	Center,
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
	FormControl,
	FormLabel,
	FormErrorMessage,
	Select,
	useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "@chakra-ui/react";

import api from "@/lib/api";
import { useEffect, useState } from "react";
import { getToken } from "@/services/local-storage.service";
import { ICategory } from "@/interfaces/categories.interface";
import { HttpStatusCode } from "@/app/common/enums/httpStatusCode"

const View = () => {

	const router = useRouter();
	const { id } = router.query;
	const token = getToken();
	const [category, setCategory] = useState<ICategory>({} as ICategory);
	const toast = useToast();

	const isDisabled = false;

	const getCategory = async (idCategory: any) => {
		const response = await api.get(`category/${idCategory}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		setCategory(response.data.data);
	};

	useEffect(() => {
		if (id) {
			getCategory(id);
		}
	}, [id]);

	if (!category) return <div> Espere... </div>;

	const formik = useFormik({
		initialValues: {
			name: category.name ? category.name : "",
			description: category.description ? category.description : "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("El nombre es obligatorio"),
			description: Yup.string().required("La descripción obligatorio"),
		}),
		enableReinitialize: true,
		onSubmit: async ({ name, description }) => {
			try {
				if (!formik.isValid) return;

				const response = await api.patch(
					`category/${id}`,
					{
						name: name,
						description: description,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.status == HttpStatusCode.Ok) {
					toast({
						title: `Se actualizo la categoría correctamente`,
						status: "success",
					});

					await getCategory(id);
				}
			} catch (error) {
				console.error("error: ", error);
				const err = error as any;
				toast({
					title: `${err.message}`,
					status: "error",
				});
			}
		},
	});

	return (
		<>
			<Breadcrumb
				spacing='8px'
				separator={<ChevronRightIcon color='gray.500' />}
			>
				<BreadcrumbItem>
					<BreadcrumbLink href='/admin/categories'>
						<Text fontSize='2xl'>Lista de Categorías</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink>
						<Text fontSize='2xl'>Actualizar Categoría</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink>
						<Text fontSize='2xl'>#{id}</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
			<Box marginTop={4} marginBottom={10}>
				<form onSubmit={formik.handleSubmit}>
					<Box
						rounded={"lg"}
						bg={useColorModeValue("white", "gray.700")}
						boxShadow={"lg"}
						p={8}
					>
						<FormControl
							id='name'
							isInvalid={
								formik.errors.name && formik.touched.name
									? true
									: false
							}
						>
							<FormLabel>Nombre</FormLabel>
							<Input
								type='text'
								value={formik.values.name}
								onChange={formik.handleChange}
								readOnly={isDisabled}
							/>
							<FormErrorMessage>
								{formik.touched.name && formik.errors.name}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							id='description'
							isInvalid={
								formik.errors.description &&
								formik.touched.description
									? true
									: false
							}
						>
							<FormLabel>Descripción</FormLabel>
							<Input
								type='text'
								value={formik.values.description}
								onChange={formik.handleChange}
								readOnly={isDisabled}
							/>
							<FormErrorMessage>
								{formik.touched.description &&
									formik.errors.description}
							</FormErrorMessage>
						</FormControl>

						<Stack direction={"row"} spacing={4} marginTop={4}>
							<Link href={"/admin/categories"}>
								<Button
									bg={"red.300"}
									color={"white"}
									_hover={{
										bg: "red.500",
									}}
									type='button'
								>
									Cancelar
								</Button>
							</Link>
							{!isDisabled ? (
								<Button
									bg={"brand.400"}
									color={"white"}
									_hover={{
										bg: "brand.500",
									}}
									type='submit'
									disabled={isDisabled}
								>
									Actualizar
								</Button>
							) : null}
						</Stack>
					</Box>
				</form>
			</Box>
		</>
	);
};

export default View;
