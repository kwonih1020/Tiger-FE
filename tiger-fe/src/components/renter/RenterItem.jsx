// eslint-disable-next-line

import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { __getRenterItemList } from "../../redux/modules/renterItemListSlice";
import axios from "axios";

const RenterItem = ({ category, list, onSelect }) => {
  const serverApi = process.env.REACT_APP_SERVER;
  const chatApi = process.env.REACT_APP_CHAT_URL;

  // const userId = useSelector((state) => state.memberSlice.userInfo.id);
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renterItemLists = useSelector(
    (state) => state.renterItemListSlice.renterItemLists
  );
  // console.log(renterItemLists);

  useEffect(() => {
    if (category) {
      dispatch(__getRenterItemList("RESERVED"));
    }
  }, [dispatch]);

  const deleteHandler = async (oid) => {
    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: userToken,
      RefreshToken: refreshToken,
    };
    await axios.delete(serverApi + `/order/${oid}`, {
      headers: headers,
    });
    dispatch(__getRenterItemList("RESERVED"));
  };

  return (
    <div>
      <StRenterItemList>
        {renterItemLists.output && renterItemLists.output.length === 0 ? (
          <p>등록된 차량이 없습니다.</p>
        ) : category === "RESERVED" ? (
          renterItemLists.output &&
          renterItemLists.output.map((list, i) => {
            return (
              <StRenterItem key={i}>
                <img
                  src={list.thumbnail}
                  alt="차량"
                  onClick={() => {
                    navigate(`/vdetail/${list.vid}`);
                  }}
                />
                <div
                  className="carInfo"
                  onClick={() => {
                    navigate(`/vdetail/${list.vid}`);
                  }}>
                  <p>{list.vbrand}</p>
                  <p>{list.vname}</p>
                  <span>{list.oname}</span>
                  <p>
                    ₩{list.price}/
                    {(new Date(list.endDate).getTime() -
                      new Date(list.startDate).getTime()) /
                      (1000 * 3600 * 24) +
                      1}
                    일
                  </p>
                  <p className="carInfo__location">{list.location}</p>
                </div>
                <div className="flex_wrap">
                  <div className="item_date">
                    <div>{list.startDate}</div>
                    <span>~</span>
                    <span>{list.endDate}</span>
                  </div>
                  <div className="btn_box">
                    <span
                      className="refund"
                      onClick={() => {
                        deleteHandler(list.oid);
                      }}>
                      환불
                    </span>
                    <div
                      className="chatButton"
                      onClick={() => {
                        const ownerId = list.ownerId;
                        try {
                          const response = axios.post(`${chatApi}/chat/room`, {
                            ownerId,
                          });
                          console.log(response.data.output);
                          navigate(`/chat/${response.data.output}`, {
                            state: { backgroundLocation: location },
                          });
                        } catch (error) {
                          return error;
                        }
                      }}>
                      채팅하기
                    </div>
                  </div>
                </div>
              </StRenterItem>
            );
          })
        ) : category === "CANCEL" ? (
          renterItemLists.output &&
          renterItemLists.output.map((list, i) => {
            return (
              <StRenterItem
                onClick={() => {
                  navigate(`/vdetail/${list.vid}`);
                }}
                key={i}>
                <img src={list.thumbnail} alt="차량" />
                <div className="carInfo">
                  <p>{list.vbrand}</p>
                  <p>{list.vname}</p>
                  <span>{list.oname}</span>
                  <p>₩{list.price}</p>
                  <p>{list.location}</p>
                </div>
                <div className="flex_wrap">
                  <div className="item_date">
                    <div>{list.startDate}</div>
                    <span>~</span>
                    <span>{list.endDate}</span>
                  </div>
                  <div className="btn_box">
                    <span className="refunded">환불 완료</span>
                    <div
                      className="chatButton"
                      onClick={() => {
                        const ownerId = list.ownerId;
                        try {
                          const response = axios.post(`${chatApi}/chat/room`, {
                            ownerId,
                          });
                          console.log(response.data.output);
                          navigate(`/chat/${response.data.output}`, {
                            state: { backgroundLocation: location },
                          });
                        } catch (error) {
                          return error;
                        }
                      }}>
                      채팅하기
                    </div>
                  </div>
                </div>
              </StRenterItem>
            );
          })
        ) : category === "USE" ? (
          renterItemLists.output &&
          renterItemLists.output.map((list, i) => {
            return (
              <StRenterItem key={i}>
                <img
                  src={list.thumbnail}
                  alt="차량"
                  onClick={() => {
                    navigate(`/vdetail/${list.vid}`);
                  }}
                />
                <div
                  className="carInfo"
                  onClick={() => {
                    navigate(`/vdetail/${list.vid}`);
                  }}>
                  <p>{list.vbrand}</p>
                  <p>{list.vname}</p>
                  <span>{list.oname}</span>
                  <p>₩{list.price}</p>
                  <p>{list.location}</p>
                </div>
                <div className="flex_wrap">
                  <div className="item_date">
                    <div className="what">{list.startDate}</div>
                    <span>~</span>
                    <span>{list.endDate}</span>
                  </div>
                  <div className="btn_box">
                    {/* <span className="return">반납</span> */}
                    <div
                      className="chatButton"
                      onClick={() => {
                        const ownerId = list.ownerId;
                        try {
                          const response = axios.post(`${chatApi}/chat/room`, {
                            ownerId,
                          });
                          console.log(response.data.output);
                          navigate(`/chat/${response.data.output}`, {
                            state: { backgroundLocation: location },
                          });
                        } catch (error) {
                          return error;
                        }
                      }}>
                      채팅하기
                    </div>
                  </div>
                </div>
              </StRenterItem>
            );
          })
        ) : category === "RETURN" ? (
          renterItemLists.output &&
          renterItemLists.output.map((list, i) => {
            return (
              <StRenterItem key={i}>
                <img
                  src={list.thumbnail}
                  alt="차량"
                  onClick={() => {
                    navigate(`/vdetail/${list.vid}`);
                  }}
                />
                <div
                  className="carInfo"
                  onClick={() => {
                    navigate(`/vdetail/${list.vid}`);
                  }}>
                  <p>{list.vbrand}</p>
                  <p>{list.vname}</p>
                  <span>{list.oname}</span>
                  <p>₩{list.price}</p>
                  <p>{list.location}</p>
                </div>
                <div className="flex_wrap">
                  <div className="item_date">
                    <div>{list.startDate}</div>
                    <span>~</span>
                    <span>{list.endDate}</span>
                  </div>
                  <div className="btn_box">
                    <span className="returned">반납완료</span>
                    <div
                      className="chatButton"
                      onClick={() => {
                        const ownerId = list.ownerId;
                        try {
                          const response = axios.post(`${chatApi}/chat/room`, {
                            ownerId,
                          });
                          console.log(response.data.output);
                          navigate(`/chat/${response.data.output}`, {
                            state: { backgroundLocation: location },
                          });
                        } catch (error) {
                          return error;
                        }
                      }}>
                      채팅하기
                    </div>
                  </div>
                </div>
              </StRenterItem>
            );
          })
        ) : null}
      </StRenterItemList>
    </div>
  );
};

