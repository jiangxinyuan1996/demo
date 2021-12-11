import Mock from "mockjs";

//拦截请求，返回假数据
Mock.mock("http://10.91.7.159:9080/myaccount", {
  message: "调用成功",
  data: [
    {
      label: "card1",
      value: "1",
      account: "610055554448811",
      limit: 80000,
      used: 30000,
      maxIncreaseLimit: 1240000,
    },
    {
      label: "card2",
      value: "2",
      account: "610055554448812",
      limit: 90000,
      used: 10000,
      maxIncreaseLimit: 1340000,
    },
    {
      label: "card3",
      value: "3",
      account: "610055554448813",
      limit: 100000,
      used: 50000,
      maxIncreaseLimit: 1440000,
    },
  ],
  status: 200
})
Mock.mock("http://10.91.7.159:9080/submit", {
  message: "调用成功",
  data: true,
  status: 200
})