import Cookies from "cookies";
import type { GetServerSideProps, NextPage } from "next";

const Logout: NextPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  cookies.set("user");
  cookies.set("sessionCookie");
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
export default Logout;
