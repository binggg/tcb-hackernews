import Taro, { useState, useEffect } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import moment from "moment";
import getCloud from "../../lib/cloud";

import "./index.scss";
import Header from "../../components/header";

function Index() {
  const [types] = useState(["Top", "New", "Show", "Ask", "Jobs"]);
  const [curType, setCurType] = useState("Top");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [curPage, setCurPage] = useState(0);
  const [wxacodeSrc, setWxacodeSrc] = useState("");
  const pageSize = 10;

  useEffect(() => {
    xxxx;
    fetchList(curType, curPage);
  }, [curType, curPage]);

  useEffect(() => {
    debugger;
    getWXACode();
  }, []);

  async function fetchList(type, page) {
    const cloud = await getCloud();

    const res = await cloud.callFunction({
      name: "hackernews-api",
      data: {
        type: ["Top", "New"].includes(type) ? "story" : type,
        ...(type == "Top"
          ? {
              orderField: "score",
              order: "desc"
            }
          : {}),
        perPage: pageSize,
        page: Math.max(page, 1)
      }
    });

    if (res.result) {
      setCurPage(Math.max(page, 1));
      setList(res.result.data);
      setTotal(Math.ceil(res.result.total / pageSize));
    }
  }

  async function getWXACode() {
    const cloud = await getCloud();

    const res = await cloud.callFunction({
      name: "openapi",
      data: {
        action: "getWXACode"
      }
    });

    console.log(res);

    if (res.result) {
      setWxacodeSrc(res.result);
    }
  }

  function onSelectType(type) {
    setCurType(type);
    setCurPage(0);
    setTotal(0);
    setList([]);
  }

  return (
    <View className="index">
      <Header types={types} onSelect={onSelectType} />
      <View className="news">
        <View className="news-list-nav">
          <View
            className={curPage <= 1 ? "disabled" : ""}
            onClick={() => setCurPage(curPage - 1)}
          >
            prev
          </View>
          <View>
            {curPage} / {total}
          </View>
          <View
            className={curPage === total ? "disabled" : ""}
            onClick={() => setCurPage(curPage + 1)}
          >
            more
          </View>
        </View>
        <View className="news-list">
          {list.map(item => (
            <View className="news-item" key={item.id}>
              <View className="score">{item.score}</View>
              <View className="body">
                <View className="title">
                  <Text>{item.title}</Text>
                  <Text className="host"> (github.com)</Text>
                </View>
                <View className="meta">
                  <View className="by">by {item.by}</View>
                  <View className="time">{moment(item.time).fromNow()}</View>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View>
          <Image></Image>
        </View>
      </View>
    </View>
  );
}

Index.config = {
  navigationBarTitleText: "云开发 Hacker News",
  navigationBarBackgroundColor: "#f60",
  navigationBarTextStyle: "white"
};

export default Index;
