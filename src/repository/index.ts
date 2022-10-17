import axios from "axios";
import { ZfighterSImilarity } from "~/type";
export const getZfighterSimilarity = async (
  url: string
): Promise<ZfighterSImilarity> => {
  const response = (await axios.post("https://v9unedcif5.execute-api.ap-northeast-3.amazonaws.com/main/v1/predict", {
    url,
  }));
  console.log(response)
  return response.data;
};
