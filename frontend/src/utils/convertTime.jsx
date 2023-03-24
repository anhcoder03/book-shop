// import React from "react";

// function ConvertTime({ isoDateString }) {
//   const dateObj = new Date(isoDateString);
//   const formattedDateString =
//     dateObj.toDateString() + " " + dateObj.toLocaleTimeString();
//   return (
//     <>
//       <span>{formattedDateString}</span>
//     </>
//   );
// }

// export default ConvertTime;
import moment from "moment";

export default function convertTimestampToDateTime(timestamp) {
  const date = moment(timestamp);
  const minutes = date.format("mm");
  const hours = date.format("HH");
  const day = date.format("DD");
  const month = date.format("MM");
  const year = date.format("YYYY");
  return `${day}/${month}/${year}- Lúc ${hours} giờ - ${minutes} phút`;
}
