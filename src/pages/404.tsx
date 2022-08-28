import { Box, Heading, Text, Button, Link } from "@chakra-ui/react";

export default function NotFound() {
	return (
		<Box textAlign='center' py={10} px={6}>
			<Heading
				display='inline-block'
				as='h2'
				size='3xl'
				bgGradient='linear(to-r, brand.700, brand.800)'
				backgroundClip='text'
			>
				404
			</Heading>
			<Text fontSize='18px' mt={3} mb={2}>
				Página no encontrada
			</Text>
			<Text color={"brand.500"} mb={6}>
				La página que busca no parece existir
			</Text>

			<Link href='/admin/dashboard'>
				<Button
					colorScheme='blue'
					bgGradient='linear(to-r, brand.400, brand.500, brand.600)'
					color='white'
					variant='solid'
				>
					Ir al Dashboard
				</Button>
			</Link>
		</Box>
	);
}
