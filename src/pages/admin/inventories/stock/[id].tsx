import { useAuth } from "@/hooks/auth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
	useColorModeValue,
	Text,
	Box,
	Stack,
    Stat,
    Circle,
    Container,
    Image
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import PaginationTable from "@/components/PaginationTable";
import { getStock } from "@/services/stock.service";
import { IStock } from "@/interfaces/stock.interface";

const index = () => {
    const { user } = useAuth({ middleware: "auth" });
    const router = useRouter();
    const { id } = router.query;

    const [stock, setStock] = useState <IStock[]> ([]);

	const loadSelects = async () => {
		await getStock(setStock);
	};

    useEffect(() => {
		loadSelects();
	}, []);


    const uri = `/supplier/1/products`;

    const columns = [
		"#",
		"Producto",
		"Ultima Cantidad Adquirida",
		"Ultima Fecha de Adquisicion",
		"Cantidad Disponible",
		"Precio de Venta",
		"Condicion",
        "SKU Provider"
	];

	const columnsTable = [
		"id",
		"name",
		"sku_provider",
		"cost_per_unit",
		"cost_per_package",
		"updated_at",
	];

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
                            <BreadcrumbLink href='/admin/inventories'>
                                <Text fontSize='2xl'>Inventarios</Text>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/admin/stores'>
                                <Text fontSize='2xl'>Stock</Text>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                 </Breadcrumb>

                 <Stat bg='white' borderRadius={'lg'} boxShadow={"2xl"} mt={4} mr={5}>
                    <Flex m={4}>
                            <Container ml={6}>
                                <Circle size='120px' color='white' ml={200} my={2}>
                                       <Image
                                        alt={"Chofer 01"}
                                        objectFit={"contain"}
                                        src={"/images/store-02.svg"}
                                    />
                                </Circle>
                                <Flex>
                                    <Text fontSize='sm' as='b'>Proveedor :&nbsp; </Text> 
                                    <Text fontSize='sm'>Super Drogeria</Text>
                                </Flex>
                                <Flex mt={2} mb={3}>
                                    <Text fontSize='sm' as='b'>Ultimo Despacho : &nbsp;</Text>
                                    <Text fontSize='sm'>24/Jul/2022</Text>
                                </Flex>
                            </Container>
                            <Container mt={10} ml={0}>
                                    <Text fontSize='m' as='b'>
                                    Sucursal
                                    </Text>
                                    <br/>
                                    <Text fontSize='3xl' as='b'>
                                        Valencia
                                    </Text>
                                    <br/>
                                  {/* <Button
                                        h='2.75rem'
                                        size='lg'
                                        color='white'
                                        mt={8}
                                        >
                                        Generar Cotización
                                      </Button> */    }
                            </Container> 
                            <Container my={5}>
                              {/*  <Flex>
                                    <Text fontSize='sm' as='b'>Gerente de Tienda:&nbsp; </Text> 
                                    <Text fontSize='sm'>Carlos Perez</Text>
                               </Flex> 
                                <Flex>
                                    <Text fontSize='sm' as='b' >Telefono: &nbsp;</Text> 
                                    <Text fontSize='sm'>(0241)-555.55.55</Text>
                                </Flex> 
                                <Flex>
                                    <Text fontSize='sm' as='b' >Correo: &nbsp;</Text> 
                                    <Text fontSize='sm'>compras-valencia@gmail.com</Text>
                                </Flex>
                                */}
                                <Text fontSize='sm' as='b'>Direccion:</Text> 
                                <Text fontSize='sm'> Autopista regional del Centro, 
                                            entre distribuidor Divenca y el distribuidor San Blas, 
                                            sentido Caracas - Valencia, al lado de Makro, Valencia 2001,Carabobo
                                </Text>
                                   
                            </Container>

                    </Flex>
                </Stat>

                <Flex marginTop={5} w={"100%"} h={10} gap={5} justifyContent='start' ml= {2}>
                        <Breadcrumb
                                spacing='8px'
                                separator={<ChevronRightIcon color='gray.500' />}
                            >
                                <BreadcrumbItem>
                                        <BreadcrumbLink href='/admin/stores'>
                                            <Text fontSize='xl' mt={2}>Inventario de Productos</Text>
                                        </BreadcrumbLink>
                                </BreadcrumbItem>
                        </Breadcrumb>

                       { /* <InputGroup size='lg' w={"50%"} mr={5}>
                            <Input type='text' placeholder='Buscar' bg={"white"} />
                            <InputRightElement width='5.5rem'>
                                <Button
                                    h='2.75rem'
                                    size='lg'
                                    colorScheme='blue'
                                    bgGradient='linear(to-r, brand.400, brand.500, brand.600)'
                                    color='white'
                                >
                                    Buscar
                                </Button>
                            </InputRightElement>
                            </InputGroup> */    }
			    </Flex>

			<Box marginTop={4} marginBottom={10} mr={5}>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack>
						<PaginationTable
							uri={uri}
							columns={columns}
							columnsTable={columnsTable}
							titleTable='Listado de Inventario en Tienda'
							pathView='stock'
							pathEdit='stock'
						/>
					</Stack>
				</Box>
			</Box>
            </>
    )
};

export default index;