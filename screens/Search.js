import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    Image
} from 'react-native';
import EventsService from "../services/events.service";
import EventBox from "../components/EventBox";
import search from './../assets/search.png';

class Search extends Component{

    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    async searchEvent(text){
        if(text.length > 2){
            let events = await EventsService.getEventsByName(20, text);
            this.setState({events});
        }else{
            this.setState({events: []});
        }
    }

    render() {

        let {events} = this.state;
        let {navigation} = this.props;

        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <Image source={search} style={styles.headerImage}/>
                    <TextInput style={styles.inputSearch}
                        placeholder={"Rechercher un event..."}
                        onChangeText={(text) => this.searchEvent(text)}/>
                </View>

                <FlatList
                    data={events}
                    backgroundColor={"#FFF"}
                    keyExtractor={item => item.fields.id}
                    renderItem={({item}) => <EventBox data={item.fields} navigation={navigation}/>}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flex: 1
    },
    header: {
        display: "flex",
        flexDirection: "row",
        marginTop: 70,
        alignItems: "center",
        marginHorizontal: 10,
        marginBottom: 20
    },
    headerImage:{
        marginRight: 10,
        width: 25,
        height: 25
    },
    inputSearch: {
        fontSize: 22
    }
});

export default Search;
