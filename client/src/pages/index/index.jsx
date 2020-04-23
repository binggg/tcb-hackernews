import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import moment from 'moment'

import './index.scss'
import Header from '../../components/header'

function Index() {
  const [types] = useState(['Top', 'New', 'Show', 'Ask', 'Jobs'])
  const [curType, setCurType] = useState('Top')
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [curPage, setCurPage] = useState(0)

  function fetchList(type) {
    console.log('fetch', type)
    // setList(list)
    // setTotal(total)
  }

  useEffect(() => {
    fetchList(curType, curPage)
  }, [curType, curPage])

  return (
    <View className="index">
      <Header types={types} onSelect={setCurType} />
      <View className="news">
        <View className="news-list-nav">
          <View className={curPage <= 1 ? 'disabled' : ''} onClick={() => setCurPage(curPage - 1)}>prev</View>
          <View>{curPage} / {total}</View>
          <View className={curPage === total ? 'disabled' : ''} onClick={() => setCurPage(curPage + 1)}>more</View>
        </View>
        <View className="news-list">
          {list.map(item =>
            <View className="news-item" key={item.id}>
              <View className="score">{item.score}</View>
              <View className="body">
                <View className="title">
                  <Text>{item.title}</Text>
                  <Text className="host"> (github.com)</Text>
                </View>
                <View className="meta">
                  <View className="by">
                    by {item.by}
                  </View>
                  <View className="time">
                    {moment(item.time).fromNow()}
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '云开发 Hacker News',
  navigationBarBackgroundColor: '#f60',
  navigationBarTextStyle: 'white'
}

export default Index

