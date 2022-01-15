import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { NotFoundWrapper } from './styled';

const NotFound = () => {
  let history = useHistory();

  function handleClick() {
    history.go(-1);
  }

  return (
    <NotFoundWrapper>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
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
