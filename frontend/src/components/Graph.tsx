import { LineChart } from '@mui/x-charts'

const Graph = (noOfQues: number[]) => {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7,  8, 10, 11, 12] }]}
      series={[
        {
          // @ts-ignore
          data: noOfQues?.noOfQuestions,
        },
      ]}
      width={700}
      height={300}
    />
  )
}

export default Graph