import members from './member.csv';

// csv 파일 표에서 row목록을 데이터를 가져와 처리하는 함수

const CsvCompo = () => {
  console.log('csvcompo');
  return (
    <div>
      {members.map((row) => {
        const name = row[1];
        const age = row[2];
        return <p>{`${name} is ${age} years old`}</p>;
      })}
    </div>
  );
};
export default CsvCompo;
