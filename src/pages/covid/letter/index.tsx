import styled from '@emotion/styled'
import {GetServerSideProps} from 'next'
import {withAxios} from '$utils/fetcher/withAxios'
import {Letter} from '$types/response/letter'
import cookies from 'next-cookies'
import Back from '$components/appbar/Back'
import HalfLayer from '$components/layer/HalfLayer'
import {useState} from 'react'
import {convertCommonDateFormat} from '$utils/date'
import tw from 'twin.macro'
import {FontOhsquare, FontOhsquareAir} from '$styles/utils/font'
import {FlexCenter, FlexStart} from '$styles/utils/layout'
import {useRouter} from 'next/router'
import ROUTES from '$constants/routes'

const Container = styled.div`
    ${tw`tw-bg-beige-300 tw-h-screen`}
    min-height: 100vh;
    padding: 3.2rem 2.4rem;
`
const LettersContainer = styled.div`
    padding-top: 5.6rem;
`
const TitleContainer = styled.div`
    ${FontOhsquare}
    ${FlexStart}
    ${tw`tw-text-left tw-text-xl tw-text-primary-green-500`}
    
    .icon-letter {
        margin-top: 0.2rem;
        margin-left: 0.8rem;
    }
`
const SubTitle = styled.div`
    ${FontOhsquareAir}
    ${FlexStart}
    ${tw`tw-text-left tw-text-base tw-text-primary-green-500`}
    margin-top: 0.8rem;
`
const EmptyListContainer = styled.div`
    margin-top: 20.7rem;
    
    div {
        ${FlexCenter}
        span {
            ${tw`tw-text-base tw-text-center tw-text-primary-green-500 tw-font-normal`}
        }
    }
    
    button {
        margin-top: 3.2rem;
        ${FlexCenter}
        ${tw`tw-bg-primary-green-500 tw-w-full`}
        height: 5.2rem;
        border-radius: 0.4rem;
        
        span {
            font-family: Cafe24 Ohsquare;
            font-weight: bold;
            font-size: 16px;
            line-height: 25px;
            ${tw`tw-text-grey-000`} 
        }
    }
`
const ListContainer = styled.ul``
const ItemContainer = styled.li`
    margin: 1rem;
    padding 1rem;
    border: solid;
`

const Letters = ({letters}: {letters: Letter[]}) => {

    const router = useRouter()
    const [isShowEnvelope, setIsShowEnvelop] = useState(false)
    const [openedLetterId, setOpenedLetterId] = useState('')

    const openEnvelope = (encryptedId: string) => {
        setOpenedLetterId(encryptedId)
        setIsShowEnvelop(true)
    }
    const closeEnvelope = () => {
        setOpenedLetterId('')
        setIsShowEnvelop(false)
    }

    const createNewLetter = () => {
        router.push({pathname: ROUTES.COVID.LETTER.OPTION})
    }

    const letterList = letters.length > 0
        ? (
            <ListContainer>
                {letters.map(({title, state, sticker, createdDate, encryptedId}) => (
                    <ItemContainer key={encryptedId} onClick={() => openEnvelope(encryptedId)}>
                        <div>제목: {title}</div>
                        <div>작성일: {convertCommonDateFormat(createdDate)}</div>
                        <div>발송기준: -</div>
                        <div>전송상태: {state} - UI 적용</div>
                        <div>스티커: {sticker} - UI 적용</div>
                    </ItemContainer>
                ))}
            </ListContainer>
        )
        : (
            <EmptyListContainer>
                <div>
                    <span>작성된 편지가 없어.<br/>한번 편지를 쓰러 가볼까?</span>
                </div>
                <button onClick={createNewLetter}>
                    <span>편지 작성</span>
                </button>
            </EmptyListContainer>
        )

    return (
        <>
            <Back />
            <Container>
                <LettersContainer>
                    <TitleContainer>작성한 편지 목록 <span className="icon-letter">✉️</span></TitleContainer>
                    <SubTitle>과거의 내가 작성한 편지들이에요.</SubTitle>
                    {letterList}
                </LettersContainer>

                <HalfLayer isShow={isShowEnvelope} closeFn={closeEnvelope} >
                    {openedLetterId}
                </HalfLayer>
            </Container>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {letterLogin} = cookies(context)
    const letters = await withAxios<Letter[]>({
        url: '/letters',
        method: 'GET',
        data: {
            letterLogin,
        },
    })

    return {
        props: {
            letters,
        },
    }
}

export default Letters
