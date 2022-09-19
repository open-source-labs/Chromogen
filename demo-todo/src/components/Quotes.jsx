import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { quoteTextState, xkcdState } from '../store/store';
import { quoteNumberState } from '../store/atoms';

const Quotes = () => {
  const setQuoteNumber = useSetRecoilState(quoteNumberState);
  const quoteText = useRecoilValue(quoteTextState);
  //const xkcdURL = useRecoilValue(xkcdState);

  return (
    <>
      <div id="quoteContainer">
        <p>{quoteText}</p>
        <button type="button" onClick={() => setQuoteNumber(Math.floor(Math.random() * 1643))}>
          New Quote
        </button>
      </div>
      {/* <img alt="xkcd" src={xkcdURL} /> */}
    </>
  );
};

export default Quotes;
