import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SearchResultScreen from './screens/SearchResultScreen';

const Stack = createStackNavigator();

const CustomHeaderTitle = () => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 20 }}>
			<View>
				<Text>Smart</Text>
				<Text>Shopper</Text>
			</View>
		</TouchableOpacity>
	);
};

const HeaderRight = ({ navigation }) => (
	<TouchableOpacity style={{ marginRight: 20 }} /**onPress={() => navigation.navigate('Settings')}**/>
		<MaterialIcons name="account-circle" size={40} color="black" />
	</TouchableOpacity>
);

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Main"
				screenOptions={{
					headerTitle: '',
					headerRight: () => <HeaderRight />,
					headerLeft: () => <CustomHeaderTitle />,
				}}
			>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="SearchResult" component={SearchResultScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}