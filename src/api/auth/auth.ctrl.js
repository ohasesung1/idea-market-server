/* eslint-disable import/prefer-default-export */
import models from '../../models';
import * as validate from '../../lib/Validate/auth';
import * as token from '../../lib/token';

export const login = async (req, res) => {
  const { body } = req;

  try {
    await validate.validateLogin(body);
  } catch (error) {
    const result = {
      status: 400,
      message: '검증 오류',
    };

    res.status(400).json(result);

    return;
  }

  try {
    const { id, pw } = body;

    const member = await models.Member.findMemberForLogin(id, pw);

    if (!member) {
      const result = {
        status: 404,
        message: '없는 회원 입니다!',
      };
  
      res.status(403).json(result);
  
      return;
    }

    const tokenData = await token.createToken(member.memberId, member.accessLevel); 

    const result = {
      status: 200,
      message: '로그인 성공',
      data: {
        tokenData,
      },
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    
    const result = {
      status: 500,
      message: '서버 에러',
    };

    res.status(500).json(result);
  }
};

export const myInfo = async (req, res) => {
  const { memberId } = req.decoded;

  try {
    const member = await models.Member.getMyInfo(memberId);

    if (!member) {
      const result = {
        status: 404,
        message: '없는 사용자 입니다.',
      };
  
      res.status(404).json(result);

      return;
    }

    delete member.pw;
    delete member.accessLevel;

    const result = {
      status: 200,
      message: '정보 조회 성공',
      data: {
        member,
      },
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    
    const result = {
      status: 500,
      message: '서버 에러',
    };

    res.status(500).json(result);
  }
};
