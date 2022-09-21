import React from 'react';
import shallow from 'zustand/shallow';
//import { useRecoilValue, useSetRecoilState } from 'recoil';
// import { quoteTextState, xkcdState } from '../store/store';
// import { quoteNumberState } from '../store/atoms';
import { useToDoStore } from '../store/store';
import { useEffect } from 'react';

const selector = (state) => ({
  changeQuoteText: state.changeQuoteText,
  quoteText: state.quoteText
  //changeQuoteNumber: state.changeQuoteNumber,
  //quoteNumber: state.quoteNumber,
});



const Quotes = () => {
  const { changeQuoteText, quoteText } = useToDoStore(
    selector,
    shallow,
  );

  // const quoteFetch = () => {

  // fetch('https://type.fit/api/quotes')
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const quote = data[quoteNumber];
  //     changeQuoteText(`"${quote.text}"\n\t- ${quote.author || 'unknown'}`);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     return 'No quote available';
  //   });
  // }

  const fetchMe = () => {

    let randomNum = Math.floor(Math.random() * 1643);

    fetch('https://type.fit/api/quotes')
    .then((response) => response.json())
    .then((data) => {
      const quote = data[randomNum];
      changeQuoteText(`"${quote.text}"\n\t- ${quote.author || 'unknown'}`);
    })
    .catch((err) => {
      console.error(err);
      return 'No quote available';
    });

  }

  useEffect(() => fetchMe(),[]);


  
  // const setQuoteNumber = useToDoStore(selector, shallow,);
  // const quoteText = useRecoilValue(quoteTextState);
  // const xkcdURL = useRecoilValue(xkcdState);

  return (
    <>
      <div id="quoteContainer">
        <p>{quoteText}</p>
        <button type="button" onClick={() => fetchMe()}>
          New Quote
        </button>
      </div>
      {/* <img alt="xkcd" src={xkcdURL} /> */}
    </>
  );
};

export default Quotes;
