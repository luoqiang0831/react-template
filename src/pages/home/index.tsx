import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useRootStore from "@/store/global";
import { useNavigate } from "react-router-dom";

// 推荐使用方式
const Home = () => {
  const { t, i18n } = useTranslation();
  const {} = useRootStore();

  const navigate = useNavigate();

  // 获取url链接信息 可以使用useLocation

  return (
    <div>
      <p onClick={() => navigate(`/testAsync`)}>点击测试页</p>
    </div>
  );
};

export default Home;
