import { useRouter } from "next/router";
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
import { useState, useEffect } from "react";
import { IRepresentative } from "@/interfaces/representative.interface";
import { HttpStatusCode } from "@/app/common/enums/httpStatusCode"

const edit = () => {
	const { user } = useAuth({ middleware: "auth" });
	const router = useRouter();
	const { id } = router.query;

	const token = getToken();
	const toast = useToast();

	const [representative, setRepresentative] = useState<IRepresentative>(
		{} as IRepresentative
	);
	const isDisabled = false;

	const getRepresentative = async (representativeId: any) => {
		const response = await api.get(`representative/${representativeId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		setRepresentative(response.data.data);
	};

	useEffect(() => {
		if (id) {
			getRepresentative(id);
		}
	}, [id]);

	if (!representative) return <div> Espere... </div>;

	const formik = useFormik({
		initialValues: {
			name: representative.commercial_register,
			rif: representative.rif,
			document: representative.representatives_document,
		},
		validationSchema: Yup.object({
			name: Yup.string().required("El nombre es obligatorio"),
			rif: Yup.string().required("El rif obligatorio"),
			document: Yup.string().required("El documento obligatorio"),
		}),
		enableReinitialize: true,
		onSubmit: async ({ name, rif, document }) => {
			try {
				if (!formik.isValid) return;

				const response = await api.post(
					`representative/${id}`,
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

				if (response.status === HttpStatusCode.Ok) {
					toast({
						title: `Se actualizo el representante correctamente`,
						status: "success",
					});

						await getRepresentative(id);
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
						<Text fontSize='2xl'>Actualizar Representante</Text>
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
							<FormLabel>Nombre Comercial</FormLabel>
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
								readOnly={isDisabled}
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
								readOnly={isDisabled}
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

							{!isDisabled && (
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
							)}
						</Stack>
					</Box>
				</form>
			</Box>
		</>
	);
};

export default edit;
