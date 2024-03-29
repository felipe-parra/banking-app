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

export const getAccountsApi = async ({
  link,
  page = 1,
}: {
  link: string;
  page?: number;
}) => {
  try {
    console.log({ page, link });
    const { data } = await baseAxios({
      method: "GET",
      url: `${SUFFIX}/accounts?page=${page}&link=${link}`,
    });

    console.log(data.data.results);

    return data.data.results;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export const getTransactionsApi = async ({
  link,
  page,
}: {
  link: string;
  page?: number;
}) => {
  try {
    console.log({ page, link });

    const { data } = await baseAxios({
      method: "GET",
      url: `${SUFFIX}/transactions?page=${page}&link=${link}`,
    });

    console.log(data.data);

    return data.data.results;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export const createLinkApi = async (formData: { [key: string]: string }) => {
  try {
    console.log({ formData });
    const { data } = await baseAxios({
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      url: SUFFIX + "/register-link",
      data: formData,
    });

    console.log("[API]", { data });

    return data.data;
  } catch (error) {
    console.error({ error });
    return null;
  }
};
