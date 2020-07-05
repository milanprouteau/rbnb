import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    TouchableOpacity
} from 'react-native';
import tcomb from 'tcomb-form-native';

//Initialisation
const Form = tcomb.form.Form;

//Model
const LoginModel = tcomb.struct({
    email: tcomb.String,
    password: tcomb.String
});

//Options
const options = {
    fields: {
        email: {
            label: "Mon email",
        }
    }
};


class Login extends Component{

    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.state = {
            email: 'test',
            password: 'test'
        }
    }

    handleChange(e, name){
        this.setState({
            [name]: e.nativeEvent.text
        });
    }

    connect(){
        let validate = this.refs.form.validate();
        console.log(validate);


        let {email, password} = this.state;
        if(email !== null && password !== null){
            this.props.navigation.navigate('Home');
        }
    }

    render() {
        return (
            <View ref={this.containerRef} style={styles.container}>


                <Form
                    ref="form"
                    type={LoginModel}
                    options={options}
                    value={this.state} />


                <Button title={"Se connecter"} onPress={() => this.connect()}/>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: "100%",
        fontSize: 20,
        marginBottom: 20,
        marginLeft: 20,
    }
});

export default Login;


