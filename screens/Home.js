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
            apartmentList: [],
            cheapApartment: [],
            apartFor2: []
        }
    }

    async componentDidMount() {
        let apartmentList = await EventsService.list();
        let cheapApartment = await EventsService.getCheapApartment();
        let apartFor2 = await EventsService.getApartmentFor2();
        this.setState({apartmentList, cheapApartment, apartFor2});
    }

    render() {

        let {apartmentList, cheapApartment, apartFor2} = this.state;
        let {navigation} = this.props;

        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>

                    <Title title={"Liste des appartements"}/>

                    <FlatList
                        data={apartmentList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        backgroundColor={"#FFF"}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <EventBox navigation={navigation} data={item.fields} horizontal={true}/>} />

                    <Title title={"Appartements à bas prix"}/>

                    <FlatList
                        data={cheapApartment}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        backgroundColor={"#FFF"}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <EventBox navigation={navigation} data={item.fields} horizontal={true}/>} />

                        <Title title={"Pour les weekends en couple"}/>

                    <FlatList
                        data={apartFor2}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        backgroundColor={"#FFF"}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <EventBox navigation={navigation} data={item.fields} horizontal={true}/>} />
                    </ScrollView>
                </View>
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
