import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { IndexProps, IndexState } from './index.interface'
import Recorder from '../../utils/recorder'
import './index.scss'

@connect(({ index }) => ({
    ...index,
}))

class Index extends Component<IndexProps, IndexState> {
    config: Config = {
        navigationBarTitleText: 'Taro'
    }

    componentDidMount() {
        this.initRecorder()
        const { dispatch } = this.props;
        dispatch({
            type: 'index/setText',
            payload: 'hello world',
        });
    }
    // 初始化录音
    initRecorder() {
        // webkit shim
        window.AudioContext = window.AudioContext ||
        // @ts-ignore：webkitAudioContext
            window.webkitAudioContext
        navigator.getUserMedia =
            navigator.getUserMedia ||
            // @ts-ignore：webkitGetUserMedia
            navigator.webkitGetUserMedia ||
            // @ts-ignore：mozGetUserMedia
            navigator.mozGetUserMedia ||
            // @ts-ignore：msGetUserMedia
            navigator.msGetUserMedia
        window.URL = window.URL || window.webkitURL
        navigator.getUserMedia(
            { audio: true },
            this.startUserMedia.bind(this),
            function (e) {
                console.info("No live audio input: " + e)
            }
        )
    }
    // 得到用户权限
    startUserMedia(stream, _this) {
        let audio_context = new AudioContext()
        var input = audio_context.createMediaStreamSource(stream)
        console.info("Media stream created.")
        let recorder = new Recorder(input, {
            numChannels: 1,
            sampleRate: 16000
        })
        this.setState({
            // @ts-ignore：recorder: recorder
            recorder: recorder
        })
        console.log(recorder)
        console.info("Recorder initialised.")
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
