import React, { useMemo } from 'react';
import DocumentTitle from 'react-document-title';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

const RouteWrapper = (props: any) => {
  let { Comp, route, ...restProps } = props;
  /** useMemo 缓存query，避免每次生成生的query */
  const queryMemo = useMemo(() => {
    const queryReg = /\?\S*/g;
    const matchQuery = (reg: RegExp) => {
      const queryParams = restProps.location.search.match(reg);
      return queryParams ? queryParams[0] : '{}';
    };
    return queryString.parse(matchQuery(queryReg));
  }, [restProps.location.search]);
  const mergeQueryToProps = () => {
    const queryReg = /\?\S*/g;
    const removeQueryInRouter = (restProps: any, reg: RegExp) => {
      const { params } = restProps.match;
      Object.keys(params).forEach((key) => {
        params[key] = params[key] && params[key].replace(reg, '');
      });
      restProps.match.params = { ...params };
    };

    restProps = removeQueryInRouter(restProps, queryReg);
    const merge = {
      ...restProps,
      query: queryMemo,
    };
    return merge;
  };
  if (!Comp) {
    return <Redirect to="/404" />;
  }
  return (
    <DocumentTitle title={route.name}>
      <Comp {...mergeQueryToProps()} />
    </DocumentTitle>
  );
};

export default RouteWrapper;
