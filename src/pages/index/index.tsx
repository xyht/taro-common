import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { IndexProps, IndexState } from './index.interface'
import './index.scss'

@connect(({ index }) => ({
  ...index,
}))

class Index extends Component<IndexProps, IndexState> {
  config: Config = {
    navigationBarTitleText: 'Taro + dva demo'
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'index/setText',
      payload: 'like',
    });
  }

  render() {
    const { text } = this.props
    return (
      <View className='fx-index-wrap'>
        <Text>{text}</Text>
      </View>
    )
  }
}

export default Index
