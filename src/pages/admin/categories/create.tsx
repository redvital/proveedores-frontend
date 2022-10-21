import { useAuth } from "@/hooks/auth";
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
import { getToken } from "@/services/local-storage.service";

const create = () => {
	const { user } = useAuth({ middleware: "auth" });
	const token = getToken();

	const toast = useToast();

	const formik = useFormik({
		initialValues: {
			name: "",
			description: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("El nombre es obligatorio"),
			description: Yup.string().required("La descripción obligatorio"),
		}),
		onSubmit: async ({ name, description }) => {
			try {
				if (!formik.isValid) return;

				const response = await api.post(
					"category",
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

				if (response.status === 201) {
					toast({
						title: `Se guardo la categoría correctamente`,
						status: "success",
					});

					formik.resetForm();
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
						<Text fontSize='2xl'>Crear Categoría</Text>
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

							<Button
								bg={"brand.400"}
								color={"white"}
								_hover={{
									bg: "brand.500",
								}}
								type='submit'
							>
								Guardar
							</Button>
						</Stack>
					</Box>
				</form>
			</Box>
		</>
	);
};

export default create;
