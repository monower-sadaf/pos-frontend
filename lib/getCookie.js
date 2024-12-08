import { cookies } from "next/headers";

export const getUserToken = () => {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');
    return userCookie ? JSON.parse(userCookie.value).token : null;
};
