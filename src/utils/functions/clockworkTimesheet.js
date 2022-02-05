const formatTwoDecimalPlaces = (value) => {
  if (!value || isNaN(value)) {
    return "0.00";
  }
  return (Math.round(value * 100) / 100).toFixed(2);
};

const clockworkTimesheet = (projects) => {
  const cards = {};
  const names = {};
  const byNames = [];
  const byProjects = {};
  const projectIds = {};
  const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  let cols = {};
  let cols2 = {};

  const totalByDate = {};
  const totalsByName = {};
  const totalsByNameInProject = {};
  const totalsById = {};
  let total = 0;

  if (!projects) {
    return {};
  }
  if (projects) {
    projects.forEach((row) => {
      if (!byNames[row.DatacenterID]) {
        byNames[row.DatacenterID] = {};
      }

      if (!byNames[row.DatacenterID][row.CompleteName]) {
        byNames[row.DatacenterID][row.CompleteName] = {};
      }

      if (!byProjects[row.ProjectName]) {
        byProjects[row.ProjectName] = {};
      }

      if (!byProjects[row.ProjectName][row.CompleteName]) {
        byProjects[row.ProjectName][row.CompleteName] = {};
      }

      Object.keys(row).forEach((key) => {
        names[row.ProjectName] = {
          CompleteName: row.CompleteName,
          ProjectName: row.ProjectName
        };
        if (
          key !== "DatacenterID" &&
          key !== "CompleteName" &&
          key !== "ProjectName" &&
          key !== "ProjectManagementID" &&
          key !== "ProjectCode"
        ) {
          const value = (Math.round(row[key] * 100) / 100).toFixed(2);

          if (!cards[row.ProjectName]) cards[row.ProjectName] = {};
          if (!cards[row.ProjectName][key]) cards[row.ProjectName][key] = 0;
          if (!byNames[row.DatacenterID][row.CompleteName][key]) {
            byNames[row.DatacenterID][row.CompleteName][key] = 0;
          }

          if (!byProjects[row.ProjectName][row.CompleteName][key]) {
            byProjects[row.ProjectName][row.CompleteName][key] = 0;
          }
          cards[row.ProjectName][key] += Number(value) ? Number(value) : 0 || 0;
          const date = new Date(key);
          const d = date.getDate() + "";
          cols[key] =
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear();

          byNames[row.DatacenterID][row.CompleteName][key] += Number(value)
            ? Number(value)
            : 0 || 0;

          byProjects[row.ProjectName][row.CompleteName][key] += value;
          cols2[key] = {
            date: d.length < 2 ? "0" + d : d,
            fullDate: key,
            day: days[date.getDay()]
          };
        }
        if (key === "ProjectCode") {
          if (!projectIds[row.ProjectName]) projectIds[row.ProjectName] = {};
          projectIds[row.ProjectName]["ProjectCode"] = row[key];
        }
      });

      Object.keys(row).forEach((key) => {
        if (
          key !== "DatacenterID" &&
          key !== "CompleteName" &&
          key !== "ProjectName" &&
          key !== "ProjectManagementID" &&
          key !== "ProjectCode"
        ) {
          const value = (Math.round(row[key] * 100) / 100).toFixed(2);

          if (!totalsById[row.ProjectName]) totalsById[row.ProjectName] = 0;
          totalsById[row.ProjectName] += Number(value) ? Number(value) : 0 || 0;

          if (!totalsByName[row.CompleteName])
            totalsByName[row.CompleteName] = 0;
          totalsByName[row.CompleteName] += Number(value)
            ? Number(value)
            : 0 || 0;

          if (!totalsByNameInProject[row.ProjectName])
            totalsByNameInProject[row.ProjectName] = {};

          if (!totalsByNameInProject[row.ProjectName][row.CompleteName])
            totalsByNameInProject[row.ProjectName][row.CompleteName] = 0;

          totalsByNameInProject[row.ProjectName][row.CompleteName] += Number(
            value
          )
            ? Number(value)
            : 0 || 0;
        }
      });
    });

    Object.keys(cols).forEach((key) => {
      projects.forEach((res) => {
        if (!totalByDate[key]) totalByDate[key] = 0;
        if (res[key]) {
          totalByDate[key] += Number(res[key]) ? Number(res[key]) : 0 || 0;
          total += Number(res[key]) ? Number(res[key]) : 0 || 0;
        }
      });
    });

    Object.keys(totalByDate).forEach((key) => {
      totalByDate[key] = (Math.round(totalByDate[key] * 100) / 100).toFixed(2);
    });
    total = (Math.round(total * 100) / 100).toFixed(2);

    return {
      projectIds,
      projects,
      cards,
      names,
      byNames,
      byProjects,
      cols,
      cols2,
      total,
      totalByDate,
      totalsById,
      totalsByName,
      totalsByNameInProject
    };
  }
};
export { formatTwoDecimalPlaces, clockworkTimesheet };
