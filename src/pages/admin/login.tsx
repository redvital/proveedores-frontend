import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Link,
	Button,
	Heading,
	FormErrorMessage,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Image,
	useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Logo from "@/components/Logo";
import { useAuth } from "@/hooks/auth";

const login = () => {
	const [errors, setErrors] = useState([]);

	const { login, mutate } = useAuth({ middleware: "guest" });
	const [loading, setLoading] = useState<boolean>(false);

	const toast = useToast();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("El email no es valido")
				.required("El email es obligatorio"),
			password: Yup.string()
				.required("El password es obligatorio")
				.min(6, "El mínimo permitido es de 6 caracteres"),
		}),
		onSubmit: async ({ email, password }) => {
			try {
				if (!formik.isValid) return;

				setLoading(true);

				await login(setErrors, { email, password });
			} catch (error) {
				console.error("error: ", error);
				setLoading(false);
				toast({
					title: `Error: ${error}`,
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
				<Stack spacing={2} w={"full"} maxW={"md"}>
					<Stack align={"center"}>
						<Logo />
					</Stack>

					<Stack align={"center"}>
						<Heading fontSize={"xl"}>
							Bienvenido al sistema de proveedores
						</Heading>
					</Stack>

					<Stack align={"center"}>
						<Heading fontSize={"md"}>Acceso al Sistema</Heading>
					</Stack>
					<Box
						rounded={"lg"}
						// bg={useColorModeValue("white", "gray.700")}
						// boxShadow={"lg"}
						p={8}
					>
						<form
							onSubmit={formik.handleSubmit}
							autoComplete={"false"}
						>
							<Stack spacing={4}>
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
									id='password'
									isInvalid={
										formik.errors.password &&
										formik.touched.password
											? true
											: false
									}
								>
									<FormLabel>Contraseña</FormLabel>
									<Input
										type='password'
										value={formik.values.password}
										onChange={formik.handleChange}
									/>

									<FormErrorMessage>
										{formik.touched.password &&
											formik.errors.password}
									</FormErrorMessage>
								</FormControl>
								<Stack spacing={10}>
									<Stack
										direction={{
											base: "column",
											sm: "row",
										}}
										align={"start"}
										justify={"space-between"}
									>
										{/* <Checkbox>Recordar sus datos?</Checkbox> */}
										<Link
											color={"brand.400"}
											href={"password-recovery"}
										>
											Olvido su contraseña?
										</Link>

										<Link
											color={"brand.400"}
											href='/admin/register'
										>
											Deseas registrarse?
										</Link>
									</Stack>

									<Button
										bg={"brand.400"}
										color={"white"}
										_hover={{
											bg: "brand.500",
										}}
										type='submit'
										isLoading = {loading}
										loadingText='Submitting'
									>
										Iniciar sesión{" "}
									</Button>
								</Stack>
							</Stack>
						</form>
					</Box>
				</Stack>
			</Flex>
		</Stack>
	);
};

export default login;
