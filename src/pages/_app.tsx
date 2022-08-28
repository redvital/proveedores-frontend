import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

import { extendTheme } from "@chakra-ui/react";
import Default from "../layouts/default";
// import { AuthProvider } from "../contexts/auth/AuthProvider";
import { useRouter } from "next/router";
// import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
	brand: {
		900: "#1a365d",
		800: "#153e75",
		700: "#2a69ac",
	},
};

export const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();


	const excludePaths = ["admin/login", "admin/register", "pre-registration"];

	const exclude = excludePaths.some( (path) => router.pathname.includes(path) );

	return (
		<ChakraProvider theme={theme}>
				{ !exclude ? (
					<Default>
						<Component {...pageProps} />
					</Default>
				) : (
					<Component {...pageProps} />
				)}
		</ChakraProvider>
	);
}

export default MyApp;
