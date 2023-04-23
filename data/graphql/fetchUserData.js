// const form = document.getElementById("loginForm");

function login(token) {
  document.getElementById("loginView").classList.add("hidden");
  document.getElementById("userView").classList.remove("hidden");
}

function logout() {
  document.getElementById("login").value = "";
  document.getElementById("password").value = "";

  document.getElementById("userLogin").innerHTML =
    "<red>user login fetch error</red>";
  document.getElementById("userXp").innerHTML =
    "<red>user xp fetch error</red>";
  document.getElementById("userGrade").innerHTML =
    "<red>user grade fetch error</red>";

  document.getElementById("showMe").classList.add("hidden");
  document.getElementById("xpTable").innerHTML = "";

  document.getElementById("rotatedAxisGroupedBar").classList.add("hidden");
  document.getElementById("rotatedAxisGroupedBar").innerHTML = "";

  document.getElementById("loginView").classList.remove("hidden");
  document.getElementById("userView").classList.add("hidden");
}

var userXp = []; // for sum of transactions with type equals to "xp"
// do not use .then() in async function, it makes code unreadable after .then() nesting
export const fetchUserData = async (token) => {
  // fucking bullshit
  const query1 =
    '{user(where: { login: { _eq: "lenivaya10003" } }) { id login } }';
  // fetch user id by login
  const response = await fetch(
    "https://01.gritlab.ax/api/graphql-engine/v1/graphql",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ` + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query1 }),
    }
  );
  const data = await response.json();
  console.log("fuking token from fuking z01 shitmakers", token);
  console.log("fuking data from z01 shitmakers", data);
  const users = data.data.user;
  users.forEach(async (user) => {
    document.getElementById("userLogin").textContent = `login: ${user.login}`;
    // now use the user.id to fetch the data from the api

    // fetch user grade
    var userGrades = 0; // for sum of grades
    const gradeResponse = await fetch(
      "https://01.gritlab.ax/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ` + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{
          result(where:  {userId: {_eq: ${user.id}} grade: {_gt:0} }){
            grade
            createdAt
            user {
              login
            }
          }
        }`,
        }),
      }
    );

    const gradeData = await gradeResponse.json();
    const results = gradeData.data.result;
    /*check all logins is lenivaya10003, so login was not changed */
    results.some((result) => {
      if (result.user.login !== user.login) {
        console.error("login was changed, data can be corrupted");
        return true;
      }
    });

    // calculate sum of grade
    results.forEach((result) => {
      userGrades += result.grade;
    });
    document.getElementById(
      "userGrade"
    ).textContent = `Results grade ∑ amount: ${userGrades}`;

    // fetch user xp
    const response = await fetch(
      "https://01.gritlab.ax/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ` + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{ transaction (where: { userId: { _eq: ${user.id} } type: { _eq: "xp" } }) { path type amount user{ login } createdAt } }`,
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

    const tbody = document.getElementById("xpTable");
    let sumXp = 0;
    let index = 0;
    transactions.forEach((transaction) => {
      sumXp += transaction.amount;
      const tr = document.createElement("tr");
      const indexTd = document.createElement("td");
      const amountTd = document.createElement("td");
      const createdAtTd = document.createElement("td");
      indexTd.textContent = index;
      index++;
      amountTd.textContent = transaction.amount;
      createdAtTd.textContent = transaction.createdAt;
      tr.appendChild(indexTd);
      tr.appendChild(amountTd);
      tr.appendChild(createdAtTd);
      tbody.appendChild(tr);
    });
    document.getElementById(
      "userXp"
    ).textContent = `Type "xp" transactions ∑ amount: ${sumXp}`;
    userXp = formatUserXpData(transactions);
    console.log("userXp two arrays ", userXp);
    // graph
    let columns = [
      ['transaction with type equals "xp"[bytes]', ...userXp[0]],
      ["time (from previous transaction) to get xp[minutes]", ...userXp[1]],
    ];

    var chart = bb.generate({
      size: {
        height: 24 * userXp[0].length,
      },
      data: {
        columns: columns,
        type: "bar",
        groups: [
          [
            'transaction with type equals "xp"[bytes]',
            "time (from previous transaction) to get xp[minutes]",
          ],
        ],
        labels: {
          format: function (v, id) {
            if (id === 'transaction with type equals "xp"[bytes]') {
              return -v;
            } else {
              return Math.abs(v);
            }
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
          value: function (v, r, id) {
            if (id === 'transaction with type equals "xp"[bytes]') {
              return -v;
            } else {
              return Math.abs(v);
            }
          },
        },
      },
      bindto: "#rotatedAxisGroupedBar",
    });
  });
  document.getElementById("showMe").classList.remove("hidden");
  document.getElementById("rotatedAxisGroupedBar").classList.remove("hidden");
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
  // in case of no return used
  // userXp.push(amount);
  // userXp.push(delta);
  // return array of arrays with amount and delta time
  return [amount, delta];
}

// fetchUserData();
// fetchUserGrade();
