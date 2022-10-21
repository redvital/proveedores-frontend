import { useAuth } from "@/hooks/auth";
import {
	ChevronRightIcon,
	ViewIcon,
	CopyIcon,
	EditIcon,
} from "@chakra-ui/icons";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
	Flex,
	Grid,
	GridItem,
	Input,
	InputGroup,
	InputRightElement,
	useColorModeValue,
	Text,
	Square,
	Box,
	HStack,
	Stack,
	TableContainer,
	Table,
	TableCaption,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Tfoot,
	Badge,
    Heading,
    Avatar,
    Center,
    Image,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "@chakra-ui/react";


const index = () => {
	const { user } = useAuth({ middleware: "auth" });

	return (
		<>
			<Breadcrumb
				spacing='8px'
				separator={<ChevronRightIcon color='gray.500' />}
			>
				<BreadcrumbItem>
					<BreadcrumbLink href='/admin/dashboard'>
						<Text fontSize='2xl'>Inicio</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink href='/admin/profile'>
						<Text fontSize='2xl'>Mi perfil</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

			<Box marginTop={4} marginBottom={10}>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>


							<Flex justify={"center"} mt={-12}>
								<Avatar
									size={"xl"}
									src={
										user?.profile_photo_url
									}
									alt={"Author"}
									css={{
										border: "2px solid white",
									}}
								/>
							</Flex>

							<Box p={6}>
								<Stack spacing={0} align={"center"} mb={5}>
									<Heading
										fontSize={"2xl"}
										fontWeight={500}
										fontFamily={"body"}
									>
										Nombre: {
                                            user?.name.toLocaleUpperCase()
                                        }
									</Heading>
                                    <Heading
										fontSize={"2xl"}
										fontWeight={500}
										fontFamily={"body"}
									>
										Correo: {
                                            user?.email
                                        }
									</Heading>
                                    <Heading
										fontSize={"2xl"}
										fontWeight={500}
										fontFamily={"body"}
									>
										Ultima actualización: {
                                            user?.updated_at
                                        }
									</Heading>
									<Text color={"gray.500"}>

									</Text>
								</Stack>

								<Stack
									direction={"row"}
									justify={"center"}
									spacing={6}
								>

								</Stack>


							</Box>
						</Box>

			</Box>
		</>
	);
};

export default index;
