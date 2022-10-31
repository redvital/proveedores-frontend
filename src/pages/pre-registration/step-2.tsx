import {
	Stack,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Checkbox,
	Link,
	Heading,
	Flex,
	Select,
	Box,
	useColorModeValue,
	Button,
	useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import api from "@/lib/api";
import { getToken } from "@/services/local-storage.service";

const StepTwo = () => {
	const router = useRouter();

	const toast = useToast();

	const providerId = router.query.provider;

	const token = getToken();

	const formik = useFormik({
		initialValues: {
			address: "",
			state: "",
			postal_code: "",
			web_site: "",
			tradename: "",
			payment: "",
			enabled: "",
			commercial_register: "",
			rif: "",
			document_identity: "",
			checked: [],
		},
		validationSchema: Yup.object({
			address: Yup.string().required("La direección es requerida"),
			state: Yup.string().required("El estado es requerido"),
			postal_code: Yup.string().required("El código postal es requerido"),
			web_site: Yup.string().required("El sitio web es requerido"),
			tradename: Yup.string().required("La razón social es requerida"),
			payment: Yup.number()
				.required("El método de pago es requerido")
				.min(1, "El método de pago es requerido"),
			// enabled: Yup.array().required("Seleccione una opción"),
			// commercial_register: Yup.string().required(
			// 	"El registro comercial es requerido"
			// ),
			// rif: Yup.string().required("El RIF es requerido"),
			// document_identity: Yup.string().required(
			// 	"El documento de identidad es requerido"
			// ),
		}),
		onSubmit: async (data) => {
			const { address, postal_code, web_site, tradename, payment } = data;

			try {
				const response = await api.post(
					`provider/${providerId}/additionalsupplierinformation`,
					{
						fiscal_address: address,
						state: "Carabobo",
						postal_code: postal_code,
						web_page: web_site,
						commercial_name: tradename,
						retention: 1,
						consignment: 1,
						payment_condition: 1,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.status === 201) {
					toast({
						title: "Paso dos completado, espere mientras se redirecciona al ultimo paso",
						status: "success",
					});

					formik.resetForm();
					setTimeout(() => {
						toast.closeAll();
						router.push(
							`/pre-registration/step-3?provider=${providerId}`
						);
					}, 5000);
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

	const optionPayment = [
		{
			id: 1,
			name: "Efectivo",
		},
	];

	const states = [
		{
			id: 1,
			name: "Amazonas",
		},
		{
			id: 2,
			name: "Anzoátegui",
		},
	];

	return (
		<>
			<Flex
				minH={"100vh"}
				align={"center"}
				justify={"center"}
				bg={useColorModeValue("gray.50", "gray.800")}
			>
				<Stack
					spacing={6}
					mx={"auto"}
					maxW={"lg"}
					py={12}
					px={6}
					width={"80%"}
				>
					<Stack align={"center"}>
						<Heading fontSize={"4xl"}>Pre Registro Paso 2</Heading>
					</Stack>
					<Box
						rounded={"lg"}
						bg={useColorModeValue("white", "gray.700")}
						boxShadow={"lg"}
						p={8}
						width='100%'
					>
						<form onSubmit={formik.handleSubmit}>
							<Stack spacing={4} marginBottom={4}>
								<FormControl
									id='address'
									isInvalid={
										formik.touched.address &&
										formik.errors.address
											? true
											: false
									}
								>
									<FormLabel>Dirección fiscal</FormLabel>
									<Input
										type='text'
										value={formik.values.address}
										onChange={formik.handleChange}
									/>
									<FormErrorMessage>
										{formik.touched.address &&
											formik.errors.address}
									</FormErrorMessage>
								</FormControl>

								<FormControl
									id='state'
									isInvalid={
										formik.touched.state &&
										formik.errors.state
											? true
											: false
									}
								>
									<FormLabel>Estado</FormLabel>

									<Select
										placeholder='Select option'
										value={formik.values.state}
										onChange={formik.handleChange}
									>
										{states.map((state) => (
											<option
												key={state.id}
												value={state.id}
											>
												{state.name}
											</option>
										))}
									</Select>

									<FormErrorMessage>
										{formik.touched.state &&
											formik.errors.state}
									</FormErrorMessage>
								</FormControl>

								<FormControl
									id='postal_code'
									isInvalid={
										formik.touched.postal_code &&
										formik.errors.postal_code
											? true
											: false
									}
								>
									<FormLabel>Codigo postal</FormLabel>
									<Input
										type='text'
										value={formik.values.postal_code}
										onChange={formik.handleChange}
									/>

									<FormErrorMessage>
										{formik.touched.postal_code &&
											formik.errors.postal_code}
									</FormErrorMessage>
								</FormControl>

								<FormControl
									id='web_site'
									isInvalid={
										formik.touched.web_site &&
										formik.errors.web_site
											? true
											: false
									}
								>
									<FormLabel>Pagina web</FormLabel>
									<Input
										type='text'
										value={formik.values.web_site}
										onChange={formik.handleChange}
									/>

									<FormErrorMessage>
										{formik.touched.web_site &&
											formik.errors.web_site}
									</FormErrorMessage>
								</FormControl>

								<FormControl
									id='tradename'
									isInvalid={
										formik.touched.tradename &&
										formik.errors.tradename
											? true
											: false
									}
								>
									<FormLabel>Nombre Comercial</FormLabel>
									<Input
										type='text'
										value={formik.values.tradename}
										onChange={formik.handleChange}
									/>

									<FormErrorMessage>
										{formik.touched.tradename &&
											formik.errors.tradename}
									</FormErrorMessage>
								</FormControl>

								<FormControl
									id='payment'
									isInvalid={
										formik.touched.payment &&
										formik.errors.payment
											? true
											: false
									}
								>
									<FormLabel>Condición de pago</FormLabel>

									<Select
										placeholder='Seleccione una opción'
										value={formik.values.payment}
										onChange={formik.handleChange}
									>
										{optionPayment.map((option) => (
											<option
												key={option.id}
												value={option.id}
											>
												{option.name}
											</option>
										))}
									</Select>

									<FormErrorMessage>
										{formik.touched.payment &&
											formik.errors.payment}
									</FormErrorMessage>
								</FormControl>

								<FormControl
									id='checked'
									isInvalid={
										formik.touched.checked &&
										formik.errors.checked
											? true
											: false
									}
								>
									<FormLabel>Habilitado para</FormLabel>
									<Stack spacing={5} direction='row'>
										<Checkbox
											name='checked'
											colorScheme='green'
											defaultChecked
											value='Retenciones'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											defaultValue={formik.values.checked}
										>
											Retenciones
										</Checkbox>
										<Checkbox
											colorScheme='green'
											defaultChecked
											name='checked'
											value='Consignaciones'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											defaultValue={formik.values.checked}
										>
											Consignaciones
										</Checkbox>
									</Stack>

									<FormErrorMessage>
										{formik.touched.checked &&
											formik.errors.checked}
									</FormErrorMessage>
								</FormControl>
							</Stack>

							<Stack align={"center"}>
								{/* <Flex flexDir='column' width='100%'>
									<Stack align={"center"}>
										<Heading
											fontSize={"md"}
											marginBottom={4}
										>
											Adjuntar documentos
										</Heading>
									</Stack>

									<FormControl
										id='commercial_register
						'
										isInvalid={
											formik.touched
												.commercial_register &&
											formik.errors.commercial_register
												? true
												: false
										}
									>
										<FormLabel>
											Registro mercantil
										</FormLabel>
										<Input
											type='file'
											value={
												formik.values
													.commercial_register
											}
											onChange={formik.handleChange}
										/>

										<FormErrorMessage>
											{formik.touched
												.commercial_register &&
												formik.errors
													.commercial_register}
										</FormErrorMessage>
									</FormControl>

									<FormControl
										id='rif'
										isInvalid={
											formik.touched.rif &&
											formik.errors.rif
												? true
												: false
										}
									>
										<FormLabel>RIF</FormLabel>
										<Input
											type='file'
											value={formik.values.rif}
											onChange={formik.handleChange}
										/>

										<FormErrorMessage>
											{formik.touched.rif &&
												formik.errors.rif}
										</FormErrorMessage>
									</FormControl>

									<FormControl
										id='document_identity'
										isInvalid={
											formik.touched.document_identity &&
											formik.errors.document_identity
												? true
												: false
										}
									>
										<FormLabel>
											CI del Representante
										</FormLabel>
										<Input
											type='file'
											value={
												formik.values.document_identity
											}
											onChange={formik.handleChange}
										/>

										<FormErrorMessage>
											{formik.touched.document_identity &&
												formik.errors.document_identity}
										</FormErrorMessage>
									</FormControl>
								</Flex> */}
							</Stack>
							<Stack direction={"row"} spacing={4} marginTop={4}>
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
						</form>
					</Box>
				</Stack>
			</Flex>
		</>
	);
};

export default StepTwo;
