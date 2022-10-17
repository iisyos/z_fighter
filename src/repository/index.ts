import axios from "axios";
type ZfighterSImilarity = {
  predictions: string;
  ok: boolean;
  message: string;
};
export const getZfighterSimilarity = async (
  url: string
): Promise<ZfighterSImilarity> => {
  const response = (await axios.post("http://localhost:8081/v1/predict", {
    url,
  })) as ZfighterSImilarity;
  return response;
};
