let test = [
  {
    date: "2020-09-09T00:00:00.000Z",
    _id: "5f59369a344fa210b456476d",
    userId: { _id: "5f5928cde2d5872a58379db5", name: "test-user", __v: 0 },
    description: "Squats",
    duration: 5,
    __v: 0,
  },
  {
    date: "2020-09-11T07:56:29.236Z",
    _id: "5f5b2dad5e643316f8f4f395",
    userId: { _id: "5f5928cde2d5872a58379db5", name: "test-user", __v: 0 },
    description: "Laps",
    duration: 12,
    __v: 0,
  },
];

const result = test.map((x, i) => ({
  description: x.description,
  duration: x.duration,
  date: x.date,
}));
console.log(result);
