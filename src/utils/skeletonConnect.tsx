import React, { useState, Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { getRootDom } from "@/utils/tools";
const $skeleton = getRootDom("skeleton");
interface ConnectProps {
  setLoadding: (status: boolean) => void;
}

//
export default (SkeletonConnect: React.ComponentType) => {
  return function <P extends ConnectProps>(
    WrappedComponent: React.ComponentType<P>
  ) {
    return function InnerComponent(props: any) {
      const [loadding, setLoadding] = useState(true);
      useEffect(() => {
        if (!loadding) {
          $skeleton.remove();
          //   ReactDOM.unmountComponentAtNode($skeleton);
        }
      }, [loadding]);
      // 组件卸载
      useEffect(
        () => () => {
          $skeleton.remove();
        },
        []
      );
      return (
        <Fragment>
          {ReactDOM.createPortal(<SkeletonConnect />, $skeleton)}
          <WrappedComponent {...{ ...props, setLoadding: setLoadding }} />
        </Fragment>
      );
    };
  };
};
