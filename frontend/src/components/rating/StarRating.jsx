const StarRating = ({ rating }) => {
  const stars = [];
  console.log(rating);
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        <i class="fa-sharp fa-solid fa-star text-base text-primary"></i>
      );
    } else {
      stars.push(<span className=" text-2xl text-primary">☆</span>);
    }
  }
  return <>{stars}</>;
};

export default StarRating;
