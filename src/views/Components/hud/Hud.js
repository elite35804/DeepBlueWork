import React, { PureComponent } from 'react';
import {View, Text, Image, Animated, StyleSheet, Easing} from 'react-native';
import Loader from '@/assets/images/LoaderImg.svg'
import PropTypes from 'prop-types';

import Indicator from '../controls/Indicator';

export default class Hud extends PureComponent {
  mount = false;

  state = {
    isShow: false,
    text: '',
    opacityValue: new Animated.Value(0),
  }
  spinValue = new Animated.Value(0);


  componentDidMount() {
    this.mount = true;
  }

  componentWillUnmount() {
    this.mount = false;
  }

  show(text = '', after = null) {
    this.setState({
      isShow: true,
      text,
    });

    this.isShow = true;
    Animated.loop(
      Animated.timing(
        this.spinValue,
        {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    ).start();

    if (after !== null) {
      this.close(after);
    }
  }

  close(after = null) {
    if (!this.isShow) return;

    const animate = () => {
      Animated.timing(this.state.opacityValue, {
        toValue: 0.0,
        duration: this.props.fadeOutDuration,
        useNativeDriver: true
      }).start(() => {
        this.mount && this.setState({
          isShow: false,
        });
        this.isShow = false;
      });
    };

    if (after !== null) {
      setTimeout(animate, after);
    } else {
      animate();
    }
  }

  render() {
    const {
      hudType, textOnly, source, backgroundTouchable,
      style, imageStyle, textStyle, positionValue,
      ...hudProps
    } = this.props;

    let hud = null;
    console.log(hudType, 'type', imageStyle)
    // if (!textOnly) {
    //   switch (hudType) {
    //     case 'info':
    //       hud = <Image style={[styles.image, imageStyle]} source={require('./src/info.png')} />;
    //       break;
    //     case 'success':
    //       // hud = <Image style={[styles.image, imageStyle]} source={require('./src/success.png')} />;
    //       hud = <Loader width={20} height={20}/>;
    //       break;
    //     case 'error':
    //       hud = <Image style={[styles.image, imageStyle]} source={require('./src/error.png')} />;
    //       break;
    //     default:
    //       if (this.props.source) {
    //         hud = <Image style={[styles.image, imageStyle]} source={source} />;
    //       } else {
    //         hud = <Indicator {...hudProps} />
    //       }
    //       break;
    //   }
    // }

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    const view = this.state.isShow ?
      (<View style={[styles.container]}>
          {/*<View style={styles.content}>*/}
            <Animated.Image
              style={{transform: [{rotate: spin}], width: 40, height: 40, tintColor: 'white' }}
              source={require('@/assets/images/LoaderImg.png')} />
          {/*</View>*/}
      </View>

      ) : null;
    return view;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
    zIndex: 1000
  },
  content: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 24,
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    color: 'white',
  },
  image: {
    marginBottom: 0,
  },
});

Hud.propTypes = {
  fadeInDuration: PropTypes.number,
  fadeOutDuration: PropTypes.number,
  opacity: PropTypes.number,
  positionValue: PropTypes.number,
  textOnly: PropTypes.bool,
  hudType: PropTypes.string,
  backgroundTouchable: PropTypes.bool,
};

Hud.defaultProps = {
  textStyle: styles.text,
  fadeInDuration: 500,
  fadeOutDuration: 500,
  opacity: 1,
  positionValue: 0,
  textOnly: false,
  backgroundTouchable: false,
  imageStyle: {
    tintColor: 'white',
  },
  source: null,
  style: null,
  hudType: 'success',
  color: '#000',
  size: 40,
};
