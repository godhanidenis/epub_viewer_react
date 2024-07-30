import React, { useContext, useEffect, useMemo, useState } from "react";
import SideMenu from "../side_menu/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { cfiRangeSpliter } from "../../utils/commonUtil";
import { RefContext } from "../../App";
import styled from "styled-components";

const BookInfo = () => {
  const { book: bookinfo, toc: tableofcontent } = useSelector(
    (state: any) => state.book
  );
  const viewerRef = useContext(RefContext);

  const handleLocation = (loc) => {
    if (!viewerRef.current) return;
    viewerRef.current.setLocation(loc);
  };

  return (
    <>
      <Container>
        <BookImg src={bookinfo.coverURL} alt={bookinfo.title} />
        <BookContent>
          <Title>{bookinfo.title}</Title>
          <Info>{bookinfo.publisher}</Info>
          <Info>{bookinfo.author}</Info>
        </BookContent>
      </Container>
      {tableofcontent.map((content, index) => (
        <div key={index}>
          <h3 onClick={() => handleLocation(content.href)}>{content.label}</h3>
        </div>
      ))}
    </>
  );
};

const Container = styled.div`
  display: flex;
  padding: 24px;
`;

const BookImg = styled.img`
  margin-right: 12px;
  width: 44%;
  min-width: 120px;
  border-radius: 4px;
  background: #eee;
`;

const BookContent = styled.div`
  flex-grow: 1;
`;

const Title = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const Info = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
`;

const TableOfContent = () => {
  const { content } = useSelector((state: any) => state.fontSetting.model);

  return <>{content && <SideMenu name="Content" body={BookInfo}></SideMenu>}</>;
};

export default TableOfContent;
