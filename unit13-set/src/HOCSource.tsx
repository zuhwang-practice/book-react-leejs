import React from 'react';
import withAge, { InjectedProps } from './HOCTypes';


// 고차컴포와 상관없이 갖고 있는 속성에 대한 타입지정
interface OwnProps {
  name: string;
}
// 고차컴포가 적용된 속성값의 타입
type Props = OwnProps & InjectedProps;

const MyCompo : React.FunctionComponent<Props> = function ({name,age}){
  return (
    //,,,
  )
}

// 자신의 속성값 타입 정보를 고차컴포넌트의 제네릭으로 입력
export default withAge<OwnProps>(MyCompo)