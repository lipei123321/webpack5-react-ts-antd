import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { NotFoundWrapper } from './styled';

const NotFound = () => {
  let history = useHistory();

  function handleClick() {
    history.push('/');
  }

  return (
    <NotFoundWrapper>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={handleClick}>
            Back Home
          </Button>
        }
      />
    </NotFoundWrapper>
  );
};

export default NotFound;
