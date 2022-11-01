import {
	Stack,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Select,
	Textarea,
	Button,
	Flex,
	Box,
	Heading,
	useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useColorModeValue } from "@chakra-ui/react";
import api from "@/lib/api";
import { useRouter } from "next/router";
import { getToken } from "@/services/local-storage.service";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";
import {
	getAccountTypesOptions,
	getBankOptions,
	getCurrencyOptions,
	getPaymentMethodOptions,
} from "@/services/options.service";
import { IOptions } from "@/interfaces/options.interface";
import { HttpStatusCode } from "@/app/common/enums/httpStatusCode"

const StepThree = () => {
	const router = useRouter();

	const toast = useToast();

	const providerId = router.query.provider;

	const token = getToken();

	const [paymentMethods, setPaymentMethods] = useState([]);
	const [banks, setBanks] = useState([]);

	const [currencies, setCurrencies] = useState([]);
	const [accountTypes, setAccountTypes] = useState([]);

	const loadSelects = async () => {
		await getAccountTypesOptions(setAccountTypes);
		await getBankOptions(setBanks);
		await getCurrencyOptions(setCurrencies);
		await getPaymentMethodOptions(setPaymentMethods);
	};

	useEffect(() => {
		loadSelects();
	}, []);

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
			document_number: Yup.string()
			.required("El rif es obligatorio")
			.matches(
				/^([VEJPGvejpg]{1})-([0-9]{8})-([0-9]{1}$)/g,
				"El rif no es valido, ej J-12345678-1 o j-12345678-1"
			),
			observation: Yup.string().required("La observación es requerida"),
		}),
		onSubmit: async (data) => {
			try {
				const {
					payment_method,
					bank,
					currency,
					account_type,
					account_number,
					beneficiary,
					document_number,
					observation,
				} = data;

				const response = await api.post(
					`provider/${providerId}/supplierbankdetails`,
					{
						bank: bank,
						currency: currency,
						method_of_payment: payment_method,
						account_type: account_type,
						account_number: account_number,
						account_holder: beneficiary,
						rif: document_number,
						supplier_id: providerId,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.status === HttpStatusCode.Created) {
					toast({
						title: "El registro fue completado con éxito",
						status: "success",
					});

					formik.resetForm();
					setTimeout(() => {
						toast.closeAll();
						router.push(`/admin/login`);
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
						<Heading fontSize={"xl"}>Paso 3/3</Heading>
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
										onChange={formik.handleChange}
									>
										{paymentMethods.map(
											(paymentMethod: IOptions) => (
												<option
													value={paymentMethod.id}
													key={paymentMethod.id}
												>
													{paymentMethod.name}
												</option>
											)
										)}
									</Select>
									<FormErrorMessage>
										{formik.touched.payment_method &&
											formik.errors.payment_method}
									</FormErrorMessage>
								</FormControl>
								<FormControl
									id='bank'
									isInvalid={
										formik.touched.bank &&
										formik.errors.bank
											? true
											: false
									}
								>
									<FormLabel>Banco</FormLabel>

									<Select
										placeholder='Select option'
										value={formik.values.bank}
										onChange={formik.handleChange}
									>
										{banks.map((bank: IOptions) => (
											<option
												value={bank.id}
												key={bank.id}
											>
												{bank.name}
											</option>
										))}
									</Select>

									<FormErrorMessage>
										{formik.touched.bank &&
											formik.errors.bank}
									</FormErrorMessage>
								</FormControl>

								<FormControl
									id='currency'
									isInvalid={
										formik.errors.currency &&
										formik.errors.currency
											? true
											: false
									}
								>
									<FormLabel>Moneda</FormLabel>
									<Select
										placeholder='Select option'
										value={formik.values.currency}
										onChange={formik.handleChange}
									>
										{currencies.map(
											(currency: IOptions) => (
												<option
													value={currency.id}
													key={currency.id}
												>
													{currency.name}
												</option>
											)
										)}
									</Select>

									<FormErrorMessage>
										{formik.touched.currency &&
											formik.errors.currency}
									</FormErrorMessage>
								</FormControl>

								<FormControl
									id='account_type'
									isInvalid={
										formik.errors.account_type &&
										formik.errors.account_type
											? true
											: false
									}
								>
									<FormLabel>Tipo de cuenta</FormLabel>
									<Select
										placeholder='Select option'
										value={formik.values.account_type}
										onChange={formik.handleChange}
									>
										{accountTypes.map(
											(accountType: IOptions) => (
												<option
													value={accountType.id}
													key={accountType.id}
												>
													{accountType.name}
												</option>
											)
										)}
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
										formik.errors.beneficiary &&
										formik.errors.beneficiary
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
									isInvalid={
										formik.errors.document_number
											? true
											: false
									}
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
										formik.errors.observation &&
										formik.errors.observation
											? true
											: false
									}
								>
									<FormLabel>Observación</FormLabel>
									<Textarea
										placeholder='Escribe tu observación o comentario'
										value={formik.values.observation}
										onChange={formik.handleChange}
									/>
									<FormErrorMessage>
										{formik.touched.observation &&
											formik.errors.observation}
									</FormErrorMessage>
								</FormControl>
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
export default StepThree;
