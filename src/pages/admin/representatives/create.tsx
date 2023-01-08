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
import { HttpStatusCode } from "@/app/common/enums/httpStatusCode"
import { IUser } from "@/interfaces/user.interface"

const create = () => {
	const { user } = useAuth({ middleware: "auth" });
	const token = getToken();

	const toast = useToast();

	const { provider_user_me } = user as IUser;

	const formik = useFormik({
		initialValues: {
			name: "",
			rif: "",
			document: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("El nombre es obligatorio"),
			rif: Yup.string().required("El rif obligatorio"),
			document: Yup.string().required("El documento obligatorio"),
		}),
		onSubmit: async ({ name, rif, document }) => {
			try {
				if (!formik.isValid) return;

				const response = await api.post(
					`provider/${provider_user_me}/representative`,
					{
						commercial_register: name,
						rif: rif,
						representatives_document: document,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.status === HttpStatusCode.Created) {
					toast({
						title: `Se guardo el representante correctamente`,
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
					<BreadcrumbLink href='/admin/representatives'>
						<Text fontSize='2xl'>Lista de Representantes</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink>
						<Text fontSize='2xl'>Crear Representante</Text>
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
							<FormLabel>Nombre Comercial</FormLabel>
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
							id='rif'
							isInvalid={
								formik.errors.rif && formik.touched.rif
									? true
									: false
							}
						>
							<FormLabel>RIF</FormLabel>
							<Input
								type='text'
								value={formik.values.rif}
								onChange={formik.handleChange}
							/>
							<FormErrorMessage>
								{formik.touched.rif && formik.errors.rif}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							id='document'
							isInvalid={
								formik.errors.document &&
								formik.touched.document
									? true
									: false
							}
						>
							<FormLabel>Documento</FormLabel>
							<Input
								type='text'
								value={formik.values.document}
								onChange={formik.handleChange}
							/>
							<FormErrorMessage>
								{formik.touched.document &&
									formik.errors.document}
							</FormErrorMessage>
						</FormControl>

						<Stack direction={"row"} spacing={4} marginTop={4}>
							<Link href={"/admin/representatives"}>
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
