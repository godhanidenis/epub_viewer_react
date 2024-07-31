import "./toc.css";
import React, { useContext } from "react";
import SideMenu from "../side_menu/SideMenu";
import { RefContext } from "../../App";
import { useSelector } from "react-redux";

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
      <div className="toc-main">
        <div className="container-toc">
          <img
            src={bookinfo.coverURL}
            alt={bookinfo.title}
            className="bookImg"
          />
          <div className="bookContent">
            <div className="title-toc">{bookinfo.title}</div>
            <div className="info-toc">{bookinfo.publisher}</div>
            <div className="info-toc">{bookinfo.author}</div>
          </div>
        </div>
        {tableofcontent.map((content, index) => (
          <div key={index} className="chapter-outer">
            <p
              className="toc-chapter"
              onClick={() => handleLocation(content.href)}
            >
              {content.label}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

const TableOfContent = () => {
  const { content } = useSelector((state: any) => state.fontSetting.model);

  return <>{content && <SideMenu name="Content" body={BookInfo}></SideMenu>}</>;
};

export default TableOfContent;
