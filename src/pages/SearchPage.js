import React from "react";
import { useStateValue } from "../StateProvider";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import RoomSharpIcon from "@mui/icons-material/RoomSharp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./searchPage.css";
// import Response from "../response";
import { Link } from "react-router-dom";
import Search from "./Search";
import useGoogleSearch from "../useGoogleSearch";

function SearchPage() {
  const [{ term }, dispatch] = useStateValue();

  //live api call
  const { data } = useGoogleSearch(term);

  // const data = Response;

  console.log(data);
  return (
    <div className="searchPage">
      <div className="searchPage_header">
        <Link to="/">
          <img
            src="https://www.google.co.in/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            alt=""
            className="searchPage_logo"
          />
        </Link>

        <div className="searchPage__headerBody">
          <Search hideButtons />

          <div className="searchPage_options">
            <div className="searchPage_optionsLeft">
              <div className="searchPage_option">
                <SearchIcon />
                <Link to="/all">All</Link>
              </div>
              <div className="searchPage_option">
                <DescriptionIcon />
                <Link to="/news">News</Link>
              </div>
              <div className="searchPage_option">
                <ImageIcon />
                <Link to="/images">Images</Link>
              </div>
              <div className="searchPage_option">
                <LocalOfferIcon />
                <Link to="/shopping">Shopping</Link>
              </div>
              <div className="searchPage_option">
                <RoomSharpIcon />
                <Link to="/maps">Maps</Link>
              </div>
              <div className="searchPage_option">
                <MoreVertIcon />
                <Link to="/more">More</Link>
              </div>
              <div className="searchPage_optionsRight">
                <div className="searchPage_option">
                  <Link to="/settings">Settings</Link>
                </div>
                <div className="searchPage_option">
                  <Link to="/tools">Tools</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {term && (
        <div className="searchPage_results">
          <p className="searchPage_resultCount">
            About {data?.searchInformation.formattedTotalResults}results (
            {data?.searchInformation.formattedSearchTime} seconds) for {term}
          </p>

          {data?.items.map((item) => (
            <div className="searchPage_result">
              <a href={item.link}>
                {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      src={
                        item.pagemap?.cse_image?.length > 0 &&
                        item.pagemap?.cse_image[0]?.src
                      }
                      alt=""
                      className="searchPage_resultImage"
                    />
                  )}
                {item.displayLink}🔻
              </a>
              <a href={item.link} className="searchPage_resultTitle">
                <h2>{item.title}</h2>
              </a>
              <p className="searchPage_resultSnippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
