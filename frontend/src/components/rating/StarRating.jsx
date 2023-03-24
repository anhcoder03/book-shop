const StarRating = ({ rating, textSm = false }) => {
  const stars = [];
  const paserRating = Math.round(rating);
  for (let i = 0; i < 5; i++) {
    if (i < paserRating) {
      stars.push(
        <i
          key={i}
          className={`fa-sharp fa-solid fa-star ${
            textSm ? "text-xs" : "text-base"
          }  text-primary`}
        ></i>
      );
    } else {
      stars.push(
        <span
          key={i}
          className={`${textSm ? "text-xl" : "text-2xl"}  text-primary`}
        >
          ☆
        </span>
      );
    }
  }
  return <>{stars}</>;
};

export default StarRating;
