import axios from "axios";

const urlPhp = "https://viewer.gils.xyz/backend/"

export const getPhotoList = () => axios.get(`${urlPhp}shooting/get-all.php`);
