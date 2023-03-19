const fetchUserXp = async (userId) => {
  fetch("https://01.gritlab.ax/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{ transaction (where: { userId: { _eq: ${userId} }}) { path type amount user{ login } createdAt } }`,
    }),
  })
    .then((res) => res.json())
    .then((rez) => {
      console.log(rez);
      const transactions = rez.data.transaction;

      /*check all logins is lenivaya10003, so login was not changed */
      transactions.some((transaction) => {
        if (transaction.user.login !== "lenivaya10003") {
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
        //createdAtTd.textContent = transaction.createdAt;

        tr.appendChild(amountTd);
        // tr.appendChild(loginTd);
        tr.appendChild(createdAtTd);
        tbody.appendChild(tr);
      });
      document.getElementById("userXp").textContent = `xp: ${sumXp}`;
    })
    .catch((err) => console.error(err));
};
