import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { extendTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import NextNProgress from 'nextjs-progressbar';

import Default from "@/layouts/default";


const colors = {
	brand: {
		400: "#4e73cf",
		500: "#345abb",
		600: "#2952b9",
		700: "#0634a6",
		800: "#092a66",
		900: "#1a365d",
	},
};

export const theme = extendTheme({ colors, components: {
	Steps,
} });

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	const excludePaths = ["admin/login", "admin/register", "pre-registration"];

	const exclude = excludePaths.some( (path) => router.pathname.includes(path) );

	return (
		<ChakraProvider theme={theme}>
				{ !exclude ? (
					<Default>
						<NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />

						<Component {...pageProps} />
					</Default>
				) : (
					<Component {...pageProps} />
				)}
		</ChakraProvider>
	);
}

export default MyApp;
