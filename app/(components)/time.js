const Time = () => {
  let time = new Date();
  let day = time.toDateString();

  return (
    <div>
      <h1>{day}</h1>
    </div>
  );
};

export default Time;