const StRenterItemList = styled.div`
  width: 790px;
  height: 890px;
  margin-top: 65px;
`;

const StRenterItem = styled.div`
  width: 100%;
  height: 134px;
  display: flex;
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;
  img {
    width: 250px;
    height: 134px;
    object-fit: cover;
    border-radius: 12px;
    margin-right: 24px;
  }
  .carInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 430px;
    p {
      margin-bottom: 11px;
      font-weight: 500;
      font-size: 18px;
      color: #000;
    }
    span {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      color: #8b8b8b;
      margin-bottom: 13px;
    }
    &__location {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .dateBtn {
    width: 97px;
    height: 20px;
    position: absolute;
    top: 0;
    right: 0;
  }
  .flex_wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .item_date {
      font-weight: 500;
      font-size: 16px;
      color: #8b8b8b;
      display: flex;
      flex-direction: column;
      align-items: center;
      /* background-color: pink; */
    }
    .btn_box {
      margin-bottom: 11px;
      display: flex;
      justify-content: end;
      /* background-color: yellow; */
      .modify {
        font-weight: 500;
        font-size: 14px;
        color: #000;
        text-decoration: underline;
        margin-right: 12px;
      }
      .refund {
        font-weight: 500;
        font-size: 14px;
        color: #eb3434;
        text-decoration: underline;
        cursor: pointer;
      }
      .returned,
      .refunded {
        font-weight: 500;
        font-size: 14px;
        color: #8b8b8b;
      }
      .return {
        font-weight: 500;
        font-size: 14px;
        color: #eb3434;
        text-decoration: underline;
        cursor: pointer;
      }
      .chatButton {
        font-weight: 500;
        font-size: 14px;
        width: auto;
        cursor: pointer;
        margin-left: 5px;
        text-decoration: underline;
      }
    }
  }
`;

const ChattingBtn = styled.div``;

export default RenterItem;
