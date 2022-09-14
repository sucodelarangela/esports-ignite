import { View, StatusBar } from 'react-native';

// fonts
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter'

import { Background } from './src/components/Background';

import { Routes } from './src/routes'
import { Loading } from './src/components/Loading';

export default function App() {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_600SemiBold,
		Inter_700Bold,
		Inter_900Black
	})

	return (
		<Background>
			<StatusBar
				barStyle='light-content'
				backgroundColor='transparent'
				translucent
			/>
			{/* se as fontes estiverem carregadas, mostra a aplicação */}
			{fontsLoaded ? <Routes /> : <Loading />}
		</Background>
	);
}
