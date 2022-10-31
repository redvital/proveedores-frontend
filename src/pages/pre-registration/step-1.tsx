import api from "@/lib/api";
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
import Logo from "@/components/Logo";
import { useState, useEffect } from "react";
import { getTypeProviders } from "@/services/options.service";
import { IOptions } from "@/interfaces/options.interface";

const StepOne = () => {
	const toast = useToast();
	const router = useRouter();

	const [typeProviders, setTypeProviders] = useState([]);

	const loadSelects = async () => {
		await getTypeProviders(setTypeProviders);
	};

	useEffect(() => {
		loadSelects();
	}, []);

	const formik = useFormik({
		initialValues: {
			contact_name: "",
			email: "",
			phone: "",
			tradename: "",
			rif: "",
			type_provider: 0,
		},
		validationSchema: Yup.object({
			contact_name: Yup.string().required(
				"El nombre de contacto es obligatorio"
			),
			email: Yup.string()
				.email("El nombre de contacto no es valido")
				.required("El correo es obligatorio"),
			phone: Yup.string().required("El teléfono es obligatorio"),
			tradename: Yup.string().required("La razón social es obligatoria"),
			rif: Yup.string()
				.required("El rif es obligatorio")
				.matches(
					/^([VEJPGvejpg]{1})-([0-9]{8})-([0-9]{1}$)/g,
					"El rif no es valido, ej J-12345678-1"
				),
			type_provider: Yup.number()
				.min(1, "El tipo de proveedor es obligatorio")
				.required("El tipo de proveedor es obligatorio"),
		}),
		onSubmit: async (data) => {
			try {
				const {
					contact_name,
					email,
					phone,
					tradename,
					rif,
					type_provider,
				} = data;

				const response = await api.post("/provider", {
					name: contact_name,
					email: email,
					phone_number: phone,
					company: tradename,
					rif: rif,
					provider_type: type_provider,
				});

				if (response.status === 201) {
					toast({
						title: `Se guardaron los datos correctamente, espere mientras se redirection al siguiente paso`,
						status: "success",
					});

					const providerId = response.data.data.id;

					formik.resetForm();
					setTimeout(() => {
						toast.closeAll();
						router.push(
							`/pre-registration/step-2?provider=${providerId}`
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
						<Logo />

						<Heading fontSize={"xl"}>Paso 1/3</Heading>
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
									id='contact_name'
									isInvalid={
										formik.errors.contact_name &&
										formik.touched.contact_name
											? true
											: false
									}
								>
									<FormLabel>Nombre del Contacto</FormLabel>
									<Input
										type='text'
										value={formik.values.contact_name}
										onChange={formik.handleChange}
									/>
									<FormErrorMessage>
										{formik.touched.contact_name &&
											formik.errors.contact_name}
									</FormErrorMessage>
								</FormControl>

								<FormControl
									id='tradename'
									isInvalid={
										formik.errors.tradename &&
										formik.touched.tradename
											? true
											: false
									}
								>
									<FormLabel>Razón Social</FormLabel>
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
									id='email'
									isInvalid={
										formik.errors.email &&
										formik.touched.email
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
										{formik.touched.email &&
											formik.errors.email}
									</FormErrorMessage>
								</FormControl>

								<FormControl
									id='phone'
									isInvalid={
										formik.errors.phone &&
										formik.touched.phone
											? true
											: false
									}
								>
									<FormLabel>Teléfono de contacto</FormLabel>
									<Input
										type='text'
										value={formik.values.phone}
										onChange={formik.handleChange}
									/>

									<FormErrorMessage>
										{formik.touched.phone &&
											formik.errors.phone}
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
										{formik.touched.rif &&
											formik.errors.rif}
									</FormErrorMessage>
								</FormControl>

								<FormControl
									id='type_provider'
									isInvalid={
										formik.errors.type_provider &&
										formik.touched.type_provider
											? true
											: false
									}
								>
									<FormLabel>Tipo de proveedor</FormLabel>

									<Select
										placeholder='Seleccione un tipo de proveedor'
										value={formik.values.type_provider}
										onChange={formik.handleChange}
									>
										{typeProviders.map((provider: IOptions) => (
											<option
												value={provider.id}
												key={provider.id}
											>
												{provider.name}
											</option>
										))}
									</Select>

									<FormErrorMessage>
										{formik.touched.type_provider &&
											formik.errors.type_provider}
									</FormErrorMessage>
								</FormControl>
							</Stack>

							{/* <Stack spacing={10} marginBottom={3} marginTop={3}>
								<Stack
									direction={{
										base: "column",
										sm: "row",
									}}
									align={"start"}
									justify={"center"}
								>
									<Checkbox>
										Acepto los terminos de uso
									</Checkbox>
								</Stack>
							</Stack> */}

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

export default StepOne;
