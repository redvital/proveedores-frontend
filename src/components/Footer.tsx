import {
	Box,
	chakra,
	Container,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import {
	FiFacebook,
	FiInstagram
} from "react-icons/fi";

const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<chakra.button
			bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
			rounded={"full"}
			w={8}
			h={8}
			cursor={"pointer"}
			as={"a"}
			href={href}
			display={"inline-flex"}
			alignItems={"center"}
			justifyContent={"center"}
			transition={"background 0.3s ease"}
			_hover={{
				bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

export default function SmallWithSocial() {
	return (
		<Box
			style={{
				position: "sticky",
				bottom: 0,
				width: "100%",
			}}
			bg={useColorModeValue("gray.50", "gray.900")}
			color={useColorModeValue("gray.700", "gray.200")}
			sx={{ position: '-webkit-sticky', bottom: '0', }}
		>
			<Container
				as={Stack}
				maxW={"6xl"}
				py={4}
				direction={{ base: "column", md: "row" }}
				spacing={4}
				justify={{ base: "center", md: "space-between" }}
				align={{ base: "center", md: "center" }}
			>
				<Text>© 2022 Redvital. Todos los derechos reservados </Text>
				<Stack direction={"row"} spacing={6}>
					<SocialButton label={"Facebook"} href={"#"}>
						<FiFacebook />
					</SocialButton>
					<SocialButton label={"Instagram"} href={"#"}>
						<FiInstagram />
					</SocialButton>
				</Stack>
			</Container>
		</Box>
	);
}
