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
            eventsWeek: [],
            eventsAfter: []
        }
    }

    async componentDidMount() {
        //let response = await EventsService.list();
        let eventsWeek = await EventsService.getEventsThisWeek(10);
        let eventsAfter = await EventsService.getEventsAfter();
        this.setState({eventsWeek, eventsAfter});
    }

    render() {

        let {eventsWeek, eventsAfter} = this.state;
        let {navigation} = this.props;

        return (
            <ScrollView style={styles.container}>

                <Title title={"Liste des appartements"}/>

                {/*{
                    events.map(item => {
                        return (<EventBox key={item.id}/>)
                    })
                }*/}

                <FlatList
                    data={eventsWeek}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    backgroundColor={"#FFF"}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <EventBox navigation={navigation} data={item.fields} horizontal={true}/>} />

                <Title title={"Découvrez aussi les maisons"}/>

                <FlatList
                    data={eventsAfter}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    backgroundColor={"#FFF"}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <EventBox navigation={navigation} data={item.fields}/>} />


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
