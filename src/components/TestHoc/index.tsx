import { ComponentType, FC, useState } from "react";
import React from 'react';

interface WithLoadingProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const WhiteWrap = <P extends Object>(
  WrapComment: ComponentType<P & WithLoadingProps>
): FC<P> => {
  return (props: P) => {
    const [loading, setLoading] = useState<boolean>(false);
    return (
      <WrapComment
        {...(props as P)}
        loading={loading}
        setLoading={setLoading}
      />
    );
  };
};
