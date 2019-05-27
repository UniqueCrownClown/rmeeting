import React, { Component } from 'react';
import {
  StyleSheet, View, Text, SectionList, Alert, FlatList, TouchableOpacity
} from 'react-native';
import { pySegSort } from '../utils/pingyin';
const styles = StyleSheet.create({
  linkManItem: {
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    height: 60,
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  outcircle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginHorizontal: 30,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue'
  },
  incircle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: '#fff'
  },
  outcircleActive: {
    backgroundColor: '#ddd'
  },
  incircleActive: {
    backgroundColor: 'skyblue'
  },
  nameText: {
    color: '#666'
  }

});
export declare interface ISelectItem {
  name: string,
  isSelect: boolean,
  time?: string,
  size?: string
}
declare interface GroupSelectItem {
  title: string,
  data: Array<ISelectItem>
}
declare interface SelectItemProps {
  items: Array<ISelectItem>,
  haha: (index: number) => void
}
declare interface SelectItemState {
  items: any
}
export default class SelectItem extends Component<SelectItemProps, SelectItemState> {
  constructor(props: SelectItemProps) {
    super(props);
    this.state = {
      items: [{ title: 'A', data: [{ name: 'A111', isSelect: false }, { name: 'A222', isSelect: false }] },
      { title: 'B', data: [{ name: 'B111', isSelect: false }, { name: 'B222', isSelect: false }] }]
    };
  }
  public render() {
    const { items } = this.props;

    return (
      <View>
        <SectionList
          renderItem={({ item, index, section }) => this.renderItem(item, index)}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: "bold" }}>{title}</Text>
          )}
          sections={this.groupData(items)}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }

  public renderItem(item, index) {
    return <TouchableOpacity key={index} style={styles.linkManItem} onPress={() => this.props.haha(index)}>
      <View style={item.isSelect ? [styles.outcircle, styles.outcircleActive] : styles.outcircle}>
        <View style={item.isSelect ? [styles.incircle, styles.incircleActive] : styles.incircle}></View>
      </View>
      <Text style={styles.nameText}>{item.name}</Text>
    </TouchableOpacity>;
  }

  public groupData(items: Array<ISelectItem>) {
    let returnData: Array<GroupSelectItem> = [];
    const xxx = items.map(item => item.name);
    const filter = pySegSort(xxx);
    filter.forEach(element => {
      let tempData = [];
      if (element.data.length > 0) {
        element.data.forEach(item => {
          tempData.push(items.find(element => element.name === item))
        })
      }
      returnData.push({
        title: element.title,
        data: tempData
      })
    });
    return returnData;
  }

}