import Taro from "@tarojs/taro"
import { View, Image } from '@tarojs/components'
import logo from '../../assets/logo.png'

import './index.scss'

function Header(props) {
  const {
    types,
    onSelect = () => { }
  } = props
  return (<View className="header">
    <Image src={logo} className="logo"></Image>
    {
      types.map(type => <View key={type} className="link" onClick={() => onSelect(type)}> {type} </View>)
    }
  </View>)
}

export default Header
