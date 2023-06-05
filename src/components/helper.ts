import axios from "axios";

const getItems = async (str: string): Promise<any> => {
  try {
    const data = await axios({
      method: "GET",
      url: str,
    });
    if (data.status !== 200) return;
    return data.data;
  } catch (error) {
    throw error;
  }
};
const postItems = async (str: string, dataObj: any): Promise<any> => {
  try {
    const data = await axios({
      method: "POST",
      url: str,
      data: dataObj,
    });

    if (data.status !== 201) return;
    return data;
  } catch (error) {
    throw error;
  }
};
const patchItems = async (str: string, dataObj: any): Promise<any> => {
  try {
    const data = await axios({
      method: "PATCH",
      url: str,
      data: dataObj,
    });

    if (data.status !== 200) return;
    return data;
  } catch (error) {
    throw error;
  }
};
const deleteItems = async (str: string, id: any): Promise<any> => {
  try {
    const data = await axios({
      method: "Delete",
      url: str,
      data: id,
    });

    if (data.status !== 202) return;
    return data;
  } catch (error) {
    throw error;
  }
};

export { getItems, postItems, patchItems, deleteItems };
