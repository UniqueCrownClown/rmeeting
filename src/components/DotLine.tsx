import React, { Component } from 'react';
import { View } from 'react-native';
declare interface DotLineProps {
  long: number
}
export default class DotLine extends Component<DotLineProps> {
  constructor(props: DotLineProps) {
    super(props);
  }

  render() {
    const count = this.props.long / 8;
    const list = (count: number) => {
      var res = [];
      for (let i = 0; i < count; i++) {
        res.push(<View style={{
          width: 4, height: 1, backgroundColor: '#cccccc'
        }} key={i.toString()}></View>)
      }
      return res
    }
    return <View style={{ flex: 0, flexDirection: 'row', width: this.props.long, justifyContent: 'space-between' }}>
      {list(count)}
    </View>
  }
}
