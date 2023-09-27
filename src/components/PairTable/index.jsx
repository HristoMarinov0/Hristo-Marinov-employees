import './pairTable.css';
import { secondsToDays } from '../../utils/dates';

export const PairTable = ({ pairTableData }) => {
  const { employee1Id, employee2Id, projects, periodPerProject } =
    pairTableData;
  return (
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Employee ID #1</th>
              <th scope="col">Employee ID #2</th>
              <th scope="col">Project ID</th>
              <th scope="col">Days Worked</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td className="noBorder">{employee1Id}</td>
                <td className="noBorder">{employee2Id}</td>
                <td className="noBorder">{project}</td>
                <td className="noBorder">{secondsToDays(periodPerProject[index])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};
