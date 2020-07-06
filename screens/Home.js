import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList
} from 'react-native';
import Title from "../components/Title";
import EventBox from "../components/EventBox";
import EventsService from "../services/events.service";

class Home extends Component{

    constructor(props) {
        super(props);

        this.state = {
            AppartementList: [],
        }
    }

    async componentDidMount() {
        let AppartementList = await EventsService.list();
        this.setState({AppartementList});
    }

    render() {

        let {AppartementList} = this.state;
        let {navigation} = this.props;

        return (
            <ScrollView style={styles.container}>

                <Title title={"Liste des appartements"}/>

                <FlatList
                    data={AppartementList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    backgroundColor={"#FFF"}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <EventBox navigation={navigation} data={item.fields} horizontal={true}/>} />
            </ScrollView>
        )
    }

}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: 70
    }
});
