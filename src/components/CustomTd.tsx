import { SimpleGrid, Box, Image } from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'


interface Props {
	item: any;
	column: any;
}

const CustomTd: NextPage<Props> = ({
    item,
    column
}) => {
  return (

        <SimpleGrid
            columns={[2, null, 3]}
            spacing='40px'
        >
            <Box>
                <Image
                    src='gibbresh.png'
                    fallbackSrc='https://via.placeholder.com/50'
                />
            </Box>

            <Box>
                {item[column]}
            </Box>
        </SimpleGrid>

  )
}

export default CustomTd