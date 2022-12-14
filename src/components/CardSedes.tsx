import { ISedes } from "@/interfaces/sedes.interface";
import {
	Box,
	Center,
	useColorModeValue,
	Heading,
	Text,
	Stack,
	Image,
	Link,
} from "@chakra-ui/react";
import { NextPage } from "next";

interface Props {
	sede: ISedes;
}

export const CardSedes: NextPage<Props> = ({ sede }) => {
	return (
		<Link>
			<Center py={12}>
				<Box
					role={"group"}
					p={6}
					maxW={"400px"}
					w={"full"}
					bg={useColorModeValue("white", "gray.800")}
					boxShadow={"2xl"}
					rounded={"lg"}
					pos={"relative"}
					zIndex={1}
				>
					<Box
						rounded={"lg"}
						mt={-12}
						pos={"relative"}
						// height={"300px"}
						_after={{
							transition: "all .3s ease",
							content: '""',
							w: "full",
							h: "full",
							pos: "absolute",
							top: 5,
							left: 0,
							// backgroundImage: `url(${IMAGE})`,
							filter: "blur(15px)",
							zIndex: -1,
						}}
						_groupHover={{
							_after: {
								filter: "blur(20px)",
							},
						}}
					>
						<Image
							rounded={"xl"}
							height={100}
							width={400}
							objectFit={"contain"}
							src={"/images/store-01.png"}
						/>
					</Box>
					<Stack pt={10} align={"center"}>
						<Heading
							fontSize={"2xl"}
							fontFamily={"body"}
							fontWeight={500}
						>
							{sede.name}
						</Heading>
						<Stack direction={"row"} align={"center"}></Stack>
					</Stack>
				</Box>
			</Center>
		</Link>
	);
};
