const InterviewResults = ({ results }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Target Query</th>
          <th>User Answer</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {results.target_queries.map((query, index) => (
          <tr key={index}>
            <td>{query}</td>
            <td>{results.user_answers[index]}</td>
            <td>{results.scores[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InterviewResults;
