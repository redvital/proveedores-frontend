import {
	Stack,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Select,
	Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterStepThree = () => {
	const formik = useFormik({
		initialValues: {
			payment_method: "",
			bank: "",
			currency: "",
			account_type: "",
			account_number: "",
			beneficiary: "",
			document_number: "",
			observation: "",
		},
		validationSchema: Yup.object({
			payment_method: Yup.string().required(
				"El metodo de pago es requerido"
			),
			bank: Yup.string().required("El banco es requerido"),
			currency: Yup.string().required("La moneda es requerida"),
			account_type: Yup.string().required(
				"El tipo de cuenta es requerida"
			),
			account_number: Yup.string().required(
				"El número de cuenta es requerido"
			),
			beneficiary: Yup.string().required("El beneficiario es requerido"),
			document_number: Yup.string().required(
				"El número de documento es requerido"
			),
			observation: Yup.string().required("La observación es requerida"),
		}),
		onSubmit: async (data) => {},
	});

	return (
		<>
			<Stack spacing={4} marginBottom={4}>
				<FormControl
					id='payment_method'
					isInvalid={
						formik.errors.payment_method &&
						formik.errors.payment_method
							? true
							: false
					}
				>
					<FormLabel>Formas de pago </FormLabel>
					<Select
						placeholder='Select option'
						value={formik.values.payment_method}
					>
						<option value='option1'>Option 1</option>
						<option value='option2'>Option 2</option>
						<option value='option3'>Option 3</option>
					</Select>
					<FormErrorMessage>
						{formik.touched.payment_method &&
							formik.errors.payment_method}
					</FormErrorMessage>
				</FormControl>
				<FormControl
					id='bank'
					isInvalid={
						formik.touched.bank && formik.errors.bank ? true : false
					}
				>
					<FormLabel>Banco</FormLabel>

					<Select
						placeholder='Select option'
						value={formik.values.bank}
					>
						<option value='option1'>Option 1</option>
						<option value='option2'>Option 2</option>
						<option value='option3'>Option 3</option>
					</Select>

					<FormErrorMessage>
						{formik.touched.bank && formik.errors.bank}
					</FormErrorMessage>
				</FormControl>

				<FormControl
					id='currency'
					isInvalid={
						formik.errors.currency && formik.errors.currency
							? true
							: false
					}
				>
					<FormLabel>Moneda</FormLabel>
					<Select
						placeholder='Select option'
						value={formik.values.currency}
					>
						<option value='option1'>Option 1</option>
						<option value='option2'>Option 2</option>
						<option value='option3'>Option 3</option>
					</Select>

					<FormErrorMessage>
						{formik.touched.currency && formik.errors.currency}
					</FormErrorMessage>
				</FormControl>

				<FormControl
					id='account_type'
					isInvalid={
						formik.errors.account_type && formik.errors.account_type
							? true
							: false
					}
				>
					<FormLabel>Tipo de cuenta</FormLabel>
					<Select
						placeholder='Select option'
						value={formik.values.account_type}
					>
						<option value='option1'>Option 1</option>
						<option value='option2'>Option 2</option>
						<option value='option3'>Option 3</option>
					</Select>

					<FormErrorMessage>
						{formik.touched.account_type &&
							formik.errors.account_type}
					</FormErrorMessage>
				</FormControl>

				<FormControl
					id='account_number'
					isInvalid={
						formik.errors.account_number &&
						formik.errors.account_number
							? true
							: false
					}
				>
					<FormLabel>Numero de cuenta</FormLabel>
					<Input
						type='text'
						value={formik.values.account_number}
						onChange={formik.handleChange}
					/>

					<FormErrorMessage>
						{formik.touched.account_number &&
							formik.errors.account_number}
					</FormErrorMessage>
				</FormControl>

				<FormControl
					id='beneficiary'
					isInvalid={
						formik.errors.beneficiary && formik.errors.beneficiary
							? true
							: false
					}
				>
					<FormLabel>Beneficiario</FormLabel>
					<Input
						type='text'
						value={formik.values.beneficiary}
						onChange={formik.handleChange}
					/>
					<FormErrorMessage>
						{formik.touched.beneficiary &&
							formik.errors.beneficiary}
					</FormErrorMessage>
				</FormControl>

				<FormControl
					id='document_number'
					isInvalid={formik.errors.document_number ? true : false}
				>
					<FormLabel>CI / RIF</FormLabel>
					<Input
						type='text'
						value={formik.values.document_number}
						onChange={formik.handleChange}
					/>
					<FormErrorMessage>
						{formik.touched.document_number &&
							formik.errors.document_number}
					</FormErrorMessage>
				</FormControl>

				<FormControl
					id='observation'
					isInvalid={
						formik.errors.observation && formik.errors.observation
							? true
							: false
					}
				>
					<FormLabel>Observacion</FormLabel>
					<Textarea
						placeholder='Escribe tu observacion o comentario'
						value={formik.values.observation}
					/>
					<FormErrorMessage>
						{formik.touched.observation &&
							formik.errors.observation}
					</FormErrorMessage>
				</FormControl>
			</Stack>
		</>
	);
};

export default RegisterStepThree;
