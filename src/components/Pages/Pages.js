import React from 'react';

const imgURL =
  "https://raw.githubusercontent.com/ibnharoon/quranwebservice/master/apps/images/";

const AsyncImage = (props) => {
  const [loadedSrc, setLoadedSrc] = React.useState(null);
  React.useEffect(() => {
    setLoadedSrc(null);

    if (props.src) {
      const handleLoad = () => {
        setLoadedSrc(props.src);
      };
      const image = new Image();
      image.addEventListener("load", handleLoad);
      image.src = props.src;
      image.alt = "";
      return () => {
        image.removeEventListener("load", handleLoad);
      };
    }
  }, [props.src]);

  if (loadedSrc === props.src) {
    return <img {...props} />;
  }

  return null;
};
  
export default function Page({ dimension, currentPage }) {
  const pageNumber = Intl.NumberFormat("en-US", {
             minimumIntegerDigits: 3
             }).format(currentPage);
  console.log("loadPage() pageNumber: " + pageNumber + ", dim: " + JSON.stringify(dimension));  

  return (
    <AsyncImage className="image"
            style={{
              width: dimension.width - (dimension.lnavwidth * 2),
              height: dimension.height - (dimension.lnavwidth * 2)
            }}
            src={`${imgURL}page${pageNumber}.svg`}
          />
  );

};

