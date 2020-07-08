import React, {Component} from 'react';
import {Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as firebase from 'firebase';
import {StyleSheet, Text, View} from 'react-native';



class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    signUpUser = (email, password) => {
        if (this.state.password.length < 5){
            alert("Entrez au moins 5 caractères")
            return;
        }
        else if(firebase.auth().createUserWithEmailAndPassword(email,password)){
            this.props.navigation.navigate('Home');
        }
        
    }

    loginUser = (email, password) => {
        if(firebase.auth().signInWithEmailAndPassword(email,password)){
            this.props.navigation.navigate('Home');
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(email) => this.setState({email})}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(password) => this.setState({password})}
                        />
                    </Item>

                    <Button 
                        style= {{ marginTop: 10 }}
                        full
                        rounded
                        success
                        onPress = {()=> this.loginUser(this.state.email, this.state.password)}
                    >
                        <Text style={{ color: 'white' }}>Login</Text>
                    </Button>

                    <Button 
                        style= {{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        onPress = {()=> this.signUpUser(this.state.email, this.state.password)}
                    >
                        <Text style={{ color: 'white' }}>Sign up</Text>
                    </Button>

                </Form>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFF',
        justifyContent: "center",
        padding:10,
    }
});

export default Login;


