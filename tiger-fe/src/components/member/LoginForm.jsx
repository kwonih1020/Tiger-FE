// eslint-disable-next-line

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { __userLogin } from "../../redux/modules/memberSlice";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import logo from "../../assets/ta,iger_logo.png";

import kakaoButton from "../../assets/kakao_login_large_wide.png";

const LoginForm = ({ showModal, goRegister, loginToggle }) => {
  // 카카오로그인 redirect url
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=code`;
  const kakaoLogin = async () => {
    window.location.href = kakaoUrl;
  };

  const { register, handleSubmit } = useForm();

  const error = useSelector((state) => state.memberSlice.error);
  console.log(error);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(__userLogin(data)).then(
      (result) => {
        // console.log(result);
        if (result.error?.message === "Rejected") {
          return alert(result.payload.message);
        } else {
          console.log("loggedin");
          showModal();
        }
      }
      // (error) => {
      //   console.log(error);
      // }
    );
  };

  return (
    <StLoginForm>
      {/* <div className="login__header">
        <AiOutlineClose className="icon" onClick={showModal} />
        <p className="login__text">로그인 또는 회원가입</p>
      </div> */}
      <div className="wrap">
        <AiOutlineClose className="icon" onClick={showModal} />
        <div className="login__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="login__descbox">
          <div className="lineL"></div>
          <div className="text">간편 로그인/회원가입</div>
          <div className="lineR"></div>
        </div>

        <img
          src={`${kakaoButton}`}
          alt="kakaoButton"
          className="kakao"
          onClick={kakaoLogin}></img>
        <div className="google">구글로 간편 로그인</div>
        <div className="email" onClick={loginToggle}>
          이메일로 회원가입
        </div>

        <div className="login__descbox">
          <div className="lineL"></div>
          <div className="text">이메일 로그인</div>
          <div className="lineR"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="loginForEmail"
            required={true}
            minLength={3}
            {...register("email")}
            placeholder="아이디를 입력하세요"
          />
          <input
            type="password"
            placeholder="비밀번호"
            required={true}
            minLength={3}
            className="form-input"
            {...register("password")}
          />
          <div className="find">아이디/비밀번호 찾기</div>
          <button type="submit">로그인</button>
        </form>
      </div>
    </StLoginForm>
  );
};

const StLoginForm = styled.div`
  /* background-color: skyblue; */
  .login__header {
    width: 100%;
    height: 78px;
    /* background-color: pink; */
    position: relative;
    color: #000;
    border-bottom: 1px solid #f2f2f2;
    /* .icon {
      font-size: 22px;
      position: absolute;
      top: 28px;
      left: 30px;
      cursor: pointer;
    } */
    .login__text {
      font-weight: 600;
      font-size: 18px;
      text-align: center;
      line-height: 78px;
    }
  }
  .wrap {
    width: 100%;
    height: 762px;
    padding: 0 94px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: skyblue; */
    /* justify-content: center; */
    .icon {
      font-size: 22px;
      position: absolute;
      top: 28px;
      left: 30px;
      cursor: pointer;
    }
    .login__logo {
      width: 100%;
      height: 40px;
      /* background-color: pink; */
      text-align: center;
      margin: 36px 0 40px 0;
      img {
        width: 121px;
        height: 100%;
        object-fit: cover;
      }
    }
    .login__descbox {
      width: 100%;
      height: 22px;
      text-align: center;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .lineL {
        width: 164px;
        height: 1px;
        background-color: #8b8b8b;
      }
      .text {
        font-weight: 400;
        font-size: 16px;
        color: #8b8b8b;
        margin: 0 14px;
      }
      .lineR {
        width: 164px;
        height: 1px;
        background-color: #8b8b8b;
      }
    }
    .kakao {
      margin-bottom: 18px;
      cursor: pointer;
      box-sizing: border-box;
      width: 100%;
    }
    .google {
      width: 100%;
      height: 56px;
      background: #ffffff;
      font-weight: 400;
      font-size: 18px;
      border: 1px solid #000000;
      text-align: center;
      margin-bottom: 18px;
      line-height: 56px;
      color: #000;
      box-sizing: border-box;
      cursor: pointer;
    }
    .email {
      width: 100%;
      height: 56px;
      background: #ffffff;
      font-weight: 400;
      font-size: 18px;
      border: 2px solid #cccccc;
      text-align: center;
      margin-bottom: 25px;
      line-height: 56px;
      color: #000;
      box-sizing: border-box;
      cursor: pointer;
    }
    form {
      width: 100%;
      input {
        display: block;
        width: 100%;
        height: 56px;
        outline: none;
        padding: 15px 24px;
        box-sizing: border-box;
        background: #ffffff;
        border: 2px solid #cccccc;
        border-radius: 12px;
        margin-bottom: 18px;
        font-weight: 400;
        font-size: 18px;
        color: #8b8b8b;
        :nth-last-child() {
          margin-bottom: 14px;
        }
      }
      .find {
        width: 100%;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #8b8b8b;
        text-align: right;
        margin-bottom: 15px;
      }
      button {
        width: 100%;
        height: 56px;
        background: #ff881b;
        color: #ffffff;
        font-weight: 600;
        font-size: 18px;
        border: none;
        cursor: pointer;
        margin-bottom: 20px;
        padding: 0;
      }
    }
  }
`;

export default LoginForm;
