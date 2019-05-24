import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, Alert, Button
} from 'react-native';
const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridTd: {
        width: 80,
        height: 80,
        borderWidth: 1,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridTdText: {
        fontSize: 40,
        lineHeight: 80
    }
});
export default class Toe extends Component {
    static navigationOptions = {
        title: 'Toe',
    };
    public state: ToeState;
    private current: number = 0;
    private win: Array<string> = ['012', '345', '678', '036', '147', '258', '048', '246'];
    private oteam: Array<string> = [];
    private xteam: Array<string> = [];
    constructor(props: any) {
        super(props);
        this.state = {
            numbers: []
        };
    }
    public componentDidMount() {
        let a = [];
        for (let i = 0; i < 3; i++) {
            let inner = [];
            for (let j = 0; j < 3; j++) {
                inner.push({ id: 3 * i + j, text: '-' });
            }
            a.push(inner)
        }
        this.setState({ numbers: a });
    }
    //简单文本输入事件展示
    render() {
        console.log(this.state.numbers);
        const listItems = this.state.numbers.map((number, index) =>
            <View style={{ flexDirection: 'row' }} key={index}>
                {number.map((item, iIndex) => <TouchableOpacity
                    onPress={this._onPressButton.bind(this, item.id.toString())}
                    key={iIndex}
                >
                    <View style={styles.gridTd}>
                        <Text style={styles.gridTdText}>{item.text}</Text>
                    </View>
                </TouchableOpacity>)}
            </View>
        );
        return (
            <View style={styles.main}>
                <View><Text>开发中~~~~</Text></View>
                {listItems}
                <Button title='reset' onPress={this._onReset.bind(this)}></Button>
            </View>
        );
    }
    private _onReset() {
        let a = [];
        for (let i = 0; i < 3; i++) {
            let inner = [];
            for (let j = 0; j < 3; j++) {
                inner.push({ id: 3 * i + j, text: '-' });
            }
            a.push(inner)
        }
        this.setState({ numbers: a });
        this.oteam = [];
        this.xteam = [];
        this.current = 0;
    }
    private _onPressButton(item: string) {
        //判断是否重复点击
        const haha: Array<string> = [...this.oteam, ...this.xteam];
        const nnn: number = Number.parseInt(item);
        if (haha.includes(item)) {
            Alert.alert('请勿重复点击');
            return;
        }
        let xx = Math.floor(nnn / 3);
        let temp = this.state.numbers;
        let empty = this.state.numbers[xx];
        empty.map((child) => {
            if (child.id.toString() === item) {
                child.text = this.current === 0 ? 'o' : 'x'
            }
        })
        // Alert.alert(JSON.stringify(empty));
        temp[xx] = empty;
        this.setState({ numbers: temp })
        if (this.current === 0) {
            this.current = 1;
            this.oteam.push(item)
        } else {
            this.current = 0;
            this.xteam.push(item)
        }
        //判断胜利
        let a = this.oteam.sort().join('');
        let b = this.xteam.sort().join('');

        if (this.isMatchWin(a) || this.isMatchWin(b)) {
            this._onReset();
            if (this.isMatchWin(a)) {
                Alert.alert('oo win!!!');
            }
            if (this.isMatchWin(b)) {
                Alert.alert('xx win!!!');
            }
        }

    }

    private isMatchWin(matchStr: string): boolean {
        console.log(matchStr);
        const a = this.win.filter(element => {
            const aStr = element.split('');
            return matchStr.indexOf(aStr[0]) !== -1 && matchStr.indexOf(aStr[1]) !== -1 && matchStr.indexOf(aStr[2]) !== -1
        });
        if (a.length > 0) {
            return true
        }
        return false
    }
}
