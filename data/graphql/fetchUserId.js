const fetchUserId = async () => {
  fetch("https://01.gritlab.ax/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: '{user(where: { login: { _eq: "lenivaya10003" } }) { id login } }',
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      const users = res.data.user;
      users.forEach((user) => {
        // expected only one user, because of query _eq: "lenivaya10003"
        console.log("user.id ", user.id, "user.login ", user.login);
        // show the user login on the screen
        document.getElementById(
          "userLogin"
        ).textContent = `login: ${user.login}`;
        // now use the user.id to fetch the data from the server, and show it on screen using graphics
        fetchUserXp(user.id);
      });

      console.log("before grade, users ", users);
      users.forEach((user) => {
        document.getElementById(
          "userGrade"
        ).textContent = `grade: ${user.grade}`;
        fetchUserGrade(user.id);
      });
    })
    .catch((err) => console.error(err));
};
