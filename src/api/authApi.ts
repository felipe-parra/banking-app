import { LoginFormType, UserType } from "@/interfaces/user.interface";
import { baseAxios } from "@/utils/baseAxios";

const SUFFIX = "/users";

export const doRegisterUserApi = async (user: UserType) => {
  try {
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);

    const { data } = await baseAxios.post(SUFFIX + "/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log({ data });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const doLoginUserApi = async (user: LoginFormType) => {
  try {
    console.log("doLoginUserApi");
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);

    const res = await baseAxios.post(SUFFIX + "/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("[datadoLoginUserApi]:", { res });
    const { data } = res;
    console.log("[datadoLoginUserApi]:", { data });
    return data;
  } catch (error) {
    return null;
  }
};
