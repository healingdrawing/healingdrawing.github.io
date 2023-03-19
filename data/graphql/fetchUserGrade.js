const fetchUserGrade = async (userId, userLogin) => {
  fetch("https://01.gritlab.ax/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        result(where:  {userId: {_eq: ${userId}} grade: {_gt:0} }){
          grade
          createdAt
          user {
            login
          }
        }
      }`,
    }),
  })
    .then((res) => res.json())
    .then((rez) => {
      console.log(rez);
      const results = rez.data.result;

      /*check all logins is lenivaya10003, so login was not changed */
      results.some((result) => {
        if (result.user.login !== userLogin) {
          console.error("login was changed, data can be corrupted");
          return true;
        }
      });

      /*sort transactions by time*/
      results.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      const tbody = document.getElementById("gradeTable");
      let sumGrade = 0;
      results.forEach((result) => {
        sumGrade += result.grade;
        const tr = document.createElement("tr");
        const gradeTd = document.createElement("td");
        const createdAtTd = document.createElement("td");
        gradeTd.textContent = result.grade;
        // time in milliseconds
        tms = Date.parse(result.createdAt);
        // time in seconds
        tss = tms / 1000;
        createdAtTd.textContent = tss;
        //createdAtTd.textContent = transaction.createdAt;

        tr.appendChild(gradeTd);
        // tr.appendChild(loginTd);
        tr.appendChild(createdAtTd);
        tbody.appendChild(tr);
      });
      document.getElementById("userGrade").textContent = `grade: ${sumGrade}`;
    })
    .catch((err) => console.error(err));
};
