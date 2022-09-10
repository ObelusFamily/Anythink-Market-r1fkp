import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {TITLE_SEARCH} from "../../constants/actionTypes";
import logo from "../../imgs/logo.png";

const mapStateToProps = (state) => {
  return {
    ...state.itemList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  buildItemsList: (payload) => dispatch({type: TITLE_SEARCH, payload}),
});

const Banner = ({items, initItems, buildItemsList}) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    initItems && startSearch(input);
  }, [input]);

  const startSearch = (input) => {
    if (input.length >= 3) {
      const searchResult = items.filter(
        (item) => item.title.includes(input) && item
      );
      buildItemsList({items: searchResult, itemsCount: searchResult.length});
      return;
    }
    buildItemsList({items: initItems, itemsCount: initItems.length});
    return;
  };
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div className="container">
          <div class="row align-items-center">
            <span className="col text-right" id="get-part">
              A place to get
            </span>
            <div className="input-group col-6 p-0">
              <input
                className="form-control my-0 py-1 border-0 shadow-none"
                type="text"
                placeholder="Search"
                aria-label="Search"
                onInput={(e) => setInput(e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-search" aria-hidden="true"></i>
                </span>
              </div>
            </div>
            <span className="col text-left"> the cool stuff.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
