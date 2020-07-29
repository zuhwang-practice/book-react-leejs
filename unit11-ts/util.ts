export const getEnumLength = (enumOBJ: any): number => {
  const keys = Object.keys(enumOBJ); //[키,키,키,키...]
  console.log({ msg: '여기는 열거객체 갯수 구하는 함수입니당', keys });
  // [ '0','1','2','5','Orange','Orange2','Orange3','Apple','Banana','Kiwi'];  ! 양방향인 녀석들은 값도 들어감 ㅠ
  // let result = 0;
  // keys.filter((key) => {
  //   console.log('key = ', key, ' value = ', enumOBJ[key], typeof enumOBJ[key]);
  //   typeof enumOBJ[key] === 'string' && result++;
  //   console.log(result);
  //   return result;
  // });
  // ! 리듀서로 더 단순하게 구성
  const resultReduce = keys.reduce((acc, key) => {
    typeof enumOBJ[key] === 'string' && acc++;
    // console.log(acc)
    return acc;
  }, 0);
  console.log({ return: resultReduce });
  return resultReduce;

  // const keys = Object.keys(enumOBJ);
  // return keys.reduce((acc, key) => {
  //   // ? 값이 숫자인경우 양뱡향 맵핑 됨으로 주의!
  //   return typeof enumOBJ[key] === 'string' ? acc + 1 : acc;
  // }, 0);
};

export const isValidEnumValue = (enumOBJ: any, value: number | string) => {
  if (typeof value === 'number') {
    // 양방향일때 조회 가능
    return Boolean(enumOBJ[value]);
  } else {
    // 단방향일때
    const keys = Object.keys(enumOBJ);
    const result = keys.filter((key) => {
      return value === enumOBJ[key];
    });
    console.log({ return: result });
    return result.length ? true : false;
  }
  // console.log({ resultArr });

  // if (typeof value === 'number') {
  //   return !!enumOBJ[value]; // ! 값이 숫자일때 양방향으로 매핑됬는지 검사
  // } else {
  //   const result = Object.keys(enumOBJ)
  //     .filter((key) => isNaN(Number(key)))
  //     .find((key) => enumOBJ[key] === value);
  //   return (
  //     // ! 값이 문자열이면, 양방량 매핑에 의해 생성된 키를 제거하고 해당 값이 존재하는지 검사
  //     result != null
  //   );
  // }
};
