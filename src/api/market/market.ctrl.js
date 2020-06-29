import models from '../../models';
import * as validate from '../../lib/Validate/market'; 
import * as colorConsole from '../../lib/console';
import * as file from '../../lib/file';
import { asyncForeach } from '../../lib/method';

export const writeItem = async (req, res) => {
  const { body } = req;
  const { memberId } = req.decoded;

  try {
    await validate.validateWriteItem(body);
  } catch (error) {
    const result = {
      status: 400,
      message: '검증 오류',
    };

    res.status(400).json(result);

    return;
  }

  try {
    const { picture } = body;

    if (picture && Array.isArray(picture)) {
      // 파일 검증
      const validationFileData = {
        ...picture,
      };

      try {
        await validate.vaildateMarketFile(validationFileData[0]);
      } catch (err) {
        colorConsole.yellow('[MARKET - FILE - 요청 오류] 검증 오류');

        const result = {
          status: 400,
          message: '파일 정보가 올바르지 않습니다.',
        };

        res.status(400).json(result);

        return;
      }

      // DB 저장 (게시물)
      const marketData = await models.Market.create({
        memberId,
        ...body,
      });

      // IMAGE URL 발급 && 파일 DB 저장
      await file.marketItemCreatImageUrlDB(picture, marketData.idx);

      const result = {
        status: 200,
        message: '게시물 저장 성공! (pitcure !== null)',
      };

      res.status(200).json(result);
    } else {
      body.picture = null;

      await models.Market.create({
        memberId,
        ...body,
      });

      const result = {
        status: 200,
        message: '아이템 작성 성공!',
      };
  
      res.status(200).json(result);
    }
  } catch (error) {
    colorConsole.red('[MARKET - WRITE - 요청 오류]', error);
    const result = {
      status: 500,
      message: '서버 에러',
    };

    res.status(500).json(result);
  }
};

export const getAllItemList = async (req, res) => {
  const { page, category } = req.query;
  let { limit } = req.query;


  try {
    if (!limit || !page) {
      const result = {
        status: 400,
        message: 'limit 혹은 page를 지정해주세요.',
      };

      res.status(400).json(result);

      return;
    }

    const requestPage = (page - 1) * limit;
    limit = Number(limit);

    const market = await models.Market.getMarketByCategory(requestPage, limit, category);

    await asyncForeach(market, async (value) => {
      const { idx } = value;

      const fileData = await models.MarketFile.getFiles(idx);
      
      if (fileData) {
        await file.creatImageUrl(fileData);

        if (fileData.length > 0) {
          value.picture = fileData;
        } else {
          value.picture = null;
        }
      }
    });

    const result = {
      status: 200,
      message: '아이템 전체 조회 성공!',
      data: {
        market,
      },
    };

    res.status(200).json(result);
  } catch (error) {
    colorConsole.red('[MARKET - GET - 요청 오류]', error);

    const result = {
      status: 500,
      message: '서버 에러',
    };

    res.status(500).json(result);
  }
};

export const updateMarketItem = async (req, res) => {
  try {
    const result = {
      status: 200,
      message: '아이템 수정 성공!',
    };

    res.status(200).json(result);
  } catch (error) {
    const result = {
      status: 500,
      message: '서버 에러',
    };

    res.status(500).json(result);
  }
};

export const getMyBasket = async (req, res) => {
  const { memberId } = req.decoded;

  try {
    const market = await models.Basket.getBasket(memberId);

    const basket = [];
    
    await asyncForeach(market, async (value) => {
      const { marketIdx, idx } = value;
      const marketData = await models.Market.getMarketByIdx(marketIdx);
      
      const fileData = await models.MarketFile.getFiles(marketData.idx);

      if (fileData) {
        await file.creatImageUrl(fileData);

        if (fileData.length > 0) {
          marketData.picture = fileData;
        } else {
          marketData.picture = null;
        }
      }

      marketData.basketIdx = idx;

      basket.push(marketData);
    });

    const result = {
      status: 200,
      message: '장바구니 목록 조회 성공!',
      data: {
        basket,
      },
    };

    res.status(200).json(result);
  } catch (error) {
    colorConsole.red('[BASKET - GET - 요청 오류]', error);

    const result = {
      status: 500,
      message: '서버 에러',
    };

    res.status(500).json(result);
  }
};

export const addBasket = async (req, res) => {
  const { marketIdx } = req.body;
  const { memberId } = req.decoded;

  try {
    const basket = await models.Basket.findOne({
      where: {
        marketIdx,
        memberId,
      },

      raw: true,
    });

    if (basket) {
      const result = {
        status: 400,
        message: '이미 추가된 상품!',
      };
  
      res.status(400).json(result);

      return;
    }

    await models.Basket.create({
      marketIdx,
      memberId,
    });

    const result = {
      status: 200,
      message: '장바구니 추가 성공!',
    };

    res.status(200).json(result);
  } catch (error) {
    colorConsole.red('[BASKET - ADD - 요청 오류]', error);

    const result = {
      status: 500,
      message: '서버 에러',
    };

    res.status(500).json(result);
  }
};

export const deleteBasket = async (req, res) => {
  const { idx } = req.query;

  try {
    await models.Basket.destroy({
      where: {
        idx,
      },
    });

    const result = {
      status: 200,
      message: '장바구니 삭제 성공!',
    };

    res.status(200).json(result);
  } catch (error) {
    colorConsole.red('[BASKET - DELETE - 요청 오류]', error);

    const result = {
      status: 500,
      message: '서버 에러',
    };

    res.status(500).json(result);
  }
};

export const getMarketDetail = async (req, res) => {
  const { idx } = req.query;

  if (!idx) {
    const result = {
      status: 400,
      message: 'idx를 지정하세요.',
    };

    res.status(400).json(result);

    return;
  }


  try {
    const market = await models.Market.getMarketByIdx(idx);
    
    const fileData = await models.MarketFile.getFiles(idx);

    await file.creatImageUrl(fileData);

    if (fileData.length > 0) {
      market.picture = fileData;
    } else {
      market.picture = null;
    }

    if (!market) {
      const result = {
        status: 404,
        message: '없는 게시글',
      };
  
      res.status(404).json(result);

      return;
    }

    const result = {
      status: 200,
      message: '상세조회 성공',
      data: {
        market,
      },
    };

    res.status(200).json(result);
  } catch (error) {
    colorConsole.red('[DETAIL - GET - 요청 오류]', error);

    const result = {
      status: 500,
      message: '서버 에러',
    };

    res.status(500).json(result);
  }
};
