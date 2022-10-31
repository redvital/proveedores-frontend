import {
	Button,
	Flex,
	Heading,
	Image,
	Link,
	Stack,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";

const Hero = () => {
	return (
		<Stack minH={"70vh"} direction={{ base: "column", md: "row" }}>
			<Flex flex={1}>
				<Image
					alt={"Chofer 01"}
					objectFit={"contain"}
					src={"/images/chofer-01.png"}
				/>
			</Flex>
			<Flex p={8} flex={1} align={"center"} justify={"center"}>
				<Stack spacing={6} w={"full"} maxW={"lg"}>
					<Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
						<Text
							as={"span"}
							position={"relative"}
							_after={{
								content: "''",
								width: "full",
								height: useBreakpointValue({
									base: "20%",
									md: "30%",
								}),
								position: "absolute",
								bottom: 1,
								left: 0,
								bg: "blue.400",
								zIndex: -1,
							}}
						>
							Bienvenido a Proveedores
						</Text>
						<br />{" "}
						<Text color={"blue.400"} as={"span"}>
							Redvital®
						</Text>{" "}
					</Heading>
					<Text
						fontSize={{ base: "lg", lg: "lg" }}
						color={"gray.500"}
						textAlign={"justify"}
					>
						Agradecemos cargar sus productos claramente,
						encarecidamente solicitamos la carga de una imagen por
						producto para poder nosotros identificarlo
						inmediatamente. La carga de producto debe ser cargada
						con una imagen de referencia, para que nuestros
						analistas puedan identificarlo sin problema,
						recomendamos que las imágenes tenga un tamaño de 500px x
						500 px, en jpg.
					</Text>
					<Stack
						direction={{ base: "column", md: "row" }}
						spacing={4}
					>
						<Link href='/admin/products/create'>
							<Button
								rounded={"full"}
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
							>
								Crear Producto
							</Button>
						</Link>
					</Stack>
				</Stack>
			</Flex>
		</Stack>
	);
};

export default Hero;
