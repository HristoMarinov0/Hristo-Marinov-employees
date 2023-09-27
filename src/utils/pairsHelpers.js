export function divideEmployeesByProject(csv) {
  return csv.reduce((acc, curr) => {
    acc[curr.projectId]
      ? acc[curr.projectId].push(curr)
      : (acc[curr.projectId] = [curr]);
    return acc;
  }, {});
}

export function getLongestPair(dividedByProject) {
  const pairs = Object.values(dividedByProject).reduce(
    (acc, currProject, index) => {
      currProject.forEach((currEmployee, currIndex) => {
        const employeeCurrStartDate = new Date(currEmployee.dateFrom);
        const employeeCurrEndDate = currEmployee.dateTo
          ? new Date(currEmployee.dateTo)
          : new Date();

        for (let i = currIndex + 1; i < currProject.length; i++) {
          const employeeNextStartDate = new Date(currProject[i].dateFrom);
          const employeeNextEndDate = currProject[i].dateTo
            ? new Date(currProject[i].dateTo)
            : new Date();

          if (
            employeeCurrStartDate < employeeNextEndDate &&
            employeeNextStartDate < employeeCurrEndDate
          ) {
            // check which employee started first
            const periodStart =
              employeeCurrStartDate > employeeNextStartDate
                ? employeeCurrStartDate
                : employeeNextStartDate;

            // check which employee ended first
            const periodEnd =
              employeeCurrEndDate < employeeNextEndDate
                ? employeeCurrEndDate
                : employeeNextEndDate;

            const periodInSeconds =
              (periodEnd.getTime() - periodStart.getTime()) / 1000;
            const pair = Object.keys(acc).find(
              (element) =>
                element ===
                  `${currEmployee.employeeId} ${currProject[i].employeeId}` ||
                element ===
                  `${currProject[i].employeeId} ${currEmployee.employeeId}`
            );

            if (pair) {
              acc[pair].totalTime += periodInSeconds;
              acc[pair].projects.push(Object.keys(dividedByProject)[index]);
              acc[pair].periodPerProject.push(periodInSeconds);
            } else {
              acc[`${currEmployee.employeeId} ${currProject[i].employeeId}`] = {
                totalTime: periodInSeconds,
                projects: [Object.keys(dividedByProject)[index]],
                periodPerProject: [periodInSeconds]
              };
            }
          }
        }
      });

      return acc;
    },
    {}
  );

  return Object.values(pairs).reduce(
    (acc, pair, index) => {
      if (pair.totalTime > acc.period) {
        const pairsIds = Object.keys(pairs)[index].split(" ");
        const {totalTime, projects, periodPerProject} = pair;
        return {
          period: totalTime,
          employee1Id: pairsIds[0],
          employee2Id: pairsIds[1],
          projects: projects,
          periodPerProject: periodPerProject
        };
      }

      return acc;
    },
    {
      period: 0,
      employee1Id: '',
      employee2Id: '',
      projects: [],
      periodPerProject: []
    }
  );
}
