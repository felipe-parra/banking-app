import { InstitutionType } from "@/types/belvo.types";
import { baseAxios } from "@/utils/baseAxios";

const SUFFIX = "/belvo";

export const getAllInstitutionsApi = async (): Promise<
  InstitutionType[] | null
> => {
  try {
    const { data } = await baseAxios({
      method: "GET",
      url: SUFFIX + "/institutions" + "?type=bank",
    });

    console.log(data.data);

    return data.data.results;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export const getAccountsApi = async (link: string, page: number) => {
  try {
    const { data } = await baseAxios({
      method: "GET",
      url: `${SUFFIX}/accounts?page=${page}&account=${link}`,
    });

    console.log(data.data);

    return data.data;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export const getTransactionsApi = async (link: string, page: number) => {
  try {
    const { data } = await baseAxios({
      method: "GET",
      url: `${SUFFIX}/transactions?page=${page}&account=${link}`,
    });

    console.log(data.data);

    return data.data;
  } catch (error) {
    console.error({ error });
    return null;
  }
};
