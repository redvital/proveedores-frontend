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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router"
import { useState } from "react"
import * as Yup from "yup";

import { useAuth } from "@/hooks/auth";

const login = () => {

	const router = useRouter();
	const [errors, setErrors] = useState([])

	const { login } = useAuth({ middleware: "guest" });

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
				if(!formik.isValid) return
				await login(setErrors, { email, password});
			} catch (error) {
				console.error(error);
			}
		},
	});

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"}>
						Iniciar sesión en su cuenta
					</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<form onSubmit={formik.handleSubmit}>
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
									direction={{ base: "column", sm: "row" }}
									align={"start"}
									justify={"space-between"}
								>
									<Checkbox>Recordar sus datos?</Checkbox>
									<Link color={"blue.400"}>
										Olvido su contraseña?
									</Link>
								</Stack>
								<Button
									bg={"blue.400"}
									color={"white"}
									_hover={{
										bg: "blue.500",
									}}
									type='submit'
								>
									Iniciar sesión{" "}
								</Button>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
};


export default login;



