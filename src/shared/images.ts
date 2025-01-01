import { getProjectEnvVariables } from '../project-env-variables';

const { envVariables } = getProjectEnvVariables();

export const toSharpUrl = (url: string, width: number | string = 1000, height: number | string = 1000) => {
	const viteImageSharpenerUrl = envVariables.VITE_IMAGE_SHARPENER_URL;
	if (!viteImageSharpenerUrl) {
		return url;
	}
	return `${viteImageSharpenerUrl}/api/image/url?url=${encodeURIComponent(url)}&width=${width}&height=${height}`;
};