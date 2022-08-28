import { forwardRef, useImperativeHandle, useRef } from "react";
import {
	Stack,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Checkbox,
	Select,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

export interface IRegisterStepOne {
	showAlert(): void;
}

const RegisterStepOne = forwardRef<IRegisterStepOne, {}>((props, ref) => {
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
			phone: Yup.string().required("El telefono es obligatorio"),
			tradename: Yup.string().required("La razon social es obligatoria"),
			rif: Yup.string().required("El rif es obligatorio"),
			type_provider: Yup.number().required(
				"El tipo de proveedor es obligatorio"
			),
		}),
		onSubmit: async (data) => {},
	});

	const parentToChild = () => {
		console.log(formik.values);
	};

	useImperativeHandle(ref, () => ({
		showAlert() {
			alert("Child Function Called");
			console.log("hello world");
		},
	}));

	return (
		<>
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
						<FormLabel>Telefono de contacto</FormLabel>
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
							placeholder='Select option'
							value={formik.values.type_provider}
						>
							<option value='option1'>Option 1</option>
							<option value='option2'>Option 2</option>
							<option value='option3'>Option 3</option>
						</Select>

						<FormErrorMessage>
							{formik.touched.rif && formik.errors.rif}
						</FormErrorMessage>
					</FormControl>
				</Stack>

				<Stack spacing={10} marginBottom={3} marginTop={3}>
					<Stack
						direction={{
							base: "column",
							sm: "row",
						}}
						align={"start"}
						justify={"center"}
					>
						<Checkbox>Acepto los terminos de uso</Checkbox>
					</Stack>
				</Stack>
			</form>
		</>
	);
});

export default RegisterStepOne;
