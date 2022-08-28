import React, { useRef } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import {
	Box,
	Button,
	Flex,
	Heading,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";

import RegisterStepOne, { IRegisterStepOne } from "../components/RegisterStepOne";
import RegisterStepTwo from "../components/RegisterStepTwo";
import RegisterStepThree from "../components/RegisterStepThree";

const preRegistration = () => {
	const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
		initialStep: 0,
	});

	const steps = [
		{ label: "Paso 1" },
		{ label: "Paso 2" },
		{ label: "Paso 3" },
	];

  const validateStep = (nextStep: Function, activeStep: number) => {

    // console.log(activeStep);

    // nextStep()
    handleClick()
  }

  const childRef = useRef<IRegisterStepOne>(null);

  const handleClick = () => {
    childRef.current?.showAlert();
  };

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack
				spacing={8}
				mx={"auto"}
				maxW={"lg"}
				py={12}
				px={6}
				width={700}
			>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Pre Registro
					</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Flex flexDir='column' width='100%'>
						<Stack align={"center"}>
							<Heading fontSize={"md"} marginBottom={4}>
								Registro de proveedores - Datos de acceso
							</Heading>
						</Stack>

						<Steps activeStep={activeStep}>
							<Step
								label={steps[0].label}
								key={steps[0].label}
								marginBottom={4}
							>
								<RegisterStepOne ref={childRef} />
							</Step>

							<Step
								label={steps[1].label}
								key={steps[1].label}
								marginBottom={4}
							>
								<RegisterStepTwo />
							</Step>

							<Step
								label={steps[2].label}
								key={steps[2].label}
								marginBottom={4}
							>
								<RegisterStepThree />
							</Step>
						</Steps>

						{activeStep === steps.length ? (
							<Flex
								width='100%'
								justifyContent={"space-between"}
								marginTop={4}
							>
								<Button
									onClick={reset}
									bg={"red.400"}
									color={"white"}
									_hover={{
										bg: "red.500",
									}}
								>
									Borrar todo
								</Button>

								<Button
									bg={"green.400"}
									color={"white"}
									_hover={{
										bg: "green.500",
									}}
									isDisabled={activeStep === 0}
									onClick={() => console.log("Sending data")}
								>
									Enviar datos
								</Button>
							</Flex>
						) : (
							<Flex width='100%' justify='flex-end' marginTop={4}>
								<Button
									bg={"gray.400"}
									color={"white"}
									_hover={{
										bg: "gray.500",
									}}
									isDisabled={activeStep === 0}
									mr={4}
									onClick={prevStep}
								>
									Regresar
								</Button>

								<Button
									bg={"green.400"}
									color={"white"}
									_hover={{
										bg: "green.500",
									}}
									onClick={()=> validateStep(nextStep , activeStep)}
								>
									{activeStep === steps.length - 1
										? "Terminar"
										: "Siguiente"}
								</Button>
							</Flex>
						)}
					</Flex>
				</Box>
			</Stack>
		</Flex>
	);
};

export default preRegistration;
