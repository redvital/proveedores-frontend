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


const PasswordRecovery = () => {
	const router = useRouter();
	const [errors, setErrors] = useState([]);

	// const formik = useFormik({
	// 	initialValues: {
	// 		email: "test@test.com",
	// 		password: "1234567890",
	// 	},
	// 	validationSchema: Yup.object({
	// 		email: Yup.string()
	// 			.email("El email no es valido")
	// 			.required("El email es obligatorio"),
	// 		password: Yup.string()
	// 			.required("El password es obligatorio")
	// 			.min(6, "El mínimo permitido es de 6 caracteres"),
	// 	}),
	// 	onSubmit: async ({ email, password }) => {
	// 		try {
	// 			if (!formik.isValid) return;

	// 		} catch (error) {
	// 			console.error("error ;", error);
	// 		}
	// 	},
	// });

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
				<Flex
					minH={"100vh"}
					align={"center"}
					justify={"center"}
					// bg={useColorModeValue("gray.50", "gray.800")}
				>
					<Stack
						spacing={4}
						w={"full"}
						maxW={"md"}
						// bg={useColorModeValue("white", "gray.700")}
						// rounded={"xl"}
						// boxShadow={"lg"}
						p={6}
						my={12}
					>
						<Stack align={"center"}>
							<Logo />
						</Stack>

						<Stack align={"center"}>
							<Heading fontSize={"md"}>
								Olvido su contraseña?
							</Heading>
						</Stack>

						<FormControl id='email' isRequired>
							<FormLabel>Correo</FormLabel>
							<Input
								placeholder='your-email@example.com'
								_placeholder={{ color: "gray.500" }}
								type='email'
							/>
						</FormControl>
						<Stack spacing={6}>
							<Text size={"lg"}>
								Se enviará un correo para restablecer su clave.
								En su correo haga click al url para generar una
								nueva contraseña.
							</Text>
						</Stack>

						<Stack spacing={6}>
							<Button
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
							>
								Enviar
							</Button>
						</Stack>

						<Stack
							direction={{
								base: "column",
								sm: "row",
							}}
							align={"start"}
							justify={"space-between"}
						>
							<Link href="/admin/register" color={"brand.400"}>Deseas registrarse?</Link>
						</Stack>
					</Stack>
				</Flex>
			</Flex>
		</Stack>
	);
};

export default PasswordRecovery;
