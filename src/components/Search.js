import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";


export function Search(props) {
  const categories = props.cats;
  const s_word = props.word;
  let s_mass = [];

  for (let item of categories) {
    if (
      item.title_ru.toLowerCase().indexOf(s_word.toLowerCase()) !== -1 &&
      s_word !== ""
    ) {
      s_mass.push({ category: item.title_ru, id: item.id });
    }
    if (item.categories) {
      for (let sub of item.categories) {
        if (
          sub.title_ru.toLowerCase().indexOf(s_word.toLowerCase()) !== -1 &&
          s_word !== ""
        ) {
          s_mass.push({ category: sub.title_ru, id: sub.id });
        }
        if (sub.subcategories) {
          for (let subsub of sub.subcategories) {
            if (
              subsub.title_ru.toLowerCase().indexOf(s_word.toLowerCase()) !==
                -1 &&
              s_word !== ""
            ) {
              s_mass.push({ category: subsub.title_ru, id: subsub.id });
            }
          }
        }
      }
    }
  }

  let output = "";
  if (s_mass.length > 0) {
    let list = s_mass.map((item) => {
      return <a key={item.id}>{item.category}</a>;
    });
    output = <div id="search-result">{list}</div>;
  }

  return output;
}
