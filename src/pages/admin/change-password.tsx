import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	useColorModeValue,
	FormErrorMessage,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	CloseButton,
	Image,
	Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import Logo from "@/components/Logo";


const ChangePassword = () => {
	const router = useRouter();
	const [errors, setErrors] = useState([]);

	const { login, mutate } = useAuth({ middleware: "guest" });

	const formik = useFormik({
		initialValues: {
			email: "test@test.com",
			password: "1234567890",
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

			} catch (error) {
				console.error("error ;", error);
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
			<Stack spacing={2} w={'full'} maxW={'md'}>
					<Stack align={"center"}>
						<Logo />
					</Stack>

					<Stack align={"center"}>
						<Heading fontSize={"md"}>
							Cambio de contraseña
						</Heading>
					</Stack>
					<Box
						rounded={"lg"}
						// bg={useColorModeValue("white", "gray.700")}
						// boxShadow={"lg"}
						p={8}
					>
						<form onSubmit={formik.handleSubmit}>
							<Stack spacing={4}>

								<FormControl
									id='password'
									isInvalid={
										formik.errors.password &&
										formik.touched.password
											? true
											: false
									}
								>
									<FormLabel>Nueva contraseña</FormLabel>
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

								<FormControl
									id='password'
									isInvalid={
										formik.errors.password &&
										formik.touched.password
											? true
											: false
									}
								>
									<FormLabel>Confirmar contraseña</FormLabel>
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

									{errors ?? (
										<Alert status='error'>
											<AlertIcon />
											<Box>
												<AlertTitle>Error!</AlertTitle>
												<AlertDescription>
													Por favor verifique sus
													datos
												</AlertDescription>
											</Box>
										</Alert>
									)}

									<Button
										bg={"brand.400"}
										color={"white"}
										_hover={{
											bg: "brand.500",
										}}
										type='submit'
									>
										Confirmar
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

export default ChangePassword;
