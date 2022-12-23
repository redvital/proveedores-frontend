import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
	Image,
	FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Logo from "@/components/Logo";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "@/lib/api";
import { HttpStatusCode } from "../../common/enums/httpStatusCode";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

const register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);
	const toast = useToast();

	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("El nombre es obligatorio"),
			email: Yup.string()
				.email("El correo no es valido")
				.required("El correo es requerido"),
			password: Yup.string()
				.required("La contraseña es requerida")
				.min(6, "El mínimo permitido es de 6 caracteres"),
			password_confirmation: Yup.string()
				.required("la confirmación de contraseña es requerida")
				.oneOf(
					[Yup.ref("password"), null],
					"Las contraseñas no coinciden"
				),
		}),
		onSubmit: async ({ name, email, password, password_confirmation }) => {
			try {

				setLoading(true);

				if (!formik.isValid) return;

				const response = await api.post("/signup", {
					name,
					email,
					password,
					confirm_password: password_confirmation,
				});

				if (response.status === HttpStatusCode.Created) {
					toast({
						title: `Registrado correctamente`,
						status: "success",
					});
				
				setLoading(false);

					formik.resetForm();
				}
			} catch (error) {
				console.error("error ;", error);
				setLoading(false);
				toast({
					title: `Ocurrió un error al registrarse`,
					status: "error",
				});

			}
		},
	});

	return (
		<Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
			<Flex flex={1}>
				<Image
					alt={"Login Image"}
					objectFit={"cover"}
					w={"full"}
					height={"full"}
					src={"/images/store-int-01.png"}
				/>
			</Flex>
			<Flex p={8} flex={1} align={"center"} justify={"center"}>
				<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
					<Stack align={"center"}>
						<Logo />
					</Stack>

					<Stack align={"center"}>
						<Heading fontSize={"xl"}>
							Bienvenido al sistema de proveedores
						</Heading>
					</Stack>

					<Stack align={"center"}>
						<Heading fontSize={"md"}>Crear cuenta</Heading>
					</Stack>
					<Box>
						<Stack spacing={4}>
							<form onSubmit={formik.handleSubmit} autoComplete={"false"}>
								<HStack>
									<Box>
										<FormControl
											id='name'
											isInvalid={
												formik.errors.name &&
												formik.touched.name
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
												{formik.touched.name &&
													formik.errors.name}
											</FormErrorMessage>
										</FormControl>
									</Box>
									<Box>
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
									</Box>
								</HStack>
								<FormControl
									isInvalid={
										formik.errors.password &&
										formik.touched.password
											? true
											: false
									}
								>
									<FormLabel>Contraseña</FormLabel>
									<InputGroup>
										<Input
											id='password'
											type={
												showPassword
													? "text"
													: "password"
											}
											value={formik.values.password}
											onChange={formik.handleChange}
										/>

										<InputRightElement h={"full"}>
											<Button
												variant={"ghost"}
												onClick={() =>
													setShowPassword(
														(showPassword) =>
															!showPassword
													)
												}
											>
												{showPassword ? (
													<ViewIcon />
												) : (
													<ViewOffIcon />
												)}
											</Button>
										</InputRightElement>
									</InputGroup>
									<FormErrorMessage>
										{formik.touched.password &&
											formik.errors.password}
									</FormErrorMessage>
								</FormControl>
								<FormControl
									isInvalid={
										formik.errors.password_confirmation &&
										formik.touched.password_confirmation
											? true
											: false
									}
								>
									<FormLabel>Confirmar contraseña</FormLabel>
									<InputGroup>
										<Input
											id='password_confirmation'
											type={
												showPassword
													? "text"
													: "password"
											}
											value={
												formik.values
													.password_confirmation
											}
											onChange={formik.handleChange}
										/>
										<InputRightElement h={"full"}>
											<Button
												variant={"ghost"}
												onClick={() =>
													setShowPassword(
														(showPassword) =>
															!showPassword
													)
												}
											>
												{showPassword ? (
													<ViewIcon />
												) : (
													<ViewOffIcon />
												)}
											</Button>
										</InputRightElement>
									</InputGroup>
									<FormErrorMessage>
										{formik.touched.password_confirmation &&
											formik.errors.password_confirmation}
									</FormErrorMessage>
								</FormControl>
								<Stack spacing={10} pt={2}>
									<Button
										isLoading = {loading}
										loadingText='Submitting'
										size='lg'
										type='submit'
										bg={"blue.400"}
										color={"white"}
										_hover={{
											bg: "blue.500",
										}}
									
									>
										Registrarse
									</Button>
								</Stack>
								<Stack pt={6}>
									<Text align={"center"}>
										Ya tienes cuenta?{" "}
										<Link color={"blue.400"} href="/admin/login">Acceder</Link>
									</Text>
								</Stack>
							</form>
						</Stack>
					</Box>
				</Stack>
			</Flex>
		</Stack>
	);
};

export default register;
