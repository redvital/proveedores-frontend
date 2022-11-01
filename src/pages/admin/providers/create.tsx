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
import { useEffect, useState } from "react";
import { HttpStatusCode } from "@/app/common/enums/httpStatusCode"
import { getTypeProviders } from "@/services/options.service"
import { IOptions } from "@/interfaces/options.interface"

const create = () => {
	const { user } = useAuth({ middleware: "auth" });
	const token = getToken();

	const toast = useToast();

	const [typeProviders, setTypeProviders] = useState([]);
	const loadSelects = async () => {
		await getTypeProviders(setTypeProviders);
	};

	useEffect(() => {
		loadSelects();
	}, []);

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			phone: "",
			company: "",
			rif: "",
			provider_type: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("El nombre es obligatorio"),
			email: Yup.string().required("El email es obligatorio"),
			phone: Yup.string().required("El teléfono es obligatorio"),
			company: Yup.string().required("La compañía es obligatorio"),
			rif: Yup.string()
			.required("El rif es obligatorio")
			.matches(
				/^([VEJPGvejpg]{1})-([0-9]{8})-([0-9]{1}$)/g,
				"El rif no es valido, ej J-12345678-1 o j-12345678-1"
			),
			provider_type: Yup.number()
				.min(1)
				.required("El tipo de proveedor es obligatorio"),
		}),
		onSubmit: async ({
			name,
			email,
			phone,
			company,
			rif,
			provider_type,
		}) => {
			try {
				if (!formik.isValid) return;

				const response = await api.post(
					"provider",
					{
						name: name,
						email: email,
						phone_number: phone,
						company: company,
						rif: rif,
						provider_type: provider_type,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.status === HttpStatusCode.Created) {
					toast({
						title: `Se guardo el proveedor correctamente`,
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
					<BreadcrumbLink href='/admin/providers'>
						<Text fontSize='2xl'>Lista de Proveedores</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink>
						<Text fontSize='2xl'>Crear Proveedor</Text>
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
							id='email'
							isInvalid={
								formik.errors.email && formik.touched.email
									? true
									: false
							}
						>
							<FormLabel>Correo</FormLabel>
							<Input
								type='text'
								value={formik.values.email}
								onChange={formik.handleChange}
							/>
							<FormErrorMessage>
								{formik.touched.email && formik.errors.email}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							id='phone'
							isInvalid={
								formik.errors.phone && formik.touched.phone
									? true
									: false
							}
						>
							<FormLabel>Numero de teléfono</FormLabel>
							<Input
								type='text'
								value={formik.values.phone}
								onChange={formik.handleChange}
							/>
							<FormErrorMessage>
								{formik.touched.phone && formik.errors.phone}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							id='company'
							isInvalid={
								formik.errors.company && formik.touched.company
									? true
									: false
							}
						>
							<FormLabel>Nombre de la empresa</FormLabel>
							<Input
								type='text'
								value={formik.values.company}
								onChange={formik.handleChange}
							/>
							<FormErrorMessage>
								{formik.touched.company &&
									formik.errors.company}
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
							<FormLabel>Rif</FormLabel>
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
							id='provider_type'
							isInvalid={
								formik.errors.provider_type &&
								formik.touched.provider_type
									? true
									: false
							}
						>
							<FormLabel>Tipo de Proveedor</FormLabel>

							<Select
								placeholder='Seleccione una categoría'
								value={formik.values.provider_type}
								onChange={formik.handleChange}
							>
								{typeProviders.map((provider: IOptions) => (
									<option value={provider.id} key={provider.id}>
										{provider.name}
									</option>
								))}
							</Select>
							<FormErrorMessage>
								{formik.touched.provider_type &&
									formik.errors.provider_type}
							</FormErrorMessage>
						</FormControl>

						<Stack direction={"row"} spacing={4} marginTop={4}>
							<Link href={"/admin/providers"}>
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
