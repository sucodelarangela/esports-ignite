import { ImageBackground } from 'react-native'

import { styles } from './styles'

import backgroundImg from '../../assets/background-galaxy.png'

interface Props {
    children: React.ReactNode
}

export function Background({ children }: Props) {
    return (
        <ImageBackground
            source={backgroundImg}
            defaultSource={backgroundImg} //propriedade memoriza a imagem padrão e agiliza o carregamento
            style={styles.container}
        >
            {children}
        </ImageBackground>
    )
}

// Background será o mesmo em toda a aplicação, portanto fizemos um componente apenas para ele