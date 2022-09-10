import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import agent from "../../agent";
import {TITLE_SEARCH} from "../../constants/actionTypes";
import logo from "../../imgs/logo.png";

const mapStateToProps = (state) => {
  return {
    itemsCount: state.itemList.itemsCount,
  };
};

const mapDispatchToProps = (dispatch) => ({
  buildItemsList: (payload) => dispatch({type: TITLE_SEARCH, payload}),
});

const Banner = ({itemsCount, buildItemsList}) => {
  const [input, setInput] = useState("");
  const [itemsCounter, setItemsCounter] = useState({
    prev: itemsCount,
    current: itemsCount,
  });

  useEffect(() => {
    startSearch(input);
    setItemsCounter({prev: itemsCounter.current, current: itemsCount});
  }, [input]);

  const startSearch = (input) => {
    if (input.length >= 3) {
      buildItemsList(agent.Items.byTitle(input));
      return;
    }
    buildItemsList(agent.Items.all());
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
