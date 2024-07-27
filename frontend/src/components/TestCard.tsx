const TestCard = ({ test }) => {
    const formattedDate = moment(test.date).format('MMMM Do YYYY, h:mm:ss a');
    return (
      <div className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <h3 className="text-xl font-semibold text-btn-main dark:text-gray-300">Test ID: {test._id}</h3>
        <p className="text-gray-700 dark:text-gray-400">Average Time: {test.avgTime.toFixed(2)}s</p>
        <p className="text-gray-700 dark:text-gray-400">Date: {formattedDate}</p>
        <p className="text-gray-700 dark:text-gray-400">Question Bank ID: {test.questionBankId}</p>
        <p className="text-gray-700 dark:text-gray-400">Score: {test.score}</p>
        <p className="text-gray-700 dark:text-gray-400">Total Time: {test.totalTime.toFixed(2)}s</p>
      </div>
    );
  };
  