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
import { useContext, useState } from "react";
import * as Yup from "yup";
import Logo from "@/components/Logo";


import { loginUser, profileUser } from "@/services/auth.service";

import { setToken, setUserStorage } from '../../services/local-storage.service';
import { useRouter } from "next/router"
import { TodoContext } from "@/app/context/todoContext"
import { TodoContextType } from "@/app/types/todo"


const login = () => {
	const [errors, setErrors] = useState([]);

	const router = useRouter();

	const {  updateTodo } = useContext(TodoContext) as TodoContextType;

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





				const response = await loginUser({email, password});


				if(response.status === 200) {

					setToken(response.data.access_token)

					const resp = await profileUser(response.data.access_token);

					if(resp.status === 200) {

						setUserStorage(resp.data);


						// console.log('DataCtx: ', todos)


						toast({
							title: "Usuario logueado correctamente",
							status: "success",
						})


						setTimeout(() => {
							router.push("/admin/dashboard");
						}, 2000);


					}
				}




			} catch (error) {
				console.error("error: ", error);

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
			<Stack spacing={2} w={'full'} maxW={'md'}>
					<Stack align={"center"}>
						<Logo />
					</Stack>

					<Stack align={"center"}>
						<Heading fontSize={"xl"}>
							Bienvenido al sistema de proveedores
						</Heading>
					</Stack>

					<Stack align={"center"}>
						<Heading fontSize={"md"}>
							Acceso al Sistema
						</Heading>
					</Stack>
					<Box
						rounded={"lg"}
						// bg={useColorModeValue("white", "gray.700")}
						// boxShadow={"lg"}
						p={8}
					>
						<form onSubmit={formik.handleSubmit} autoComplete={"false"}>
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
										<Link color={"brand.400"} href={"password-recovery"}>
											Olvido su contraseña?
										</Link>

										<Link color={"brand.400"} href="/admin/register">
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
