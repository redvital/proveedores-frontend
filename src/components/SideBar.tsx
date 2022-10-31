import React, { ReactNode, ReactText } from "react";
import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	BoxProps,
	FlexProps,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import {
	FiHome,
	FiTrendingUp,
	FiStar,
	FiMenu,
	FiBox,
	FiTag,
	FiUsers,
	FiChevronDown,
	FiBookmark,
	FiTruck,
	FiShoppingBag,
	FiUserPlus,
} from "react-icons/fi";
import { IconType } from "react-icons";
import Logo from "@/components/Logo";
import { IUser } from "@/interfaces/user.interface";
import { Notifications } from "@/components/Notifications";

interface LinkItemProps {
	name: string;
	icon: IconType;
	path: string;
}

const LinkItems: Array<LinkItemProps> = [
	{ name: "Inicio", icon: FiHome, path: "/admin/dashboard" },
	{ name: "Proveedores", icon: FiTruck, path: "/admin/providers" },
	{ name: "Productos", icon: FiBox, path: "/admin/products" },
	{
		name: "Representantes",
		icon: FiUserPlus,
		path: "/admin/representatives",
	},
	{ name: "Tiendas", icon: FiShoppingBag, path: "/admin/stores" },
	{ name: "Categorías", icon: FiBookmark, path: "/admin/categories" },
	// { name: "Ventas", icon: FiTrendingUp, path: "/admin/sales" },
	{ name: "Inventarios", icon: FiTag, path: "/admin/inventories" },
	// { name: "Usuarios", icon: FiUsers, path: "/admin/users" },
];

export default function Sidebar({
	children,
	logout,
	user,
}: {
	children: ReactNode;
	logout: () => void;
	user: IUser | undefined;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box minH='100vh' bg={useColorModeValue("gray.100", "gray.900")}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size='full'
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} logout={logout} user={user} />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				{children}
			</Box>
		</Box>
	);
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	return (
		<Box
			transition='3s ease'
			bg={useColorModeValue("white", "gray.900")}
			borderRight='1px'
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos='fixed'
			h='full'
			{...rest}
		>
			<Flex
				h='20'
				alignItems='center'
				mx='8'
				justifyContent='space-between'
			>
				<Logo />
				<CloseButton
					display={{ base: "flex", md: "none" }}
					onClick={onClose}
				/>
			</Flex>
			{LinkItems.map((link) => (
				<NavItem key={link.name} icon={link.icon} path={link.path}>
					{link.name}
				</NavItem>
			))}
		</Box>
	);
};

interface NavItemProps extends FlexProps {
	icon: IconType;
	children: ReactText;
	path: string;
}
const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
	return (
		<Link
			href={path}
			style={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
		>
			<Flex
				align='center'
				p='4'
				mx='4'
				borderRadius='lg'
				role='group'
				cursor='pointer'
				_hover={{
					bg: "brand.700",
					color: "white",
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr='4'
						fontSize='16'
						_groupHover={{
							color: "white",
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

interface MobileProps extends FlexProps {
	onOpen: () => void;
	logout: () => void;
	user: IUser | undefined;
}
const MobileNav = ({ onOpen, logout, user, ...rest }: MobileProps) => {
	const logoutUser = async () => {
		logout();
	};

	const LinkItems: Array<LinkItemProps> = [
		{ name: "Perfil", icon: FiHome, path: "/admin/profile" },
	];

	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height='20'
			alignItems='center'
			bg={useColorModeValue("white", "gray.900")}
			borderBottomWidth='1px'
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}
		>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant='outline'
				aria-label='open menu'
				icon={<FiMenu />}
			/>

			<Text
				display={{ base: "flex", md: "none" }}
				fontSize='2xl'
				fontFamily='monospace'
				fontWeight='bold'
			>
				Redvital
			</Text>

			<HStack spacing={{ base: "0", md: "6" }}>
				<Notifications />
				<Flex alignItems={"center"}>
					<Menu>
						<MenuButton
							py={2}
							transition='all 0.3s'
							_focus={{ boxShadow: "none" }}
						>
							<HStack>
								<Avatar
									size={"sm"}
									src={user ? user.profile_photo_url : ""}
								/>

								<VStack
									display={{ base: "none", md: "flex" }}
									alignItems='flex-start'
									spacing='1px'
									ml='2'
								>
									<Text fontSize='xs'>
										{user
											? user.name.toLocaleUpperCase()
											: ""}
									</Text>
								</VStack>
								<Box display={{ base: "none", md: "flex" }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue("white", "gray.900")}
							borderColor={useColorModeValue(
								"gray.200",
								"gray.700"
							)}
						>
							{LinkItems.map((link) => (
								<Link key={link.name} href={link.path}>
									<MenuItem>{link.name}</MenuItem>
								</Link>
							))}

							<MenuDivider />
							<MenuItem onClick={logoutUser}>Salir</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};
