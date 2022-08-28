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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterStepTwo = () => {
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
		},
		validationSchema: Yup.object({
			address: Yup.string().required("La direección es requerida"),
			state: Yup.string().required("El estado es requerido"),
			postal_code: Yup.string().required("El código postal es requerido"),
			web_site: Yup.string().required("El sitio web es requerido"),
			tradename: Yup.string().required("La razón social es requerida"),
			payment: Yup.string().required("El método de pago es requerido"),
			enabled: Yup.string().required("El estado es requerido"),
			commercial_register: Yup.string().required(
				"El registro comercial es requerido"
			),
			rif: Yup.string().required("El RIF es requerido"),
			document_identity: Yup.string().required(
				"El documento de identidad es requerido"
			),
		}),
		onSubmit: async (data) => {},
	});

	return (
		<>
			<Stack spacing={4} marginBottom={4}>
				<FormControl
					id='address'
					isInvalid={
						formik.touched.address && formik.errors.address
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
						{formik.touched.address && formik.errors.address}
					</FormErrorMessage>
				</FormControl>

				<FormControl
					id='state'
					isInvalid={
						formik.touched.state && formik.errors.state
							? true
							: false
					}
				>
					<FormLabel>Estado</FormLabel>

					<Select
						placeholder='Select option'
						value={formik.values.state}
					>
						<option value='option1'>Option 1</option>
						<option value='option2'>Option 2</option>
						<option value='option3'>Option 3</option>
					</Select>

					<FormErrorMessage>
						{formik.touched.state && formik.errors.state}
					</FormErrorMessage>
				</FormControl>

				<FormControl
					id='postal_code'
					isInvalid={
						formik.touched.postal_code && formik.errors.postal_code
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
						formik.touched.web_site && formik.errors.web_site
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
						{formik.touched.web_site && formik.errors.web_site}
					</FormErrorMessage>
				</FormControl>

				<FormControl
					id='tradename'
					isInvalid={
						formik.touched.tradename && formik.errors.tradename
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
						{formik.touched.tradename && formik.errors.tradename}
					</FormErrorMessage>
				</FormControl>

				<FormControl
					id='payment'
					isInvalid={
						formik.touched.payment && formik.errors.payment
							? true
							: false
					}
				>
					<FormLabel>Condicion de pago</FormLabel>

					<Select
						placeholder='Select option'
						value={formik.values.payment}
					>
						<option value='option1'>Option 1</option>
						<option value='option2'>Option 2</option>
						<option value='option3'>Option 3</option>
					</Select>

					<FormErrorMessage>
						{formik.touched.payment && formik.errors.payment}
					</FormErrorMessage>
				</FormControl>

				<FormControl
					id='enabled'
					isInvalid={
						formik.touched.enabled && formik.errors.enabled
							? true
							: false
					}
				>
					<FormLabel>Habilitado para</FormLabel>
					<Stack spacing={5} direction='row'>
						<Checkbox colorScheme='green' defaultChecked>
							Retenciones
						</Checkbox>
						<Checkbox colorScheme='green' defaultChecked>
							Consignaciones
						</Checkbox>
					</Stack>

					<FormErrorMessage>
						{formik.touched.enabled && formik.errors.enabled}
					</FormErrorMessage>
				</FormControl>
			</Stack>

			<Stack align={"center"}>
				<Flex flexDir='column' width='100%'>
					<Stack align={"center"}>
						<Heading fontSize={"md"} marginBottom={4}>
							Adjuntar documentos
						</Heading>
					</Stack>

					<FormControl
						id='commercial_register
						'
						isInvalid={
							formik.touched.commercial_register &&
							formik.errors.commercial_register
								? true
								: false
						}
					>
						<FormLabel>Registro mercantil</FormLabel>
						<Input
							type='file'
							value={formik.values.commercial_register}
							onChange={formik.handleChange}
						/>

						<FormErrorMessage>
							{formik.touched.commercial_register &&
								formik.errors.commercial_register}
						</FormErrorMessage>
					</FormControl>

					<FormControl
						id='rif'
						isInvalid={
							formik.touched.rif && formik.errors.rif
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
							{formik.touched.rif && formik.errors.rif}
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
						<FormLabel>CI del Representante</FormLabel>
						<Input
							type='file'
							value={formik.values.document_identity}
							onChange={formik.handleChange}
						/>

						<FormErrorMessage>
							{formik.touched.document_identity &&
								formik.errors.document_identity}
						</FormErrorMessage>
					</FormControl>
				</Flex>
			</Stack>
		</>
	);
};

export default RegisterStepTwo;
