import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MapWithMarkers from '../examples/MapWithMarkers';
import { MAP_WITH_MARKERS } from './routeNames';

const Stack = createStackNavigator({
  [MAP_WITH_MARKERS]: { screen: MapWithMarkers },
});

export default createAppContainer(Stack);
