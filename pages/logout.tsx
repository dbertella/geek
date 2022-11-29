import Cookies from "cookies";
import type { GetServerSideProps, NextPage } from "next";

const Logout: NextPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  cookies.set("bggusername");
  cookies.set("bggpassword");
  cookies.set("SessionID");
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
export default Logout;
