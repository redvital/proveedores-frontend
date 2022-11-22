/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	env: {
		API_URL: process.env.API_URL,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	redirects: async () => {
		return [
			{
				// Redirect all requests to the pre-registration path to the step 1
				source: "/pre-registration",
				destination: "/pre-registration/step-1",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
