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
import { useAuth } from "@/hooks/auth";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { getToken } from "@/services/local-storage.service";
import { IStore } from "@/interfaces/store.interface";
import { HttpStatusCode } from "@/app/common/enums/httpStatusCode"

const View = () => {
	const { user } = useAuth({ middleware: "auth" });
	const router = useRouter();
	const { id } = router.query;
	const token = getToken();
	const [store, setStore] = useState<IStore>({} as IStore);
	const toast = useToast();

	const isDisabled = false;

	const getStore = async (idStore: any) => {
		const response = await api.get(`store/${idStore}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		setStore(response.data.data);
	};

	useEffect(() => {
		if (id) {
			getStore(id);
		}
	}, [id]);

	if (!store) return <div> Espere... </div>;

	const formik = useFormik({
		initialValues: {
			name: store.name ? store.name : "",
			description: store.description ? store.description : "",
			location: store.location ? store.location : "",
			code: store.code ? store.code : "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("El nombre es obligatorio"),
			description: Yup.string().required("La descripción obligatorio"),
			location: Yup.string().required("La ubicación es obligatorio"),
			code: Yup.string().required("El código es obligatorio"),
		}),
		enableReinitialize: true,
		onSubmit: async ({ name, description, location, code }) => {
			try {
				if (!formik.isValid) return;

				const response = await api.patch(
					`store/${id}`,
					{
						name: name,
						description: description,
						location: location,
						code: code,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.status === HttpStatusCode.Ok) {
					toast({
						title: `Se actualizo la tienda correctamente`,
						status: "success",
					});

					await getStore(id);
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
					<BreadcrumbLink href='/admin/stores'>
						<Text fontSize='2xl'>Lista de Tiendas</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink>
						<Text fontSize='2xl'>Actualizar Tienda</Text>
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

						<FormControl
							id='location'
							isInvalid={
								formik.errors.location &&
								formik.touched.location
									? true
									: false
							}
						>
							<FormLabel>Ubicación</FormLabel>
							<Input
								type='text'
								value={formik.values.location}
								onChange={formik.handleChange}
								readOnly={isDisabled}
							/>
							<FormErrorMessage>
								{formik.touched.location &&
									formik.errors.location}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							id='code'
							isInvalid={
								formik.errors.code && formik.touched.code
									? true
									: false
							}
						>
							<FormLabel>Código</FormLabel>
							<Input
								type='text'
								value={formik.values.code}
								onChange={formik.handleChange}
								readOnly={isDisabled}
							/>
							<FormErrorMessage>
								{formik.touched.code && formik.errors.code}
							</FormErrorMessage>
						</FormControl>

						<Stack direction={"row"} spacing={4} marginTop={4}>
							<Link href={"/admin/stores"}>
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
