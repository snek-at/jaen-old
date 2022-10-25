import {Box} from '@chakra-ui/react'
import {useSnekFinder} from '@jaenjs/snek-finder'

export const FilesView = () => {
    const finder = useSnekFinder({mode: 'browser'})

  return <Box h="85vh">{finder.finderElement}</Box> 
}