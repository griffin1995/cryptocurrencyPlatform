//Converts UNIX time to MM/DD format string and returns it

export default function UnixToString(unixTimestamp) {
    const date = new Date(unixTimestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
  
    return `${month}/${day}`;
  }