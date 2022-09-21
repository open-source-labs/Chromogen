import React from 'react';
//import { useRecoilValue, useSetRecoilState } from 'recoil';
// import { quoteTextState, xkcdState } from '../store/store';
// import { quoteNumberState } from '../store/atoms';

const selector = (state) => ({
  
}

const Quotes = () => {
  const setQuoteNumber = useSetRecoilState(quoteNumberState);
  const quoteText = useRecoilValue(quoteTextState);
  const xkcdURL = useRecoilValue(xkcdState);

  return (
    <>
      <div id="quoteContainer">
        <p>{'hi for now'}</p>
        <button type="button" onClick={() => console.log(Math.floor(Math.random() * 1643))}>
          New Quote
        </button>
      </div>
      {/* <img alt="xkcd" src={xkcdURL} /> */}
    </>
  );
};

export default Quotes;
