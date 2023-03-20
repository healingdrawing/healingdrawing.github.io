// to collect data for display in top of the page
/**perhaps for legend, not sure */
var userLogin;
/**for xp */
var userXp = [];
/** for grade */
var userGrade;

// do not use .then() in async function
const fetchUserData = async () => {
  const response = await fetch(
    "https://01.gritlab.ax/api/graphql-engine/v1/graphql",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query:
          '{user(where: { login: { _eq: "lenivaya10003" } }) { id login } }',
      }),
    }
  );
  const data = await response.json();
  const users = data.data.user;
  users.forEach(async (user) => {
    document.getElementById("userLogin").textContent = `login: ${user.login}`;
    // now use the user.id to fetch the data from the server
    const response = await fetch(
      "https://01.gritlab.ax/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{ transaction (where: { userId: { _eq: ${user.id} } createdAt:{_gt:"2022-08-30T23:59:59+00:00"}}) { path type amount user{ login } createdAt } }`,
        }),
      }
    );
    const data = await response.json();
    const transactions = data.data.transaction;
    /*check all logins is lenivaya10003, so login was not changed */
    transactions.some((transaction) => {
      if (transaction.user.login !== user.login) {
        console.error("login was changed, data can be corrupted");
        return true;
      }
    });

    /*sort transactions by time*/
    transactions.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    /*filter only transactions where type === "xp", and sorted by date createdAt ascending*/
    const xpTransactions = transactions
      .filter((transaction) => transaction.type === "xp")
      .sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    console.log("xpTransactions ", xpTransactions);

    const tbody = document.getElementById("xpTable");
    let sumXp = 0;
    xpTransactions.forEach((transaction) => {
      sumXp += transaction.amount;
      const tr = document.createElement("tr");
      const amountTd = document.createElement("td");
      const createdAtTd = document.createElement("td");
      amountTd.textContent = transaction.amount;
      // time in milliseconds
      tms = Date.parse(transaction.createdAt);
      // time in seconds
      tss = tms / 1000;
      createdAtTd.textContent = tss;
      createdAtTd.textContent = transaction.createdAt;

      tr.appendChild(amountTd);
      // tr.appendChild(loginTd);
      tr.appendChild(createdAtTd);
      tbody.appendChild(tr);
    });
    document.getElementById("userXp").textContent = `xp: ${sumXp}`;
    userXp = formatUserXpData(xpTransactions);

    // graph
    let columns = [
      ["Xp transactions (curriculum)", ...userXp[0]],
      ["Time (from previous transaction) to get xp[minutes]", ...userXp[1]],
    ];

    var chart = bb.generate({
      size: {
        height: 800,
      },
      data: {
        columns: columns,
        type: "bar",
        groups: [
          [
            "Xp transactions (curriculum)",
            "Time (from previous transaction) to get xp[minutes]",
          ],
        ],
        labels: {
          format: function (v, id) {
            return Math.abs(v);
          },
        },
      },
      bar: {
        padding: 0,
        width: {
          ratio: 1,
          max: 10,
        },
        radius: {
          ratio: 0.5,
        },
      },
      axis: {
        rotated: true,
        x: {
          show: false,
        },
        y: {
          tick: {
            format: function (v) {
              return Math.abs(v);
            },
          },
        },
      },
      grid: {
        y: {
          show: true,
          lines: [
            {
              value: 0,
              class: "base-line",
            },
          ],
        },
      },
      tooltip: {
        format: {
          value: function (v) {
            return Math.abs(v);
          },
        },
      },
      bindto: "#rotatedAxisGroupedBar",
    });
  });
};

/**format data for graph object */
function formatUserXpData(xpTransactions) {
  const data = xpTransactions.map((transaction) => {
    return {
      x: Date.parse(transaction.createdAt),
      y: -transaction.amount, // to aim bars to the left
    };
  });

  // convert to array of amount
  const amount = data.map((item) => item.y);
  // convert to array of delta time between every two amount values. First value is 0
  const delta = data.map((item, index) => {
    if (index === 0) {
      return 0;
    }
    // milliseconds to minutes
    let time = Math.floor((item.x - data[index - 1].x) / 1000 / 60);
    return time;
  });
  userXp.push(amount);
  userXp.push(delta);
  // return array of arrays with amount and delta time
  return [amount, delta];
}

fetchUserData();
// fetchUserGrade();
