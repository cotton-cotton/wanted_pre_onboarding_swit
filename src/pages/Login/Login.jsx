import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { PROFILE_IMAGE } from '../../constants';
import * as S from './Login.style';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    userId: '',
    userName: '',
    profileImageSrc: '',
  });
  const { userId, userName, profileImageSrc } = userData;

  const handleUserInput = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const pickProfileImg = item => {
    setUserData({ ...userData, profileImageSrc: item });
  };

  const submitValid =
    userId.length > 0 && userName.length > 0 && profileImageSrc.length > 0;

  const submitUserData = () => {
    dispatch({
      type: 'USER_LOGIN',
      userId: userId,
      userName: userName,
      profileImageSrc: profileImageSrc,
    });
    submitValid ? alert('환영합니다.') : alert('가입 형식을 확인하세요');
    navigate('/messenger');
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.Logo />
        <S.InputWrap>
          <S.InputItem>
            ID
            <S.IdInput
              type="text"
              name="userId"
              placeholder="ID"
              onChange={handleUserInput}
            />
          </S.InputItem>
          <S.InputItem>
            NAME
            <S.Input
              type="text"
              name="userName"
              placeholder="표시될 이름을 적어주세요."
              onChange={handleUserInput}
            />
          </S.InputItem>
        </S.InputWrap>
        <S.ProfileHeader>프로필 이미지를 선택해주세요.</S.ProfileHeader>
        <S.ProfileWrap>
          {PROFILE_IMAGE.map((el, idx) => {
            return (
              <S.ProfileItem
                key={idx}
                src={el}
                isActive={userData.profileImageSrc === el}
                onClick={() => pickProfileImg(el)}
              />
            );
          })}
        </S.ProfileWrap>
        <S.EnterBtn
          isActive={submitValid}
          disabled={!submitValid}
          onClick={submitUserData}
        >
          LOGIN
        </S.EnterBtn>
      </S.Wrapper>
    </S.Container>
  );
};

export default Login;
