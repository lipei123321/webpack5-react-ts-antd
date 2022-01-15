import styled from 'styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  line-height: 1;
  position: relative;
  -webkit-user-select: none;

  .verify-tips {
    widows: 100%;
    height: 100%;
    color: #9ca0a7;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    pointer-events: none;
  }

  .verify-box {
    position: absolute;
    left: -1px;
    top: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    overflow: hidden;
  }

  .veriry-slide {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.1s linear, transform 0.3s ease;
  }

  .verify-bar {
    position: absolute;
    left: -1px;
    top: -1px;
    width: 50px;
    height: 100%;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 1;
    transition: transform 0.3s ease;

    .icon {
      width: 44px;
      height: 29px;
      box-shadow: rgba(#717277, 0.3) 0 3px 10px;
      border-radius: 4px;
    }
  }

  .verify-success-tips {
    position: absolute;
    left: -1px;
    top: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.1s linear;
    pointer-events: none;

    span {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  }
`;

export default Wrapper;
