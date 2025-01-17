import styled from '@emotion/styled'
import {Button} from 'antd'
import ImageMailBox from 'assets/ImageMailBox'
import tw from 'twin.macro'

const Container = styled.div`
    margin-top: 6.5rem;
`

const ImageContainer = styled.div`
    ${tw`tw-flex tw-text-center tw-flex-1 tw-justify-center tw-items-center`}
`

const Title = styled.div`
    ${tw`tw-flex tw-text-center tw-flex-1 tw-justify-center tw-items-center tw-font-ohsquare-air tw-font-normal tw-text-lg tw-text-grey-800`}
    margin: 2.4rem 0;
`

const LetterButton = styled(Button)`
    ${tw`tw-font-ohsquare tw-font-bold tw-text-base tw-text-primary-green-500 hover:tw-text-primary-green-500`}
    padding: 1.35rem 0;
    height: inherit;
    background-color: transparent;
    border: 2px solid var(--primary-green-500);
    border-radius: 0.4rem;

    &:hover,
    &:active {
        background-color: transparent;
        border: 2px solid var(--primary-green-500);
    }
`

const Highlight = styled.span`
    ${tw`tw-font-ohsquare tw-font-bold`}
`

const MyLetterSection = ({logined}: {logined: boolean}) => {
    if (!logined) {
        return null
    }
    return (
        <Container>
            <ImageContainer>
                <ImageMailBox />
            </ImageContainer>
            <Title>
                <span>
                    나에게 <Highlight>00 통의 편지</Highlight>를
                    <br />
                    작성했습니다!
                </span>
            </Title>
            <LetterButton block>편지 목록 보기</LetterButton>
        </Container>
    )
}

export default MyLetterSection
