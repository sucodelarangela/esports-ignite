import { useEffect, useState } from 'react'
import { Image, FlatList } from 'react-native'
import { styles } from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo-nlw-esports.png'

import { Heading } from '../../components/Heading'
import { GameCard, GameCardProps } from '../../components/GameCard'
import { Background } from '../../components/Background'

export function Home() {
    const [games, setGames] = useState<GameCardProps[]>([])
    const navigation = useNavigation()

    function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
        navigation.navigate('game', { id, title, bannerUrl })
    }

    useEffect(() => {
        fetch('http://10.0.0.171:3333/games')
            .then(res => res.json())
            .then(data => setGames(data))
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image
                    source={logoImg}
                    style={styles.logo}
                />
                <Heading
                    title="Encontre seu duo!"
                    subtitle="Selecione o game que deseja jogar..."
                />
                <FlatList
                    data={games}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <GameCard
                            data={item}
                            onPress={() => handleOpenGame(item)}
                        />
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.contentList}
                />

            </SafeAreaView>
        </Background>
    )
}