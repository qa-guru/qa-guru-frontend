import PageScroll from "./components/page-scroll";
import iconsStackData from "./json/icons-stack.json";
// eslint-disable-next-line import/extensions
import "./index.css";

const { pages } = iconsStackData;

const ScrollPageSection = () => {
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        margin: "0",
        padding: "0",
        backgroundColor: "white",
      }}
    >
      <PageScroll pages={pages as any} />
    </div>
  );
};

export default ScrollPageSection;
