export type ResponseCode = '00' | '99'

/**
 * @todo BE와 논의가 필요합니다.
 * 현재 구조는 {code, message, result}로 받는다고 가정
 */
export interface Response<T> {
    code: ResponseCode
    message: string
    result: T
}