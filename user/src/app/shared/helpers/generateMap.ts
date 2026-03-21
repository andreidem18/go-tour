import { environment } from 'src/environments/environment';
import { getRandomColor } from './getRandomColor';

export const generateMap = (lat: number | string, long: number | string) => {
    const baseUrl = 'https://api.mapbox.com/styles/v1/mapbox';
    const stylesId = "streets-v12";
    const longLat = `${long},${lat},4`;
    const accessToken = environment.mapboxToken;
    const pinColor = getRandomColor().slice(1);
    return `${baseUrl}/${stylesId}/static/pin-l+${pinColor}(${longLat})/${longLat},4/500x300?access_token=${accessToken}`
}
