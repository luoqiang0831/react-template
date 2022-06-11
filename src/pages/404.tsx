import React from "react";
import Img404 from "@/assets/404.png";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line @typescript-eslint/ban-types
const textCSS: {} = {
  fontFamily: "PingFangSC-Regular, PingFang SC",
  fontWeight: "400",
  color: "#999999",
  lineheight: "26px",
  marginTop: "-30px",
  fontSize: "15px",
};

const NoFoundPage: React.FC<unknown> = () => {
  const { t, i18n } = useTranslation();
  return (
    <div style={{ textAlign: "center" }}>
      <img
        style={{ width: "260px", height: "136px", marginTop: "129px" }}
        src={Img404}
        alt=""
      />
      <p style={textCSS}>{t("抱歉，您访问的内容不存在")}～</p>
    </div>
  );
};

export default NoFoundPage;
