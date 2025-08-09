import CContainer from "@/components/ui-custom/CContainer";
import useContents from "@/context/useContents";
import useHashlinkToView from "@/hooks/useHashlinkToView";
import HomeAbout from "./sections/HomeAbout";
import HomeBlogs from "./sections/HomeBlogs";
import HomeContact from "./sections/HomeContact";
import HomeFaqs from "./sections/HomeFaqs";
import HomeHero from "./sections/HomeHero";
import HomeHowToSubs from "./sections/HomeHowToSubs";
import HomePricing from "./sections/HomePricing";
import HomePromo from "./sections/HomePromo";
import HomeStats from "./sections/HomeStats";

const HomePage = () => {
  // Props
  const data = useContents((s) => s.data);

  useHashlinkToView({});

  // const HomeStats = lazy(() => import("./sections/HomeStats"));
  // const HomePromo = lazy(() => import("./sections/HomePromo"));
  // const HomePricing = lazy(() => import("./sections/HomePricing"));
  // const HomeHowToSubs = lazy(() => import("./sections/HomeHowToSubs"));
  // const HomeAbout = lazy(() => import("./sections/HomeAbout"));
  // const HomeContact = lazy(() => import("./sections/HomeContact"));
  // const HomeFaqs = lazy(() => import("./sections/HomeFaqs"));
  // const HomeBlogs = lazy(() => import("./sections/HomeBlogs"));
  // const Footer = lazy(() => import("./sections/Footer"));

  // States
  const contents = data?.contents;
  const promo = data?.promo;
  const pricing = data?.pricing;
  const faqs = data?.faqs;
  const blogs = data?.blogs;

  return (
    <CContainer overflowX={"clip"} minH={"100vh"}>
      <HomeHero />

      <HomeStats contents={contents} />
      <HomePromo promo={promo} />
      <HomePricing contents={contents} pricing={pricing} />
      <HomeHowToSubs contents={contents} />
      <HomeAbout contents={contents} />
      <HomeContact contents={contents} />
      <HomeFaqs contents={contents} faqs={faqs} />
      <HomeBlogs contents={contents} blogs={blogs} />
    </CContainer>
  );
};

export default HomePage;
