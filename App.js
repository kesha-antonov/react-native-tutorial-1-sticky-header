/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Animated,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import PropTypes from 'prop-types'


function Tab ({ name, isActive = false, onPress, num }) {
  return (
    <Text
      style={[styles.tabText, isActive ? styles.activeTabText : null]}
      onPress={() => onPress(num)}
    >
      {name}
    </Text>
  )
}

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  num: PropTypes.number.isRequired,
}

function Tabs ({ style }) {
  const [activeTab, setActiveTab] = useState(0)

  function onPressTab (num) {
    setActiveTab(num)
  }

  return (
    <Animated.ScrollView
      horizontal
      style={[styles.tabs, style]}
    >
      <Tab
        name='Оглавление'
        isActive={activeTab === 0}
        num={0}
        onPress={onPressTab}
      />
      <Tab
        name='Список курсов'
        isActive={activeTab === 1}
        num={1}
        onPress={onPressTab}
      />
      <Tab
        name='Об авторе'
        isActive={activeTab === 2}
        num={2}
        onPress={onPressTab}
      />
    </Animated.ScrollView>
  )
}

function Header () {
  return (
    <View>
      <Image
        source={require('./bg.jpeg')}
        resizeMode='center'
        style={styles.image}
      />
    </View>
  )
}

function Content ({ title }) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>
        Edit <Text style={styles.highlight}>App.js</Text> to change this
        screen and then come back to see your edits.
      </Text>
    </View>
    )
}

const IMAGE_HEIGHT = 200

class App extends Component {

  // state = {
  //   tabsTop: null
  // }
  statusBarHeight = 20
  tabsScroll = new Animated.Value(0)
  constructor () {
    super()

    this.tabsTop = this.tabsScroll.interpolate({
      inputRange: [0, IMAGE_HEIGHT],
      outputRange: [IMAGE_HEIGHT + this.statusBarHeight, this.statusBarHeight],
      extrapolateLeft: 'extend',
      extrapolateRight: 'clamp',
    })
  }

  // onLayoutTabs () {
  //
  //   tabsTop
  //
  //   const tabsTop = this.tabsScroll.interpolate({
  //     inputRange: [0, _tabsTop, 9999]
  //     outputRange: [_tabsTop, _tabsTop, 9999]
  //     extrapolateLeft: 'extend'
  //     extrapolateRight: 'clamp'
  //   })
  //
  //   this.setState({tabsTop})
  // }

  render () {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
            scrollEventThrottle={16}
            onScroll={
              Animated.event(
                [{
                  nativeEvent: {
                    contentOffset: {
                      y: this.tabsScroll
                    }
                  }
                }]
              )
            }
          >
            <Header />
            <View style={styles.body} >
              <Content title='Step One' />
              <Content title='Step Two' />
              <Content title='Step Three' />
              <Content title='Step Four' />
              <Content title='Step Five' />
              <Content title='Step Six' />
              <Content title='Step Seven' />
            </View>
          </ScrollView>
          <Tabs style={{transform: [{ translateY: this.tabsTop }]}} />
        </SafeAreaView>
      </>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
  },
  image: {
    height: IMAGE_HEIGHT,
    width: '100%'
  },
  tabs: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgb(32, 107, 69)'
  },
  tabText: {
    fontSize: 20,
    fontWeight: '400',
    paddingHorizontal: 10,
    paddingVertical: 20,
    color: '#fff'
  },
  activeTabText: {
    fontWeight: '700',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
