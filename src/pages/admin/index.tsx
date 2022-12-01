import { HttpStatusCode } from "@/app/common/enums/httpStatusCode";
import { Box, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";

const index = () => {
	const toast = useToast();

	const formik = useFormik({
		initialValues: {
			import: "",
		},
		onSubmit: async (values: any) => {
			console.log(values);

			const formData = new FormData();
			for (let value in values) {
				formData.append(value, values[value]);
			}

			const response = await axios.post(
				"http://localhost:8000/api/supplier/2/products-import",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);

      console.log(response);


			if (response.status === HttpStatusCode.Ok) {
				toast({
					title: `Proceso completado correctamente!`,
					status: "success",
				});

				formik.resetForm();
			}
		},
	});

	return (
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
					<button type='submit'>Submit</button>
				</form>
			</Box>
		</div>
	);
};

export default index;
