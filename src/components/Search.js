export function Search(props) {
  const categories = props.categories;
  const searchWord = props.word;
  const setPath = props.funcChoice;
  const close = props.funcClose;
  let searchMassive = [];

  function choiceCategory(path) {
    setPath(path);
    close();
  }

  for (let item of categories) {
    if (item.categories) {
      for (let sub of item.categories) {
        if (sub.subcategories) {
          for (let subsub of sub.subcategories) {
            if (
              subsub.title_ru
                .toLowerCase()
                .indexOf(searchWord.toLowerCase()) !== -1 &&
              searchWord !== ""
            ) {
              searchMassive.push({
                category: subsub.title_ru,
                id: subsub.id,
                parent: sub.title_ru,
                parentid: sub.id,
                rootcategory: item.title_ru,
                rootcategoryid: item.id,
              });
            }
          }
        }
      }
    }
  }

  let output = "";
  if (searchMassive.length > 0) {
    let list = searchMassive.map((item) => {
      return (
        <a
          className="catalog__search-result-a"
          key={item.id}
          onClick={() =>
            choiceCategory([
              { category: item.rootcategory, id: item.rootcategoryid },
              { category: item.parent, id: item.parentid },
              { category: item.category, id: item.id },
            ])
          }
        >
          {item.category}
        </a>
      );
    });
    output = <div className="catalog__search-result">{list}</div>;
  }

  return output;
}
