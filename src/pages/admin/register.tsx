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
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Logo from "@/components/Logo";

const register = () => {
	const [showPassword, setShowPassword] = useState(false);
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
					<Box


					>
						<Stack spacing={4}>
							<HStack>
								<Box>
									<FormControl id='firstName' isRequired>
										<FormLabel>Nombre</FormLabel>
										<Input type='text' />
									</FormControl>
								</Box>
								<Box>
									<FormControl id='lastName' isRequired>
										<FormLabel>Correo</FormLabel>
										<Input type='text' />
									</FormControl>
								</Box>
							</HStack>
							<FormControl id='password' isRequired>
								<FormLabel>Contraseña</FormLabel>
								<InputGroup>
									<Input
										type={
											showPassword ? "text" : "password"
										}
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
							</FormControl>
							<FormControl id='password' isRequired>
								<FormLabel>Confirmar contraseña</FormLabel>
								<InputGroup>
									<Input
										type={
											showPassword ? "text" : "password"
										}
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
							</FormControl>
							<Stack spacing={10} pt={2}>
								<Button
									loadingText='Submitting'
									size='lg'
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
									<Link color={"blue.400"}>Acceder</Link>
								</Text>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			</Flex>
		</Stack>
	);
};

export default register;
