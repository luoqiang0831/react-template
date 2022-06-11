import React, { useEffect, useState } from "react";
import useRequest from "@ahooksjs/use-request";
import { test, test2 } from "./service";
import { useTranslation } from "react-i18next";
import { InfiniteScroll, List, DotLoading } from "antd-mobile";
import useLoadDemo from "./useLoadDemo";

interface Result {
  code: number;
  data: Array<{
    id: string;
    email: string;
  }>;
}
// 上拉加载更多内容
const InfiniteScrollContent = ({ hasMore }: { hasMore?: boolean }) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      {hasMore ? (
        <>
          <span>Loading</span>
          <DotLoading />
        </>
      ) : (
        <span>---{t("我是有底线的 ")}---</span>
      )}
    </>
  );
};

// 推荐使用方式
const HotelSearchIndex = () => {
  const { t, i18n } = useTranslation();
  const [result, setResult] = useState<Array<any>>([]);
  // 用法 1
  // const { data = {} } = useRequest(
  //   {
  //     url: "/front/hotel/list",
  //     method: "post",
  //     data: {
  //       cityId: 0,
  //       hotelIds: "string",
  //       latitude: "string",
  //       longitude: "string",
  //       needTotalCount: true,
  //       offset: 0,
  //       orderDescs: [
  //         {
  //           asc: true,
  //           col: "string",
  //         },
  //       ],
  //       pageNum: 0,
  //       pageSize: 0,
  //     },
  //   },
  //   {
  //     onSuccess: (res) => {
  //       setResult(data.data);
  //     },
  //   }
  // );
  // 用法 2
  // const { data, error, loading } = useRequest({
  //   url: "/api/changeUsername",
  //   method: "post",
  // });

  // 用法 3
  // const { data, error, loading } = useRequest(userId => `/api/userInfo/${userId}`);

  // 用法 4
  // const { loading, run } = useRequest(test, {
  //   manual: true,
  //   onSuccess: (res: Result) => {
  //     // setResult(res.data);
  //   },
  // });

  // useEffect(() => {
  //   run({ test: 123 });
  // }, []);

  const { state, records, handlePageChange, hasMore } = useLoadDemo();
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "scroll" }}>
      <h3>{t("结果输出")}</h3>
      {/* <ul>
        {(data.data || []).map((i: any) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ul> */}
      <List>
        {records?.map((item, index) => (
          <List.Item key={index}>
            <br />
            {item}
            <br />
          </List.Item>
        ))}
      </List>
      <InfiniteScroll
        loadMore={() => handlePageChange(state.pageNum + 1)}
        hasMore={hasMore}
      >
        <InfiniteScrollContent hasMore={hasMore} />
      </InfiniteScroll>
    </div>
  );
};

export default HotelSearchIndex;
