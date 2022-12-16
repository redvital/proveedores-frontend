import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { HttpStatusCode } from "@/app/common/enums/httpStatusCode";
import { useAuth } from "@/hooks/auth";
import api from "@/lib/api";
import { getToken } from "@/services/local-storage.service";
import { Box, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";

export const ModalImportProduct = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [size, setSize] = React.useState("md");

	const handleSizeClick = (newSize: string) => {
		setSize(newSize);
		onOpen();
	};

	const { user } = useAuth({ middleware: "auth" });
	const toast = useToast();

	const providerId = 1

	const token = getToken();

	const formik = useFormik({
		initialValues: {
			import: "",
		},
		onSubmit: async (values: any) => {
			const formData = new FormData();
			for (let value in values) {
				formData.append(value, values[value]);
			}

			const response = await api.post(
				`/supplier/${providerId}/products-import`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === HttpStatusCode.Ok) {
				toast({
					title: `Proceso completado correctamente!`,
					status: "success",
				});

				onClose();

				formik.resetForm();

				formik.setFieldValue("import", null);
			} else {
				toast({
					title: `Error al procesar el archivo!`,
					status: "error",
				});
			}
		},
	});

	return (
		<>
			<Button
				onClick={() => handleSizeClick(size)}
				colorScheme='blue'
				bgGradient='linear(to-r, brand.400, brand.500, brand.600)'
				color='white'
				variant='solid'
				size={"lg"}
			>
				Importar Productos
			</Button>

			<Modal onClose={onClose} size={size} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Importación Masiva de Productos</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div>
							<Box>
								<form
									onSubmit={formik.handleSubmit}
									encType='multipart/form-data'
								>
									<Input
										type='file'
										name='import'
										multiple={false}
										accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
										onChange={(e) =>
											formik.setFieldValue(
												"import",
												e.currentTarget.files[0]
											)
										}
									/>
								</form>
							</Box>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							type='submit'
							onClick={() => formik.handleSubmit()}
						>
							Procesar
						</Button>
						<Button onClick={onClose}>Cerrar</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
