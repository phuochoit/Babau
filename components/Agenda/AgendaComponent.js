import React, { Component } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { Container, Content, Spinner, Icon, View, Text } from "native-base";
import { isUndefined, isEmpty, filter } from "lodash";
import { Row, Grid, Col } from 'react-native-easy-grid';

// query
// import { listByQuery, DeleteByQuery } from "../../databases/allSchemas";
//style
import { styles, deviceHeight } from "../../assets/css/style";
// Component
import HeaderComponent from "../Config/HeaderComponent";
import AgendaFlatListItem from "./AgendaFlatListItem";
//screenName
import { ADDAGENDA } from "../../values/screenName";

class AgendaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            refreshing: false
        };

        this.props.onfetchNetConnected();
    }
    componentWillMount = () => {
        this._onfetchAgenda();
    };

    _onfetchAgenda = () => {
        this.props.onfetchAgenda();
    }

    // _getAgenda = async () => {
    //     let query = `SELECT * FROM Diary As D WHERE D.status = 1`;
    //     await listByQuery(query).then((list) => {
    //         this.setState({
    //             list,
    //             refreshing: false,
    //         });
    //     }).catch((error) => {
    //         this.setState({
    //             list: [],
    //             refreshing: false
    //         });
    //     });
    // }
    // refreshFlatList = (deletedKey) => {
    //     this._onDeleteAgenda(deletedKey);
    //     this.setState({
    //         list: filter(this.state.list, function (val, key) {
    //             return val._id != deletedKey;
    //         })
    //     })

    // }
    _onDeleteAgenda = (id) => {
        this.props.onfetchDeleteAgenda(id);
    }
    _addAgenda = () => {
        this.props.navigation.navigate(ADDAGENDA, {
            title: 'Thêm Nhật Ký'
        });
    }
    // _onRefresh = () => {
    //     this.setState({
    //         refreshing: true,
    //     });
    //     this._getAgenda();
    // }
    render() {
        console.log('====================================');
        console.log('title-agenda', this.props.agenda);
        console.log('====================================');
        const { params } = this.props.navigation.state;
        const top = - (deviceHeight * 0.2);
        return (
            <Container style={styles.wrapper}>
                <HeaderComponent
                    title={"Nhật Ký"}
                    heights={0.2}
                    hasBackButton={true}
                    navigation={this.props.navigation}
                />
                {(isEmpty(this.props.agenda)) ?
                    <Grid style={[styles.wrapperGridContent, { marginTop: top / 1.2 }]}>
                        <Content contentContainerStyle={styles.fl1} padder>
                            <Row style={styles.Agenda_wrapper_boxRow}>
                                <TouchableOpacity onPress={this._addAgenda}>
                                    <View style={styles.Agenda_flex_align_center}>
                                        <Text style={[styles.PregnancyFlatListItem_RightText, styles.txt_color, styles.csfontF]}>Thêm</Text>
                                        <Icon name="ios-add" style={[styles.HeaderIcon, styles.txt_color, styles.mgL]} />
                                    </View>
                                </TouchableOpacity>
                            </Row>
                            <Row style={[styles.jccaic]}>
                                <Text style={[styles.PregnancyFlatListItem_RightText, styles.txt_color1, styles.csfontF, styles.ContentBoxH3, styles.txt_alignC]}>Bạn vẫn chưa viết nhật ký nào. Xin vui lòng thêm nhật ký mới!</Text>
                            </Row>
                        </Content>
                    </Grid>
                    :
                    <Grid style={[styles.wrapperGridContent, { marginTop: top / 1.2 }]}>
                        <Content contentContainerStyle={styles.fl1} padder>
                            <Row style={styles.Agenda_wrapper_boxRow}>
                                <TouchableOpacity onPress={this._addAgenda}>
                                    <View style={styles.Agenda_flex_align_center}>
                                        <Text style={[styles.PregnancyFlatListItem_RightText, styles.txt_color, styles.csfontF]}>Thêm</Text>
                                        <Icon name="ios-add" style={[styles.HeaderIcon, styles.txt_color, styles.mgL]} />
                                    </View>
                                </TouchableOpacity>
                            </Row>
                            <Row>
                                <FlatList
                                    style={styles.PregnancyFlatList}
                                    data={this.props.agenda}
                                    renderItem={({ item, index }) =>
                                        <AgendaFlatListItem
                                            {...item}
                                            itemIndex={index}
                                            navigationParams={params}
                                            navigations={this.props.navigation}
                                            parentFlatList={this}
                                        />}
                                    keyExtractor={item => item._id}
                                    onRefresh={this._onRefresh}
                                    refreshing={this.state.refreshing}
                                />
                            </Row>
                        </Content>
                    </Grid>
                }
            </Container>
        );
    }
}

export default AgendaComponent;