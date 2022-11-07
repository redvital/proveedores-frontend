import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverArrow,
	IconButton,
	Button,
	Stack,
	Flex,
	Link,
} from "@chakra-ui/react";

import { BsThreeDotsVertical, BsChatSquareQuote } from "react-icons/bs";
import { FiBell } from "react-icons/fi";
import { RiShutDownLine, RiRestartLine, RiFileShredLine } from "react-icons/ri";

export const Notifications = () => {
	const notifications = [
		{
			id: 1,
			title: "Bienvenido, ya formas parte de nuestros proveedores",
			description: "Descripción de la notificación 1",
			path: "/admin/notifications/1",
			viewed: true,
		},
		{
			id: 2,
			title: "Solicitud de cotización #558",
			description: "Descripción de la notificación 2",
			path: "/admin/notifications/2",
			viewed: true,
		},
		{
			id: 3,
			title: "Solicitud de cotización #559",
			description: "Descripción de la notificación 3",
			path: "/admin/notifications/3",
			viewed: false,
		},
	];

	const notificationsOrder = notifications.reverse();


	const shortText = ({ text, limit = 35 }: { text: string; limit?: number }) => {
		if (text.length > limit) {
			return text.substring(0, limit) + "...";
		}
		return text;
	}

	return (
		<Popover placement='bottom' isLazy>
			<PopoverTrigger>
				<IconButton
					aria-label='Notificaciones'
					icon={<FiBell />}
					size='lg'
					variant='ghost'
				/>
			</PopoverTrigger>
			<PopoverContent w='fit-content' _focus={{ boxShadow: "none" }}>
				<PopoverArrow />
				<PopoverBody>
					<Stack>
						{notificationsOrder.map((notification) => (
							<Link
								href={notification.path}
								key={notification.id}
							>
								<Button
									w='300px'
									variant='ghost'
									rightIcon={<BsChatSquareQuote />}
									justifyContent='space-between'
									fontWeight='normal'
									fontSize='sm'
									colorScheme={
										notification.viewed ? "gray" : "blue"
									}
								>
									{ shortText({ text: notification.title }) }
								</Button>
							</Link>
						))}
					</Stack>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};
